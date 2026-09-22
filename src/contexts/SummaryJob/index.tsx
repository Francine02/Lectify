'use client';

import { SummaryData } from '@/app/(private)/gerar-resumo/summary-schema';
import { CACHE_KEYS } from '@/constants/cache/cache-keys';
import {
  DEFAULT_SUMMARY_LANGUAGE,
  SummaryLanguage,
} from '@/constants/form/summary-languages';
import { SummarySource } from '@/constants/summary/summary-source';
import { generateQuiz, generateQuizFromFileId } from '@/service/quiz/generate-quiz';
import { checkSummary } from '@/service/summary/check-summary';
import { downloadSummaryFile } from '@/service/summary/download-summary-file';
import { generateSummary } from '@/service/summary/generate-summary';
import { getSummaryFiles } from '@/service/summary/get-summary-files';
import { QuizQuestion } from '@/types/QuizQuestion';
import { SummaryFile } from '@/types/SummaryFile';
import { invalidateCache } from '@/utils/cache/client-cache';
import { blobToFile } from '@/utils/form/blob-to-file';
import { parseQuizResponse } from '@/utils/form/parse-quiz-response';
import { cooldownMessage, featureCooldown } from '@/utils/form/rate-guard';
import { normalizeYoutubeUrl } from '@/utils/formatters/normalize-youtube-url';
import { notifyApiError } from '@/utils/handlers/notify-api-error';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

export type SummaryFormat = 'pdf' | 'md';
export type JobStatus = 'idle' | 'running' | 'done' | 'error';
/** De onde veio a geração: a fila não toma a tela nem gera questões sozinha. */
export type JobOrigin = 'manual' | 'queue';
export type QuizStatus = 'idle' | 'preparing' | 'ready' | 'error';

export type SummaryResult = {
  url: string;
  blob: Blob;
  filename: string;
  format: SummaryFormat;
  youtubeUrl: string;
  /** Id na biblioteca — habilita questões por `file_id` e exclusão. */
  fileId?: string;
  expiresAt?: string;
  /** 'captions' | 'audio' | null — define a expectativa de cobertura do resumo. */
  source?: SummarySource;
};

type SummaryJobValue = {
  status: JobStatus;
  origin: JobOrigin;
  youtubeUrl?: string;
  format: SummaryFormat;
  progress: number;
  elapsed: number;
  isTakingLonger: boolean;
  error?: string;
  result: SummaryResult | null;
  quizStatus: QuizStatus;
  questions: QuizQuestion[];
  /** true quando as questões vieram do cache do backend (sem debitar cota). */
  quizFromCache: boolean;
  /** Id do quiz salvo — permite reabri-lo por GET /questions/{id}, sem cota. */
  quizId?: string;
  quizError?: string;
  /** Fica true quando o resumo terminou e o usuário ainda não abriu o resultado. */
  hasUnseenResult: boolean;
  start: (data: SummaryData, origin?: JobOrigin) => Promise<void>;
  markSeen: () => void;
  reset: () => void;
  retryQuiz: () => void;
};

const POLL_INTERVAL = 10_000;
const MAX_ATTEMPTS = 30; // teto de 5 minutos
// Calibração do progresso, não promessa: com legenda o resumo sai em ~25s, sem
// legenda passa de 2 minutos porque inclui baixar e transcrever o áudio — e a
// fila é global, um job por vez.
const EXPECTED_SECONDS = 120;
const FILE_MIME_TYPES = ['application/pdf', 'text/markdown'];
const RESUME_KEY = 'lectify:summary-job';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const buildFilename = (format: string) =>
  `resumo-${new Date().toISOString().slice(0, 10)}.${format}`;

const SummaryJobContext = createContext<SummaryJobValue | null>(null);

/**
 * Dono da geração de resumo. Vive no layout privado, então continua rodando
 * enquanto o usuário navega — a tela de resumo e o popup do canto apenas leem
 * este estado.
 */
export function SummaryJobProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<JobStatus>('idle');
  const [youtubeUrl, setYoutubeUrl] = useState<string>();
  const [format, setFormat] = useState<SummaryFormat>('pdf');
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState<string>();
  const [result, setResult] = useState<SummaryResult | null>(null);
  const [hasUnseenResult, setHasUnseenResult] = useState(false);

  const [origin, setOrigin] = useState<JobOrigin>('manual');
  const [quizStatus, setQuizStatus] = useState<QuizStatus>('idle');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [quizFromCache, setQuizFromCache] = useState(false);
  const [quizError, setQuizError] = useState<string>();

  const objectUrlRef = useRef('');
  const originRef = useRef<JobOrigin>('manual');
  const runningRef = useRef(false);
  const resumedRef = useRef(false);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  useEffect(() => {
    if (status !== 'running') return;

    const interval = setInterval(() => setElapsed((previous) => previous + 1), 1000);
    return () => clearInterval(interval);
  }, [status]);

  const rememberJob = (data: SummaryData | null) => {
    try {
      if (!data) sessionStorage.removeItem(RESUME_KEY);
      else sessionStorage.setItem(RESUME_KEY, JSON.stringify({ ...data, startedAt: Date.now() }));
    } catch {
      // sem sessionStorage o job simplesmente não sobrevive a um reload
    }
  };

  /** Prefere `file_id`: além de dispensar upload, cai no cache do backend. */
  const prepareQuiz = useCallback(
    async (blob: Blob, filename: string, fileFormat: SummaryFormat, fileId?: string) => {
      // mesmo o acerto de cache leva 429 quando a cota do minuto acabou: nesse
      // caso preferimos parar e deixar o usuário decidir quando tentar
      const cooldown = featureCooldown('questions');

      if (cooldown.seconds > 0) {
        setQuizError(cooldownMessage('questions', cooldown));
        setQuizStatus('error');
        return;
      }

      setQuizStatus('preparing');
      setQuizFromCache(false);
      setQuizError(undefined);

      const response = fileId
        ? await generateQuizFromFileId(fileId)
        : await generateQuiz(blobToFile(blob, filename, fileFormat));

      if (!response.success || !response.data) {
        setQuizError(response.error?.message);
        setQuizStatus('error');
        return;
      }

      const parsed = parseQuizResponse(response.data);

      if (parsed.length === 0) {
        setQuizError('As questões vieram em um formato inesperado.');
        setQuizStatus('error');
        return;
      }

      setQuestions(parsed);
      setQuizFromCache(response.status === 200);
      setQuizStatus('ready');
    },
    []
  );

  const publishResult = useCallback(
    (blob: Blob, fileFormat: SummaryFormat, sourceUrl: string, file?: SummaryFile | null) => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);

      const url = URL.createObjectURL(blob);
      objectUrlRef.current = url;

      const filename = file?.filename ?? buildFilename(fileFormat);

      setResult({
        url,
        blob,
        filename,
        format: fileFormat,
        youtubeUrl: sourceUrl,
        fileId: file?.id,
        expiresAt: file?.expires_at,
        source: file?.source ?? null,
      });
      setStatus('done');
      setHasUnseenResult(true);
      rememberJob(null);

      // a biblioteca ganhou um arquivo novo: força releitura na próxima visita
      invalidateCache(CACHE_KEYS.summaryFiles);
      invalidateCache(CACHE_KEYS.usage);

      if (originRef.current === 'manual') prepareQuiz(blob, filename, fileFormat, file?.id);
    },
    [prepareQuiz]
  );

  const fail = useCallback((message: string) => {
    setStatus('error');
    setError(message);
    rememberJob(null);
    notifyApiError(message);
  }, []);

  /**
   * Acha o registro do resumo na biblioteca do usuário (mais recente primeiro).
   * O mesmo vídeo pode ter resumo em mais de um formato e idioma, então os três
   * campos entram no filtro — só a URL não basta.
   */
  const findLibraryEntry = async (
    sourceUrl: string,
    fileFormat: SummaryFormat,
    language: SummaryLanguage
  ) => {
    const list = await getSummaryFiles();

    if (!list.success || !Array.isArray(list.data)) return null;

    const url = normalizeYoutubeUrl(sourceUrl);

    return (
      [...list.data]
        .filter(
          (file) =>
            normalizeYoutubeUrl(file.youtube_url) === url &&
            file.filetype === fileFormat &&
            // registros antigos podem não trazer o idioma
            (!file.language || file.language === language)
        )
        .sort((a, b) => new Date(b.summary_at).getTime() - new Date(a.summary_at).getTime())[0] ??
      null
    );
  };

  /**
   * Busca o arquivo recém-gerado pela biblioteca em vez de chamar /summarize
   * outra vez: aquela rota testa a cota do plano e um 429 aqui contaria como
   * violação para o bloqueio de 30 minutos.
   */
  const fetchGeneratedFile = async (data: SummaryData, fileFormat: SummaryFormat) => {
    const entry = await findLibraryEntry(data.youtube_url, fileFormat, data.language_select);

    if (entry) {
      const file = await downloadSummaryFile(entry.id);
      if (file.success && file.data) return { blob: file.data, entry };
    }

    // a listagem falhou: caímos na rota de resumo, que devolve 200 com o arquivo
    // do acervo — sem debitar cota
    const fallback = await generateSummary(data);

    return fallback.success && fallback.data ? { blob: fallback.data, entry } : null;
  };

  const poll = useCallback(
    async (data: SummaryData) => {
      const fileFormat = data.output_format as SummaryFormat;

      for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        await delay(POLL_INTERVAL);

        const check = await checkSummary(data);
        const checkStatus = check.data?.status;

        if (checkStatus === 'error') {
          fail(
            'Não conseguimos gerar o resumo desse vídeo. Ele precisa ter narração em português e áudio audível.'
          );
          return;
        }

        if (checkStatus !== 'success') continue;

        const generated = await fetchGeneratedFile(data, fileFormat);

        if (!generated) {
          fail('O resumo ficou pronto, mas não conseguimos baixá-lo. Ele está em Meus resumos.');
          return;
        }

        publishResult(generated.blob, fileFormat, data.youtube_url, generated.entry);
        toast.success('Seu resumo ficou pronto!');
        return;
      }

      fail('O resumo está demorando mais que o normal. Tente novamente em instantes.');
    },
    [fail, publishResult]
  );

  const start = useCallback(
    async (rawData: SummaryData, jobOrigin: JobOrigin = 'manual') => {
      if (runningRef.current) return;

      // a API grava a URL com esquema; seguimos o mesmo formato daqui para a
      // frente, senão a busca na biblioteca não encontra o arquivo gerado
      const data: SummaryData = {
        ...rawData,
        youtube_url: normalizeYoutubeUrl(rawData.youtube_url),
      };

      const cooldown = featureCooldown('summarize');

      if (cooldown.seconds > 0) {
        toast.info(cooldownMessage('summarize', cooldown));
        return;
      }

      const fileFormat = data.output_format as SummaryFormat;

      runningRef.current = true;
      originRef.current = jobOrigin;
      setOrigin(jobOrigin);
      setStatus('running');
      setError(undefined);
      setElapsed(0);
      setResult(null);
      setQuestions([]);
      setQuizStatus('idle');
      setQuizFromCache(false);
      setQuizError(undefined);
      setYoutubeUrl(data.youtube_url);
      setFormat(fileFormat);
      rememberJob(data);

      const first = await generateSummary(data);

      if (!first.success) {
        // 409: já existe esse mesmo pedido na fila — acompanhamos aquele
        if (first.status === 409) {
          await poll(data);
          runningRef.current = false;
          return;
        }

        runningRef.current = false;
        fail(first.error?.message ?? 'Não foi possível iniciar o resumo.');
        return;
      }

      // 200 com binário: o resumo já existia no acervo e não debitou cota.
      if (first.status === 200 && first.data && FILE_MIME_TYPES.includes(first.data.type)) {
        const entry = await findLibraryEntry(data.youtube_url, fileFormat, data.language_select);

        publishResult(first.data, fileFormat, data.youtube_url, entry);
        runningRef.current = false;
        toast.success('Esse resumo já estava na sua biblioteca.');
        return;
      }

      // 201: entrou na fila.
      await poll(data);
      runningRef.current = false;
    },
    [fail, poll, publishResult]
  );

  /** Um reload não cancela o processamento no backend — retomamos o polling. */
  useEffect(() => {
    if (resumedRef.current) return;
    resumedRef.current = true;

    let saved: (SummaryData & { startedAt: number }) | null = null;

    try {
      const raw = sessionStorage.getItem(RESUME_KEY);
      saved = raw ? JSON.parse(raw) : null;
    } catch {
      saved = null;
    }

    if (!saved?.youtube_url) return;

    const since = Math.floor((Date.now() - saved.startedAt) / 1000);

    if (since > MAX_ATTEMPTS * (POLL_INTERVAL / 1000)) {
      rememberJob(null);
      return;
    }

    runningRef.current = true;
    originRef.current = 'manual';
    setOrigin('manual');
    setStatus('running');
    setElapsed(since);
    setYoutubeUrl(saved.youtube_url);
    setFormat(saved.output_format as SummaryFormat);

    poll({ ...saved, language_select: saved.language_select ?? DEFAULT_SUMMARY_LANGUAGE }).finally(() => {
      runningRef.current = false;
    });
  }, [poll]);

  const reset = useCallback(() => {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    objectUrlRef.current = '';

    setStatus('idle');
    setResult(null);
    setError(undefined);
    setElapsed(0);
    setQuestions([]);
    setQuizStatus('idle');
    setQuizFromCache(false);
    setQuizError(undefined);
    setYoutubeUrl(undefined);
    setHasUnseenResult(false);
    rememberJob(null);
  }, []);

  const retryQuiz = useCallback(() => {
    if (!result) return;
    prepareQuiz(result.blob, result.filename, result.format, result.fileId);
  }, [prepareQuiz, result]);

  const progress =
    status === 'running'
      ? Math.min(8 + (82 * elapsed) / EXPECTED_SECONDS, 92)
      : status === 'done'
        ? 100
        : 0;

  return (
    <SummaryJobContext.Provider
      value={{
        status,
        origin,
        youtubeUrl,
        format,
        progress,
        elapsed,
        isTakingLonger: elapsed > EXPECTED_SECONDS,
        error,
        result,
        quizStatus,
        questions,
        quizFromCache,
        quizError,
        hasUnseenResult,
        start,
        markSeen: () => setHasUnseenResult(false),
        reset,
        retryQuiz,
      }}
    >
      {children}
    </SummaryJobContext.Provider>
  );
}

export function useSummaryJob() {
  const context = useContext(SummaryJobContext);

  if (!context) throw new Error('useSummaryJob precisa estar dentro de SummaryJobProvider');

  return context;
}
