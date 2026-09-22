'use client';

import { Loading } from '@/components/Loading';
import { QuizWithDocument } from '@/components/Study/QuizWithDocument';
import { quizCacheKey } from '@/constants/cache/cache-keys';
import { useCachedQuery } from '@/hooks/useCachedQuery';
import { getQuiz } from '@/service/quiz/get-quiz';
import { downloadSummaryFile } from '@/service/summary/download-summary-file';
import { getSummaryFiles } from '@/service/summary/get-summary-files';
import { QuizDetail } from '@/types/QuizQuestion';
import { readBlob, writeBlob } from '@/utils/cache/blob-cache';
import { cn } from '@/utils/cn';
import { parseQuizResponse } from '@/utils/form/parse-quiz-response';
import { formatSummaryDate } from '@/utils/formatters/format-summary-date';
import { summaryExpiration } from '@/utils/summary/expiration';
import { ArrowLeft, Clock3, ListChecks, Zap } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const expirationStyles = {
  expired: 'bg-coral-50 text-coral-700',
  soon: 'bg-sun-50 text-sun-700',
  ok: 'bg-canvas text-subtle',
};

type SourceDocument = { url: string; blob: Blob; format: 'pdf' | 'md' };

/**
 * Abre um quiz salvo por `GET /questions/{id}`. É de propósito que esta tela
 * nunca chame o `POST /questions`: a rota de leitura tem contador próprio e
 * folgado, então reabrir conteúdo não disputa a cota de geração do minuto.
 */
export function SavedQuizView() {
  const params = useParams();
  const router = useRouter();
  const id = String(params.id);

  const fetcher = useCallback(() => getQuiz(id), [id]);

  const { data, status, refetch } = useCachedQuery<QuizDetail>(quizCacheKey(id), fetcher, {
    staleTime: 300_000,
  });

  const [document, setDocument] = useState<SourceDocument>();
  const objectUrlRef = useRef('');

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  // o envelope do GET é desfeito pelo parser, que aceita os dois formatos
  const questions = useMemo(() => parseQuizResponse(data), [data]);

  /** Traz o resumo de origem para consulta ao lado das questões. */
  useEffect(() => {
    const fileId = data?.file_id;

    if (!fileId || document) return;

    let active = true;

    const load = async () => {
      const cached = readBlob(fileId);
      const files = await getSummaryFiles();
      const entry = files.data?.find((file) => file.id === fileId);

      // o resumo pode já ter expirado — nesse caso o quiz abre sozinho
      if (!entry) return;

      let blob = cached;

      if (!blob) {
        const response = await downloadSummaryFile(fileId);
        if (!response.success || !response.data) return;

        blob = response.data;
        writeBlob(fileId, blob);
      }

      if (!active) return;

      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = URL.createObjectURL(blob);

      setDocument({ url: objectUrlRef.current, blob, format: entry.filetype });
    };

    load();

    return () => {
      active = false;
    };
  }, [data?.file_id, document]);

  if (status === 'loading')
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loading />
      </div>
    );

  if (status === 'error' || !data)
    return (
      <div className="card flex flex-col items-center gap-4 py-16 text-center">
        <p className="subtitle max-w-sm">
          Não conseguimos abrir esse quiz. Ele pode ter expirado — quizzes ficam disponíveis por 7
          dias.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={refetch}
            className="focus-ring rounded-xl bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
          >
            Tentar novamente
          </button>

          <Link
            href="/meus-quizzes"
            className="focus-ring rounded-xl border border-line px-6 py-2.5 text-sm font-semibold transition-colors hover:bg-canvas"
          >
            Voltar
          </Link>
        </div>
      </div>
    );

  const expiration = summaryExpiration(data.expires_at);

  if (questions.length === 0)
    return (
      <div className="card flex flex-col items-center gap-4 py-16 text-center">
        <p className="subtitle max-w-sm">
          As questões desse quiz vieram em um formato inesperado.
        </p>
        <Link
          href="/gerar-quiz"
          className="focus-ring rounded-xl bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
        >
          Gerar de novo
        </Link>
      </div>
    );

  return (
    <section className="space-y-5">
      <header className="space-y-3">
        <Link
          href="/meus-quizzes"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-subtle transition-colors hover:text-purple-700"
        >
          <ArrowLeft size={13} />
          Meus quizzes
        </Link>

        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 space-y-1">
            <h1 className="truncate text-title font-extrabold">{data.title}</h1>

            <div className="flex flex-wrap items-center gap-2">
              <span className="chip bg-sky-50 text-sky-700">
                <ListChecks size={12} />
                {questions.length} questões
              </span>

              <span className={cn('chip', expirationStyles[expiration.state])}>
                <Clock3 size={12} />
                {expiration.label || 'Disponível por 7 dias'}
              </span>

              <span className="text-xs text-faint">
                Gerado em {formatSummaryDate(data.created_at)}
              </span>
            </div>
          </div>

          <span className="chip bg-mint-50 text-mint-700" title="Sem consumo de cota">
            <Zap size={11} />
            Sem gastar cota
          </span>
        </div>
      </header>

      <QuizWithDocument
        questions={questions}
        source={data.title}
        document={document}
        onNewQuiz={() => router.push('/gerar-quiz')}
      />
    </section>
  );
}
