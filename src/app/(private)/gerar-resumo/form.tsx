'use client';

import { Button } from '@/components/Button';
import { SourceBadge } from '@/components/Library/SourceBadge';
import { Error } from '@/components/Error';
import { UpgradeNotice } from '@/components/Plans/UpgradeNotice';
import { QuizPreparing } from '@/components/Quiz/QuizPreparing';
import { GeneratingSummary } from '@/components/Study/GeneratingSummary';
import { QuizWithDocument } from '@/components/Study/QuizWithDocument';
import { StudyQueue } from '@/components/Study/StudyQueue';
import { StudyTabs } from '@/components/Study/StudyTabs';
import { SummaryPanel } from '@/components/Study/SummaryPanel';
import {
  DEFAULT_SUMMARY_LANGUAGE,
  SUMMARY_LANGUAGES,
  SUMMARY_LANGUAGE_LABELS,
} from '@/constants/form/summary-languages';
import { SUMMARY_OUTPUT_FORMATS } from '@/constants/form/summary-output-formats';
import { SUMMARY_SOURCE_INFO } from '@/constants/summary/summary-source';
import { useSummaryJob } from '@/contexts/SummaryJob';
import { useAbuseBlock } from '@/hooks/useAbuseBlock';
import { useAccountPlan } from '@/hooks/useAccountPlan';
import { cn } from '@/utils/cn';
import { setPendingQuiz } from '@/utils/storage/pending-quiz';
import { summaryExpiration } from '@/utils/summary/expiration';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Clock3,
  Download,
  FileText,
  Info,
  Languages,
  Lock,
  Mic,
  Plus,
  Sparkles,
  Youtube,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SummaryData, summarySchema } from './summary-schema';

const FORMATS = [
  { value: SUMMARY_OUTPUT_FORMATS[0], label: 'PDF', hint: 'Pronto para imprimir' },
  { value: SUMMARY_OUTPUT_FORMATS[1], label: 'Markdown', hint: 'Fácil de editar' },
] as const;

export function GenerateSummaryForm() {
  const router = useRouter();
  const { isFree, isLoading: isLoadingPlan } = useAccountPlan();
  const { isBlocked, label: blockLabel } = useAbuseBlock();

  const {
    status,
    origin,
    progress,
    youtubeUrl,
    isTakingLonger,
    result,
    questions,
    quizStatus,
    quizFromCache,
    quizError,
    start,
    reset,
    retryQuiz,
    markSeen,
  } = useSummaryJob();

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SummaryData>({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      output_format: SUMMARY_OUTPUT_FORMATS[0],
      language_select: DEFAULT_SUMMARY_LANGUAGE,
    },
  });

  const selectedFormat = watch('output_format');
  const selectedLanguage = watch('language_select');
  const [activeTab, setActiveTab] = useState('summary');

  useEffect(() => {
    if (status === 'done') {
      markSeen();
      setActiveTab('summary');
    }
  }, [markSeen, status]);

  const onSubmit: SubmitHandler<SummaryData> = async (data) => {
    await start(data);
  };

  if (isLoadingPlan)
    return (
      <div className="space-y-4">
        <div className="skeleton h-8 w-60" />
        <div className="skeleton h-48 rounded-2xl" />
      </div>
    );

  if (isFree) return <UpgradeNotice />;

  if (status === 'running' && origin === 'manual')
    return (
      <GeneratingSummary progress={progress} youtubeUrl={youtubeUrl} isTakingLonger={isTakingLonger} />
    );

  if (status === 'done' && result && origin === 'manual') {
    const expiration = summaryExpiration(result.expiresAt);

    return (
      <section className="space-y-5">
        <header className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 space-y-1">
            <h1 className="truncate text-title font-extrabold">Seu material está pronto</h1>

            <div className="flex flex-wrap items-center gap-2">
              <span className="chip bg-purple-50 text-purple-700">
                <FileText size={12} />
                {result.filename}
              </span>

              <SourceBadge source={result.source} />

              <span
                className={cn(
                  'chip',
                  expiration.state === 'ok'
                    ? 'bg-canvas text-subtle'
                    : 'bg-sun-50 text-sun-700'
                )}
              >
                <Clock3 size={12} />
                {expiration.label || 'Disponível por 7 dias'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={result.url}
              download={result.filename}
              className="focus-ring inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
            >
              <Download size={14} />
              Baixar
            </a>

            <button
              type="button"
              onClick={reset}
              className="focus-ring inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-canvas"
            >
              <Plus size={14} />
              Novo
            </button>
          </div>
        </header>

        {result.source === 'audio' && (
          <p className="flex items-start gap-2 rounded-2xl bg-sun-50 px-4 py-3 text-sm text-sun-700">
            <Mic size={15} className="mt-0.5 shrink-0" />
            {SUMMARY_SOURCE_INFO.audio.detail}
          </p>
        )}

        <p className="rounded-2xl bg-canvas px-4 py-3 text-sm text-subtle">
          Resumos ficam disponíveis por <strong className="text-ink">7 dias</strong>. Baixe o
          arquivo para guardar em definitivo — as questões geradas a partir dele seguem a mesma
          validade.
        </p>

        <StudyTabs
          active={activeTab}
          onChange={setActiveTab}
          tabs={[
            { id: 'summary', label: 'Resumo' },
            {
              id: 'quiz',
              label: 'Questões',
              badge:
                quizStatus === 'ready'
                  ? String(questions.length)
                  : quizStatus === 'preparing'
                    ? '...'
                    : undefined,
            },
          ]}
        />

        <div className={cn(activeTab === 'summary' ? 'block' : 'hidden')}>
          <SummaryPanel url={result.url} blob={result.blob} format={result.format} />
        </div>

        {/* mantido montado para não perder as respostas ao trocar de aba */}
        <div className={cn(activeTab === 'quiz' ? 'block' : 'hidden')}>
          {quizStatus === 'ready' ? (
            <QuizWithDocument
              questions={questions}
              source={result.filename}
              fromCache={quizFromCache}
              document={{ url: result.url, blob: result.blob, format: result.format }}
              onNewQuiz={retryQuiz}
              extraAction={
                <button
                  type="button"
                  onClick={() => {
                    setPendingQuiz({ questions, source: result.filename });
                    router.push('/gerar-quiz');
                  }}
                  className="cursor-pointer text-xs font-medium text-subtle transition-colors hover:text-purple-700"
                >
                  Abrir na tela de questões →
                </button>
              }
            />
          ) : quizStatus === 'error' ? (
            <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
              <p className="subtitle max-w-sm">
                {quizError ?? 'Não conseguimos montar as questões desse material agora.'}
              </p>
              <Button type="button" className="w-auto px-6" onClick={retryQuiz}>
                Tentar de novo
              </Button>
            </div>
          ) : (
            <QuizPreparing />
          )}
        </div>

        {activeTab === 'summary' && quizStatus === 'preparing' && (
          <p className="text-center text-xs text-faint">
            Suas questões estão sendo preparadas enquanto você lê.
          </p>
        )}
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-2xl space-y-5 py-4">
      <header className="space-y-2 text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-700">
          <Sparkles size={24} />
        </span>
        <h1 className="text-title font-extrabold">Gere um resumo</h1>
        <p className="subtitle mx-auto max-w-md">
          Cole o link de uma aula do YouTube. A gente assiste por você, resume e já monta as
          questões.
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="card space-y-5 p-5 shadow-soft sm:p-6">
        <div className="space-y-2">
          <label htmlFor="youtube_url" className="text-sm font-semibold">
            Link do vídeo
          </label>

          <div className="relative">
            <Youtube
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-coral-500"
            />
            <input
              id="youtube_url"
              {...register('youtube_url')}
              placeholder="https://www.youtube.com/watch?v=..."
              className={cn(
                'w-full rounded-xl border bg-canvas py-3.5 pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-faint focus:bg-surface',
                errors.youtube_url
                  ? 'border-coral-500 focus:border-coral-500'
                  : 'border-line focus:border-purple-400'
              )}
            />
          </div>

          {errors.youtube_url && <Error text={errors.youtube_url.message} />}
        </div>

        <fieldset className="space-y-2">
          <legend className="mb-2 text-sm font-semibold">Formato do resumo</legend>

          <div className="grid gap-2 sm:grid-cols-2">
            {FORMATS.map((format) => {
              const isSelected = selectedFormat === format.value;

              return (
                <button
                  key={format.value}
                  type="button"
                  onClick={() => setValue('output_format', format.value)}
                  aria-pressed={isSelected}
                  className={cn(
                    'focus-ring flex items-center gap-3 rounded-xl border p-3 text-left transition-colors',
                    isSelected
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-line bg-surface hover:bg-canvas'
                  )}
                >
                  <span
                    className={cn(
                      'flex size-9 items-center justify-center rounded-lg',
                      isSelected ? 'bg-purple-600 text-white' : 'bg-canvas text-subtle'
                    )}
                  >
                    <FileText size={16} />
                  </span>

                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{format.label}</span>
                    <span className="block text-xs text-subtle">{format.hint}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="space-y-2">
          <legend className="mb-2 flex items-center gap-2 text-sm font-semibold">
            <Languages size={14} className="text-purple-600" />
            Idioma do resumo
          </legend>

          <div className="flex gap-2">
            {SUMMARY_LANGUAGES.map((language) => {
              const isSelected = selectedLanguage === language;

              return (
                <button
                  key={language}
                  type="button"
                  onClick={() => setValue('language_select', language)}
                  aria-pressed={isSelected}
                  className={cn(
                    'focus-ring flex-1 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors',
                    isSelected
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-line bg-surface text-subtle hover:bg-canvas'
                  )}
                >
                  {SUMMARY_LANGUAGE_LABELS[language]}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-faint">
            O mesmo vídeo pode ter um resumo por formato e idioma — cada combinação é um arquivo na
            sua biblioteca.
          </p>
        </fieldset>

        {isBlocked ? (
          <p className="flex items-center justify-center gap-2 rounded-xl bg-coral-50 px-4 py-3 text-sm font-medium text-coral-700">
            <Lock size={14} />
            {blockLabel} — aguarde para gerar de novo.
          </p>
        ) : (
          <Button isLoading={isSubmitting} disabled={isSubmitting} type="submit">
            <Sparkles size={15} />
            Gerar resumo
          </Button>
        )}
      </form>

      <StudyQueue />

      <p className="flex items-start gap-2 rounded-2xl bg-sky-50 px-4 py-3 text-xs text-sky-800">
        <Info size={14} className="mt-0.5 shrink-0" />
        <span>
          Vídeos <strong>com legenda</strong> são resumidos por inteiro. Sem legenda, transcrevemos
          o áudio dos <strong>3min40 iniciais</strong> — o resumo cobre a abertura, não a aula toda.
        </span>
      </p>

      <ul className="grid gap-2 text-xs text-subtle sm:grid-cols-3">
        <li className="card flex items-center gap-2 px-3 py-2.5">
          <Clock3 size={14} className="shrink-0 text-purple-600" />
          Um resumo por vez, na fila
        </li>
        <li className="card flex items-center gap-2 px-3 py-2.5">
          <Sparkles size={14} className="shrink-0 text-purple-600" />
          Roda em segundo plano
        </li>
        <li className="card flex items-center gap-2 px-3 py-2.5">
          <Download size={14} className="shrink-0 text-purple-600" />
          Disponível por 7 dias
        </li>
      </ul>
    </section>
  );
}
