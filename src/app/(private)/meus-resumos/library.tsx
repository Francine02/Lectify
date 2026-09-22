'use client';

import { SummaryCard } from '@/components/Library/SummaryCard';
import { SummaryCardSkeleton } from '@/components/Library/SummaryCardSkeleton';
import { CACHE_KEYS } from '@/constants/cache/cache-keys';
import { useCachedQuery } from '@/hooks/useCachedQuery';
import { getSummaryFiles } from '@/service/summary/get-summary-files';
import { SummaryFile } from '@/types/SummaryFile';
import { readCache, writeCache } from '@/utils/cache/client-cache';
import { cn } from '@/utils/cn';
import { summaryExpiration } from '@/utils/summary/expiration';
import { BookMarked, Clock3, RefreshCw, Search, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

type Filter = 'all' | 'pdf' | 'md' | 'soon';

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'pdf', label: 'PDF' },
  { id: 'md', label: 'Markdown' },
  { id: 'soon', label: 'Vencendo' },
];

export function SummaryLibrary() {
  const { data, status, isRevalidating, refetch } = useCachedQuery<SummaryFile[]>(
    CACHE_KEYS.summaryFiles,
    getSummaryFiles,
    { staleTime: 30_000 }
  );

  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');

  const files = useMemo(
    () =>
      [...(data ?? [])].sort(
        (a, b) => new Date(b.summary_at).getTime() - new Date(a.summary_at).getTime()
      ),
    [data]
  );

  const expiringCount = files.filter(
    (file) => summaryExpiration(file.expires_at).state !== 'ok'
  ).length;

  const visible = files.filter((file) => {
    const matchesSearch =
      !search.trim() ||
      file.filename.toLowerCase().includes(search.toLowerCase()) ||
      file.youtube_url?.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (filter === 'all') return true;
    if (filter === 'soon') return summaryExpiration(file.expires_at).state !== 'ok';

    return file.filetype === filter;
  });

  const handleDeleted = (id: string) => {
    const cached = readCache<SummaryFile[]>(CACHE_KEYS.summaryFiles)?.data ?? files;
    writeCache(
      CACHE_KEYS.summaryFiles,
      cached.filter((file) => file.id !== id)
    );
  };

  const isFirstLoad = status === 'loading';

  return (
    <section className="space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-title font-extrabold">Meus resumos</h1>
          <p className="subtitle">
            {files.length > 0
              ? `${files.length} ${files.length === 1 ? 'resumo salvo' : 'resumos salvos'} · disponíveis por 7 dias`
              : 'Tudo o que você gera fica salvo aqui por 7 dias.'}
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
            href="/gerar-resumo"
            className="focus-ring inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
          >
            <Sparkles size={15} />
            Novo resumo
          </Link>
        </div>
      </header>

      {expiringCount > 0 && (
        <p className="flex items-center gap-2 rounded-2xl bg-sun-50 px-4 py-3 text-sm text-sun-700">
          <Clock3 size={15} className="shrink-0" />
          {expiringCount === 1
            ? '1 resumo vence em menos de 2 dias — baixe antes que expire.'
            : `${expiringCount} resumos vencem em menos de 2 dias — baixe antes que expirem.`}
        </p>
      )}

      {files.length > 0 && (
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[200px] flex-1">
            <Search
              size={15}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-faint"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por nome ou link"
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

      {isFirstLoad && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((key) => (
            <SummaryCardSkeleton key={key} />
          ))}
        </div>
      )}

      {status === 'error' && (
        <div className="card flex flex-col items-center gap-4 py-16 text-center">
          <p className="subtitle max-w-sm">
            Não conseguimos carregar seus resumos agora. Verifique sua conexão e tente de novo.
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

      {status === 'ready' && files.length === 0 && (
        <div className="card flex flex-col items-center gap-3 border-dashed py-16 text-center">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
            <BookMarked size={24} />
          </span>

          <div className="space-y-1">
            <h2 className="font-display text-base font-extrabold">Nenhum resumo ainda</h2>
            <p className="subtitle mx-auto max-w-sm">
              Gere seu primeiro resumo a partir de um vídeo do YouTube e ele aparece aqui.
            </p>
          </div>

          <Link
            href="/gerar-resumo"
            className="focus-ring mt-2 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
          >
            <Sparkles size={15} />
            Gerar resumo
          </Link>
        </div>
      )}

      {status === 'ready' && files.length > 0 && visible.length === 0 && (
        <p className="card py-12 text-center text-sm text-subtle">
          Nenhum resumo encontrado com esse filtro.
        </p>
      )}

      {visible.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((file) => (
            <SummaryCard key={file.id} file={file} onDeleted={handleDeleted} />
          ))}
        </div>
      )}
    </section>
  );
}
