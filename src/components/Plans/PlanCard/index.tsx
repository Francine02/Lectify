'use client';

import { Loading } from '@/components/Loading';
import { planBenefits } from '@/constants/plans/plan-benefits';
import { PLANS } from '@/constants/plans/plans';
import { Plan } from '@/types/Plan';
import { cn } from '@/utils/cn';
import { formatPrice } from '@/utils/formatters/format-price';
import { PlanAvailability } from '@/utils/plans/plan-availability';
import { Check, Sparkles } from 'lucide-react';

type PlanCardProps = {
  plan: Plan;
  availability: PlanAvailability;
  isLoading: boolean;
  isBusy: boolean;
  onSubscribe: () => void;
};

/** Preço mensal do plano mais curto — base para mostrar a economia dos maiores. */
const BASELINE_MONTHLY = Math.max(...PLANS.map((plan) => plan.price / plan.months));

export function PlanCard({ plan, availability, isLoading, isBusy, onSubscribe }: PlanCardProps) {
  const monthlyPrice = plan.price / plan.months;
  const savings = Math.round((1 - monthlyPrice / BASELINE_MONTHLY) * 100);
  const isBlocked = availability.disabled;
  const isHighlighted = plan.highlight && !isBlocked;

  return (
    <article
      className={cn(
        'relative flex flex-col gap-5 rounded-2xl border bg-surface p-6 transition-shadow',
        isHighlighted ? 'border-purple-500 shadow-lift lg:-my-2 lg:py-8' : 'border-line',
        isBlocked ? 'opacity-70' : 'hover:shadow-soft'
      )}
    >
      {plan.highlight && !availability.isCurrent && (
        <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-brand px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
          <Sparkles size={11} />
          Mais escolhido
        </span>
      )}

      <header className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-display text-base font-extrabold">{plan.name}</h2>

          {availability.isCurrent ? (
            <span className="chip bg-mint-50 uppercase text-mint-700">Atual</span>
          ) : (
            savings > 0 && <span className="chip bg-sun-50 text-sun-700">economize {savings}%</span>
          )}
        </div>

        <p className="text-sm text-subtle">{plan.description}</p>
      </header>

      <div className="space-y-1">
        <p className="flex items-end gap-1">
          <span
            className={cn(
              'font-display text-4xl font-extrabold tracking-tight',
              isBlocked ? 'text-faint' : 'text-ink'
            )}
          >
            {formatPrice(monthlyPrice)}
          </span>
          <span className="pb-1.5 text-sm text-subtle">/mês</span>
        </p>

        <p className="text-xs text-subtle">
          {plan.months === 1
            ? 'cobrança mensal'
            : `${formatPrice(plan.price)} pagos uma vez, por ${plan.months} meses`}
        </p>
      </div>

      <div
        className={cn(
          'flex items-center gap-3 rounded-xl p-4',
          isBlocked ? 'bg-canvas' : 'bg-purple-50'
        )}
      >
        <span
          className={cn(
            'font-display text-3xl font-extrabold leading-none',
            isBlocked ? 'text-subtle' : 'text-purple-700'
          )}
        >
          {plan.weeklyLimit}
        </span>
        <span className={cn('text-xs font-semibold', isBlocked ? 'text-subtle' : 'text-purple-700')}>
          gerações a cada
          <br />7 dias
        </span>
      </div>

      <ul className="space-y-2.5">
        {planBenefits(plan)
          .slice(1)
          .map((benefit) => (
            <li key={benefit} className="flex items-start gap-2 text-sm text-subtle">
              <Check className="mt-0.5 shrink-0 text-mint-500" size={14} strokeWidth={3} />
              {benefit}
            </li>
          ))}
      </ul>

      <div className="mt-auto space-y-2 pt-1">
        <button
          type="button"
          onClick={onSubscribe}
          disabled={isBlocked || isBusy || isLoading}
          className={cn(
            'focus-ring inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-colors',
            isBlocked || isBusy
              ? 'cursor-not-allowed bg-canvas text-faint'
              : isHighlighted
                ? 'bg-brand text-white hover:bg-brand-hover'
                : 'border border-line-strong bg-surface text-purple-700 hover:bg-purple-50'
          )}
        >
          {isLoading && <Loading className="size-4" />}
          {availability.label}
        </button>

        {availability.hint && (
          <p className="text-center text-xs text-subtle">{availability.hint}</p>
        )}
      </div>
    </article>
  );
}
