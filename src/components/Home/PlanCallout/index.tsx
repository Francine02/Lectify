'use client';

import { PLANS } from '@/constants/plans/plans';
import { useAccountPlan } from '@/hooks/useAccountPlan';
import { formatPrice } from '@/utils/formatters/format-price';
import { ArrowRight, Crown } from 'lucide-react';
import Link from 'next/link';
import { UsagePanel } from '@/components/Usage/UsagePanel';

export function PlanCallout() {
  const { isFree, isLoading } = useAccountPlan();

  if (isLoading) return <div className="skeleton h-40 rounded-2xl" />;

  if (isFree === false) return <UsagePanel />;

  const cheapest = PLANS.reduce((lowest, plan) => (plan.price < lowest.price ? plan : lowest));

  return (
    <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-brand p-6 text-white">
      <div className="flex items-start gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
          <Crown size={20} />
        </span>

        <div className="space-y-1">
          <h2 className="font-display text-lg font-extrabold">Sua conta ainda é gratuita</h2>
          <p className="max-w-md text-sm text-white/75">
            Escolha um plano para liberar a geração de resumos e questões. A partir de{' '}
            {formatPrice(cheapest.price)}.
          </p>
        </div>
      </div>

      <Link
        href="/planos"
        className="focus-ring inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-purple-800 transition-transform hover:-translate-y-0.5"
      >
        Ver planos
        <ArrowRight size={15} />
      </Link>
    </section>
  );
}
