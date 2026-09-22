'use client';

import { CACHE_KEYS } from '@/constants/cache/cache-keys';
import { useCachedQuery } from '@/hooks/useCachedQuery';
import { getUsage } from '@/service/my-account/get-usage';
import { UsageData, UsageEntry } from '@/types/UsageData';
import { cn } from '@/utils/cn';
import { formatSummaryDate } from '@/utils/formatters/format-summary-date';
import { ListChecks, Sparkles } from 'lucide-react';
import Link from 'next/link';

const FEATURES = [
  { key: 'summarize' as const, label: 'Resumos', icon: Sparkles },
  { key: 'questions' as const, label: 'Questões', icon: ListChecks },
];

const findPeriod = (entries: UsageEntry[] | undefined, period: string) =>
  entries?.find((entry) => entry.period === period);

const barColor = (ratio: number) => {
  if (ratio >= 0.9) return 'bg-coral-500';
  if (ratio >= 0.7) return 'bg-sun-500';
  return 'bg-purple-600';
};

/** Cota do plano: o que resta na semana, no mês e quando reseta. */
export function UsagePanel({ className }: { className?: string }) {
  const { data, status } = useCachedQuery<UsageData>(CACHE_KEYS.usage, getUsage, {
    staleTime: 60_000,
  });

  if (status === 'loading') return <div className={cn('skeleton h-44 rounded-2xl', className)} />;

  if (!data || data.is_free)
    return (
      <section className={cn('card flex flex-col justify-between gap-3 p-5', className)}>
        <div className="space-y-1">
          <h2 className="font-display text-base font-extrabold">Sem cota ativa</h2>
          <p className="text-sm text-subtle">
            Gerar resumos e questões exige um plano. Seus resumos já criados continuam acessíveis.
          </p>
        </div>

        <Link
          href="/planos"
          className="focus-ring inline-flex w-fit items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
        >
          Ver planos
        </Link>
      </section>
    );

  return (
    <section className={cn('card space-y-5 p-5', className)}>
      <header className="space-y-1">
        <h2 className="font-display text-base font-extrabold">Sua cota</h2>
        <p className="text-sm text-subtle">
          O ciclo de 7 dias é o mesmo prazo de validade dos resumos.
        </p>
      </header>

      <div className="space-y-5">
        {FEATURES.map(({ key, label, icon: Icon }) => {
          const week = findPeriod(data.features[key], 'week');
          const month = findPeriod(data.features[key], 'month');

          if (!week) return null;

          const ratio = week.limit > 0 ? week.used / week.limit : 0;

          return (
            <div key={key} className="space-y-2">
              <div className="flex items-end justify-between gap-3">
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <Icon size={14} className="text-purple-600" />
                  {label}
                </span>

                <span className="text-sm">
                  <span className="font-bold">{week.remaining}</span>
                  <span className="text-subtle"> de {week.limit} nos 7 dias</span>
                </span>
              </div>

              <div className="h-2 w-full overflow-hidden rounded-full bg-canvas">
                <div
                  className={cn('h-full rounded-full transition-all duration-500', barColor(ratio))}
                  style={{ width: `${Math.min(ratio * 100, 100)}%` }}
                />
              </div>

              <div className="flex flex-wrap justify-between gap-2 text-xs text-subtle">
                <span>Renova em {formatSummaryDate(week.reset_at)}</span>

                {month && (
                  <span>
                    Mês: {month.used}/{month.limit} · reseta {formatSummaryDate(month.reset_at)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
