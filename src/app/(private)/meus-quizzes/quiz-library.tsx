'use client';

import { QuizCard } from '@/components/Library/QuizCard';
import { QuizCardSkeleton } from '@/components/Library/QuizCardSkeleton';
import { CACHE_KEYS } from '@/constants/cache/cache-keys';
import { useCachedQuery } from '@/hooks/useCachedQuery';
import { getQuizzes } from '@/service/quiz/get-quizzes';
import { QuizListItem } from '@/types/QuizQuestion';
import { cn } from '@/utils/cn';
import { summaryExpiration } from '@/utils/summary/expiration';
import { Clock3, ListChecks, RefreshCw, Search, Zap } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

type Filter = 'all' | 'summary' | 'upload' | 'soon';

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'summary', label: 'De resumos' },
  { id: 'upload', label: 'De uploads' },
  { id: 'soon', label: 'Vencendo' },
];

/**
 * Quizzes persistidos. Reabrir daqui usa `GET /questions/{id}`, com contador
 * próprio — é o caminho que não disputa o orçamento de geração do minuto.
 */
export function QuizLibrary() {
  const { data, status, isRevalidating, refetch } = useCachedQuery<QuizListItem[]>(
    CACHE_KEYS.quizzes,
    getQuizzes,
    { staleTime: 30_000 }
  );

  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');

  // a API já devolve mais recentes primeiro; reordenamos por segurança
  const quizzes = useMemo(
    () =>
      [...(data ?? [])].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ),
    [data]
  );

  const expiringCount = quizzes.filter(
    (quiz) => summaryExpiration(quiz.expires_at).state !== 'ok'
  ).length;

  const visible = quizzes.filter((quiz) => {
    const matchesSearch =
      !search.trim() || quiz.title?.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (filter === 'all') return true;
    if (filter === 'soon') return summaryExpiration(quiz.expires_at).state !== 'ok';
    if (filter === 'summary') return !!quiz.file_id;

    return !quiz.file_id;
  });

  return (
    <section className="space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-title font-extrabold">Meus quizzes</h1>
          <p className="subtitle">
            {quizzes.length > 0
              ? `${quizzes.length} ${quizzes.length === 1 ? 'quiz salvo' : 'quizzes salvos'} · reabrir não consome cota`
              : 'Todo quiz gerado fica salvo aqui por 7 dias.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={refetch}
            aria-label="Atualizar lista"
            className="focus-ring rounded-xl border border-line bg-surface p-2.5 text-subtle transition-colors hover:bg-canvas"
          >
            <RefreshCw size={15} className={cn(isRevalidating && 'animate-spin')} />
          </button>

          <Link
            href="/gerar-quiz"
            className="focus-ring inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
          >
            <ListChecks size={15} />
            Gerar questões
          </Link>
        </div>
      </header>

      <p className="flex items-center gap-2 rounded-2xl bg-mint-50 px-4 py-3 text-sm text-mint-700">
        <Zap size={15} className="shrink-0" />
        Responder de novo um quiz salvo é gratuito — a cota só é debitada quando um quiz é gerado
        pela primeira vez.
      </p>

      {expiringCount > 0 && (
        <p className="flex items-center gap-2 rounded-2xl bg-sun-50 px-4 py-3 text-sm text-sun-700">
          <Clock3 size={15} className="shrink-0" />
          {expiringCount === 1
            ? '1 quiz vence em menos de 2 dias.'
            : `${expiringCount} quizzes vencem em menos de 2 dias.`}
        </p>
      )}

      {quizzes.length > 0 && (
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[200px] flex-1">
            <Search
              size={15}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-faint"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar pelo nome do material"
              className="w-full rounded-xl border border-line bg-surface py-2.5 pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-faint focus:border-purple-400"
            />
          </div>

          <div className="flex gap-1 rounded-xl bg-surface p-1">
            {FILTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors',
                  filter === item.id ? 'bg-purple-50 text-purple-700' : 'text-subtle hover:text-ink'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {status === 'loading' && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((key) => (
            <QuizCardSkeleton key={key} />
          ))}
        </div>
      )}

      {status === 'error' && (
        <div className="card flex flex-col items-center gap-4 py-16 text-center">
          <p className="subtitle max-w-sm">
            Não conseguimos carregar seus quizzes agora. Verifique sua conexão e tente de novo.
          </p>
          <button
            type="button"
            onClick={refetch}
            className="focus-ring rounded-xl bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {status === 'ready' && quizzes.length === 0 && (
        <div className="card flex flex-col items-center gap-3 border-dashed py-16 text-center">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
            <ListChecks size={24} />
          </span>

          <div className="space-y-1">
            <h2 className="font-display text-base font-extrabold">Nenhum quiz ainda</h2>
            <p className="subtitle mx-auto max-w-sm">
              Gere questões de um resumo salvo ou de um PDF e elas ficam guardadas aqui.
            </p>
          </div>

          <Link
            href="/gerar-quiz"
            className="focus-ring mt-2 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
          >
            <ListChecks size={15} />
            Gerar questões
          </Link>
        </div>
      )}

      {status === 'ready' && quizzes.length > 0 && visible.length === 0 && (
        <p className="card py-12 text-center text-sm text-subtle">
          Nenhum quiz encontrado com esse filtro.
        </p>
      )}

      {visible.length > 0 && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>

          <p className="text-center text-xs text-faint">
            Quizzes não são excluídos isoladamente: apagar um resumo em{' '}
            <Link href="/meus-resumos" className="font-semibold text-purple-700 hover:underline">
              Meus resumos
            </Link>{' '}
            apaga junto os quizzes gerados a partir dele.
          </p>
        </>
      )}
    </section>
  );
}
