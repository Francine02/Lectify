'use client';

import { PLANS_BY_ID, RENEWAL_WINDOW_DAYS } from '@/constants/plans/plans';
import { useAccountPlan } from '@/hooks/useAccountPlan';
import { cn } from '@/utils/cn';
import { formatSummaryDate } from '@/utils/formatters/format-summary-date';
import { getInformationItem } from '@/utils/informations/get-informations';
import { daysUntil } from '@/utils/plans/days-until';
import { renewalOpensAt, subscriptionAlert } from '@/utils/plans/renewal';
import { ArrowRight, CalendarDays, Clock3, Crown, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const alertStyles = {
  expired: 'bg-coral-50 text-coral-700',
  expiring: 'bg-sun-50 text-sun-700',
  renewable: 'bg-purple-50 text-purple-700',
  none: '',
};

export function SubscriptionCard({ className }: { className?: string }) {
  const { isFree, plan: planId, isLoading } = useAccountPlan();
  const [subscriptionEnd, setSubscriptionEnd] = useState<string | null>(null);

  useEffect(() => {
    setSubscriptionEnd(String(getInformationItem('subscription_end')) || null);
  }, [planId, isFree]);

  if (isLoading) return <div className={cn('skeleton h-44 rounded-2xl', className)} />;

  if (isFree || !planId || !PLANS_BY_ID[planId])
    return (
      <section className={cn('card flex flex-col justify-between gap-4 p-5', className)}>
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-canvas text-subtle">
            <Crown size={18} />
          </span>

          <div className="space-y-1">
            <h2 className="font-display text-base font-extrabold">Plano gratuito</h2>
            <p className="text-sm text-subtle">
              Gerar resumos e questões exige um plano. Seus resumos já criados continuam acessíveis
              até expirarem.
            </p>
          </div>
        </div>

        <Link
          href="/planos"
          className="focus-ring inline-flex w-fit items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
        >
          Ver planos
          <ArrowRight size={14} />
        </Link>
      </section>
    );

  const plan = PLANS_BY_ID[planId];
  const remaining = daysUntil(subscriptionEnd);
  const alert = subscriptionAlert(subscriptionEnd);
  const opensAt = renewalOpensAt(subscriptionEnd);
  const canRenewNow = alert !== 'none';

  return (
    <section className={cn('card space-y-4 p-5', className)}>
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
            <Crown size={18} />
          </span>

          <div>
            <h2 className="font-display text-base font-extrabold">Plano {plan.name}</h2>
            <p className="text-sm text-subtle">{plan.weeklyLimit} gerações a cada 7 dias</p>
          </div>
        </div>

        {canRenewNow && (
          <Link
            href="/planos"
            className="focus-ring inline-flex items-center gap-1.5 rounded-xl bg-brand px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-hover"
          >
            <RefreshCw size={12} />
            Renovar
          </Link>
        )}
      </header>

      <dl className="grid gap-4 border-t border-line pt-4 sm:grid-cols-2">
        <div className="flex items-start gap-2.5">
          <CalendarDays className="mt-0.5 shrink-0 text-faint" size={14} />
          <div>
            <dt className="text-xs text-subtle">Vence em</dt>
            <dd className="text-sm font-semibold">{formatSummaryDate(subscriptionEnd)}</dd>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <Clock3 className="mt-0.5 shrink-0 text-faint" size={14} />
          <div>
            <dt className="text-xs text-subtle">Tempo restante</dt>
            <dd className="text-sm font-semibold">
              {remaining === null
                ? '-'
                : remaining <= 0
                  ? 'Vencido'
                  : `${remaining} dia${remaining === 1 ? '' : 's'}`}
            </dd>
          </div>
        </div>

        <div className="flex items-start gap-2.5 sm:col-span-2">
          <RefreshCw className="mt-0.5 shrink-0 text-faint" size={14} />
          <div>
            <dt className="text-xs text-subtle">Renovação</dt>
            <dd className="text-sm font-semibold">
              {canRenewNow
                ? 'Liberada agora'
                : `Abre em ${formatSummaryDate(opensAt)} (últimos ${RENEWAL_WINDOW_DAYS} dias)`}
            </dd>
          </div>
        </div>
      </dl>

      {alert !== 'none' && (
        <p className={cn('rounded-xl px-4 py-3 text-sm', alertStyles[alert])}>
          {alert === 'expired'
            ? 'Sua assinatura venceu. Renove para voltar a gerar resumos e questões.'
            : alert === 'expiring'
              ? `Sua assinatura vence em ${remaining} dia${remaining === 1 ? '' : 's'}. Renove para não perder o acesso.`
              : 'Você já pode renovar seu plano — o tempo restante é somado.'}
        </p>
      )}
    </section>
  );
}
