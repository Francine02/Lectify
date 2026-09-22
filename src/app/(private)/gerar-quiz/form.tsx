'use client';

import { Button } from '@/components/Button';
import { Dropzone } from '@/components/Dropzone';
import { UpgradeNotice } from '@/components/Plans/UpgradeNotice';
import { QuizPreparing } from '@/components/Quiz/QuizPreparing';
import { QuizWithDocument } from '@/components/Study/QuizWithDocument';
import { useAbuseBlock } from '@/hooks/useAbuseBlock';
import { useAccountPlan } from '@/hooks/useAccountPlan';
import { generateQuiz, generateQuizFromFileId } from '@/service/quiz/generate-quiz';
import { downloadSummaryFile } from '@/service/summary/download-summary-file';
import { QuizQuestion } from '@/types/QuizQuestion';
import { parseQuizResponse } from '@/utils/form/parse-quiz-response';
import { cooldownMessage, featureCooldown } from '@/utils/form/rate-guard';
import { takePendingQuiz } from '@/utils/storage/pending-quiz';
import { zodResolver } from '@hookform/resolvers/zod';
import { BookMarked, ListChecks, Lock, Zap } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { notifyApiError } from '@/utils/handlers/notify-api-error';
import { toast } from 'react-toastify';
import { QuizData, quizSchema } from './quiz-schema';

type QuizStatus = 'idle' | 'preparing' | 'ready';

type SourceDocument = {
  url: string;
  blob: Blob;
  format: 'pdf' | 'md';
};

const formatOf = (file: File): 'pdf' | 'md' =>
  file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf' ? 'pdf' : 'md';

/**
 * Segura a chamada quando o minuto já está no teto. Vale também para o que
 * viria do cache: a checagem do backend barra qualquer requisição depois que a
 * cota de geração do minuto acaba, e um 429 aqui conta para o bloqueio.
 */
const holdIfThrottled = () => {
  const cooldown = featureCooldown('questions');

  if (cooldown.seconds === 0) return false;

  toast.info(cooldownMessage('questions', cooldown));
  return true;
};

export function GenerateQuizForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isFree, isLoading: isLoadingPlan } = useAccountPlan();
  const { isBlocked, label: blockLabel } = useAbuseBlock();

  const summaryId = searchParams.get('resumo');
  const summaryName = searchParams.get('nome') ?? undefined;
  const summaryFormat = (searchParams.get('formato') as 'pdf' | 'md' | null) ?? 'md';

  const [status, setStatus] = useState<QuizStatus>('idle');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [source, setSource] = useState<string>();
  const [sourceDocument, setSourceDocument] = useState<SourceDocument>();
  const [fromCache, setFromCache] = useState(false);

  const bootstrapped = useRef(false);
  const objectUrlRef = useRef('');

  const methods = useForm<QuizData>({
    resolver: zodResolver(quizSchema),
  });

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  const keepDocument = useCallback((blob: Blob, format: 'pdf' | 'md') => {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);

    const url = URL.createObjectURL(blob);
    objectUrlRef.current = url;

    setSourceDocument({ url, blob, format });
  }, []);

  /** Caminho preferido: o backend lê o resumo pelo id e ainda aproveita o cache. */
  const runFromSummary = useCallback(
    async (fileId: string) => {
      if (holdIfThrottled()) return;

      setStatus('preparing');
      setSource(summaryName);

      const response = await generateQuizFromFileId(fileId);

      if (!response.success || !response.data) {
        setStatus('idle');
        notifyApiError(response.error?.message ?? 'Não foi possível gerar as questões.');
        return;
      }

      const parsed = parseQuizResponse(response.data);

      if (parsed.length === 0) {
        setStatus('idle');
        toast.error('As questões vieram em um formato inesperado. Tente novamente.');
        return;
      }

      setQuestions(parsed);
      setFromCache(response.status === 200);
      setStatus('ready');

      // o material fica disponível ao lado, mas sem travar a exibição do quiz
      downloadSummaryFile(fileId).then((file) => {
        if (file.success && file.data) keepDocument(file.data, summaryFormat);
      });
    },
    [keepDocument, summaryFormat, summaryName]
  );

  const runFromUpload = useCallback(
    async (file: File) => {
      if (holdIfThrottled()) return;

      const format = formatOf(file);

      setStatus('preparing');
      setSource(file.name);
      keepDocument(file, format);

      const response = await generateQuiz(file);

      if (!response.success || !response.data) {
        setStatus('idle');
        notifyApiError(response.error?.message ?? 'Não foi possível gerar as questões.');
        return;
      }

      const parsed = parseQuizResponse(response.data);

      if (parsed.length === 0) {
        setStatus('idle');
        toast.error('As questões vieram em um formato inesperado. Tente novamente.');
        return;
      }

      setQuestions(parsed);
      setFromCache(response.status === 200);
      setStatus('ready');
    },
    [keepDocument]
  );

  useEffect(() => {
    if (bootstrapped.current || isLoadingPlan || isFree) return;
    bootstrapped.current = true;

    const pending = takePendingQuiz();

    if (pending?.questions?.length) {
      setQuestions(pending.questions);
      setSource(pending.source);
      setStatus('ready');
      return;
    }

    if (pending?.file) {
      runFromUpload(pending.file);
      return;
    }

    if (summaryId) runFromSummary(summaryId);
  }, [isFree, isLoadingPlan, runFromSummary, runFromUpload, summaryId]);

  const onSubmit: SubmitHandler<QuizData> = async ({ file }) => {
    await runFromUpload(file);
  };

  const resetQuiz = () => {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    objectUrlRef.current = '';

    setQuestions([]);
    setSource(undefined);
    setSourceDocument(undefined);
    setFromCache(false);
    setStatus('idle');
    methods.reset();
    router.replace('/gerar-quiz');
  };

  if (isLoadingPlan)
    return (
      <div className="space-y-4">
        <div className="skeleton h-8 w-60" />
        <div className="skeleton h-48 rounded-2xl" />
      </div>
    );

  if (isFree)
    return (
      <UpgradeNotice
        title="Gerar questões é dos planos pagos"
        description="Escolha um plano para transformar seus materiais em questões de múltipla escolha."
      />
    );

  if (status === 'preparing') return <QuizPreparing source={source} />;

  if (status === 'ready')
    return (
      <div className="w-full py-1">
        <QuizWithDocument
          questions={questions}
          source={source}
          fromCache={fromCache}
          document={sourceDocument}
          onNewQuiz={resetQuiz}
        />
      </div>
    );

  return (
    <FormProvider {...methods}>
      <section className="mx-auto w-full max-w-2xl space-y-5 py-4">
        <header className="space-y-2 text-center">
          <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
            <ListChecks size={24} />
          </span>
          <h1 className="text-title font-extrabold">Gere questões</h1>
          <p className="subtitle mx-auto max-w-md">
            Envie um PDF ou Markdown — ou gere direto de um resumo salvo na sua biblioteca, em um
            clique.
          </p>
        </header>

        <form onSubmit={methods.handleSubmit(onSubmit)} className="card space-y-5 p-5 sm:p-6">
          <Dropzone />

          {isBlocked ? (
            <p className="flex items-center justify-center gap-2 rounded-xl bg-coral-50 px-4 py-3 text-sm font-medium text-coral-700">
              <Lock size={14} />
              {blockLabel} — aguarde para gerar de novo.
            </p>
          ) : (
            <Button isLoading={methods.formState.isSubmitting} type="submit">
              <ListChecks size={15} />
              Gerar questões
            </Button>
          )}
        </form>

        <div className="space-y-2 text-center text-xs">
          <p className="flex items-center justify-center gap-2 text-subtle">
            <Zap size={13} className="text-mint-500" />
            Questões já geradas para o mesmo material voltam na hora, sem consumir cota.
          </p>

          <Link
            href="/meus-quizzes"
            className="inline-flex items-center gap-1.5 font-semibold text-purple-700 transition-colors hover:text-purple-800"
          >
            <BookMarked size={13} />
            Reabrir um quiz que você já gerou
          </Link>
        </div>
      </section>
    </FormProvider>
  );
}
