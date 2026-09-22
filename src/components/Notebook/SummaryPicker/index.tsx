'use client';

import { CACHE_KEYS } from '@/constants/cache/cache-keys';
import { useCachedQuery } from '@/hooks/useCachedQuery';
import { getSummaryFiles } from '@/service/summary/get-summary-files';
import { NoteSummaryRef } from '@/types/Note';
import { SummaryFile } from '@/types/SummaryFile';
import { cn } from '@/utils/cn';
import { formatSummaryDate } from '@/utils/formatters/format-summary-date';
import { getYoutubeId } from '@/utils/formatters/get-youtube-id';
import { summaryExpiration } from '@/utils/summary/expiration';
import { Clock3, FileText, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';

type SummaryPickerProps = {
  isOpen: boolean;
  onSelect: (summary: NoteSummaryRef) => void;
  onClose: () => void;
};

/** Escolhe um resumo da biblioteca para escrever ao lado dele. */
export function SummaryPicker({ isOpen, onSelect, onClose }: SummaryPickerProps) {
  const { data, status } = useCachedQuery<SummaryFile[]>(CACHE_KEYS.summaryFiles, getSummaryFiles, {
    staleTime: 30_000,
    enabled: isOpen,
  });

  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const files = [...(data ?? [])]
    .sort((a, b) => new Date(b.summary_at).getTime() - new Date(a.summary_at).getTime())
    .filter((file) => !search.trim() || file.filename.toLowerCase().includes(search.toLowerCase()));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Escolher resumo"
      className="fixed inset-0 z-[92] flex items-end justify-center p-3 sm:items-center"
    >
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px]" onClick={onClose} aria-hidden />

      <div className="relative flex max-h-[85vh] w-full max-w-lg animate-pop-in flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-float">
        <header className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
          <h2 className="font-display text-base font-extrabold">Puxar um resumo</h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="focus-ring rounded-lg p-1.5 text-faint transition-colors hover:bg-canvas hover:text-ink"
          >
            <X size={16} />
          </button>
        </header>

        <div className="border-b border-line p-3">
          <div className="relative">
            <Search
              size={15}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-faint"
            />
            <input
              autoFocus
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar na biblioteca"
              className="w-full rounded-xl border border-line bg-canvas py-2.5 pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-faint focus:border-purple-400 focus:bg-surface"
            />
          </div>
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto p-3">
          {status === 'loading' &&
            [0, 1, 2].map((key) => <div key={key} className="skeleton h-16 rounded-xl" />)}

          {status === 'ready' && files.length === 0 && (
            <p className="py-10 text-center text-sm text-subtle">
              {search ? 'Nenhum resumo com esse nome.' : 'Sua biblioteca está vazia.'}
            </p>
          )}

          {files.map((file) => {
            const expiration = summaryExpiration(file.expires_at);
            const videoId = getYoutubeId(file.youtube_url);

            return (
              <button
                key={file.id}
                type="button"
                onClick={() =>
                  onSelect({
                    id: file.id,
                    filename: file.filename,
                    filetype: file.filetype,
                    youtubeUrl: file.youtube_url,
                  })
                }
                className="focus-ring flex w-full items-center gap-3 rounded-xl border border-line p-3 text-left transition-colors hover:border-purple-300 hover:bg-purple-50"
              >
                {videoId ? (
                  <img
                    src={`https://i.ytimg.com/vi/${videoId}/default.jpg`}
                    alt=""
                    loading="lazy"
                    className="size-10 shrink-0 rounded-lg object-cover"
                  />
                ) : (
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-700">
                    <FileText size={16} />
                  </span>
                )}

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold">{file.filename}</span>
                  <span className="mt-0.5 flex items-center gap-2 text-[11px] text-faint">
                    <span className="uppercase">{file.filetype}</span>
                    <span>·</span>
                    <span>{formatSummaryDate(file.summary_at)}</span>
                    <span
                      className={cn(
                        'flex items-center gap-1',
                        expiration.state === 'ok' ? 'text-faint' : 'text-sun-700'
                      )}
                    >
                      <Clock3 size={10} />
                      {expiration.label}
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
