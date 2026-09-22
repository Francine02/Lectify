'use client';

import { CACHE_KEYS } from '@/constants/cache/cache-keys';
import { useCachedQuery } from '@/hooks/useCachedQuery';
import { getSummaryFiles } from '@/service/summary/get-summary-files';
import { SummaryFile } from '@/types/SummaryFile';
import { cn } from '@/utils/cn';
import { getYoutubeId } from '@/utils/formatters/get-youtube-id';
import { summaryExpiration } from '@/utils/summary/expiration';
import { ArrowRight, BookOpen, Clock3, FileText } from 'lucide-react';
import Link from 'next/link';

/** Atalho para voltar ao que estava sendo estudado — sem passar pela biblioteca. */
export function RecentSummaries() {
  const { data, status } = useCachedQuery<SummaryFile[]>(CACHE_KEYS.summaryFiles, getSummaryFiles, {
    staleTime: 60_000,
  });

  if (status === 'loading')
    return (
      <section className="space-y-3">
        <div className="skeleton h-5 w-44" />
        <div className="grid gap-3 sm:grid-cols-3">
          {[0, 1, 2].map((key) => (
            <div key={key} className="skeleton h-20 rounded-2xl" />
          ))}
        </div>
      </section>
    );

  const recent = [...(data ?? [])]
    .sort((a, b) => new Date(b.summary_at).getTime() - new Date(a.summary_at).getTime())
    .slice(0, 3);

  if (recent.length === 0) return null;

  return (
    <section className="space-y-3">
      <header className="flex items-center justify-between gap-3">
        <h2 className="font-display text-lg font-extrabold">Continue de onde parou</h2>

        <Link
          href="/meus-resumos"
          className="inline-flex items-center gap-1 text-xs font-semibold text-subtle transition-colors hover:text-purple-700"
        >
          Ver todos
          <ArrowRight size={13} />
        </Link>
      </header>

      <div className="grid gap-3 sm:grid-cols-3">
        {recent.map((file) => {
          const expiration = summaryExpiration(file.expires_at);
          const videoId = getYoutubeId(file.youtube_url);

          return (
            <Link
              key={file.id}
              href={`/meus-resumos/${file.id}`}
              className="card card-hover group flex items-center gap-3 overflow-hidden p-3"
            >
              {videoId ? (
                <img
                  src={`https://i.ytimg.com/vi/${videoId}/default.jpg`}
                  alt=""
                  loading="lazy"
                  className="size-12 shrink-0 rounded-xl object-cover"
                />
              ) : (
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
                  <FileText size={18} />
                </span>
              )}

              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold">{file.filename}</span>
                <span
                  className={cn(
                    'mt-0.5 flex items-center gap-1 text-[11px]',
                    expiration.state === 'ok' ? 'text-faint' : 'text-sun-700'
                  )}
                >
                  <Clock3 size={11} />
                  {expiration.label}
                </span>
              </span>

              <BookOpen
                size={16}
                className="shrink-0 text-faint transition-colors group-hover:text-purple-700"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
