import { PLANS_BY_ID } from '@/constants/plans/plans';
import { PlanId } from '@/types/Plan';
import { formatSummaryDate } from '@/utils/formatters/format-summary-date';
import { daysUntil } from '@/utils/plans/days-until';
import { Crown } from 'lucide-react';

type CurrentPlanBannerProps = {
  planId: PlanId;
  subscriptionEnd?: string | null;
};

export function CurrentPlanBanner({ planId, subscriptionEnd }: CurrentPlanBannerProps) {
  const plan = PLANS_BY_ID[planId];

  if (!plan) return null;

  const remaining = daysUntil(subscriptionEnd);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-purple-200 bg-purple-50 p-5">
      <div className="flex items-center gap-4">
        <span className="flex size-11 items-center justify-center rounded-xl bg-surface text-purple-700">
          <Crown size={19} />
        </span>

        <div className="space-y-0.5">
          <p className="font-display text-sm font-extrabold text-purple-700">
            Plano {plan.name} ativo
          </p>
          <p className="text-sm text-purple-700/80">
            {plan.weeklyLimit} gerações a cada 7 dias
            {subscriptionEnd ? ` · válido até ${formatSummaryDate(subscriptionEnd)}` : ''}
          </p>
        </div>
      </div>

      {remaining !== null && remaining > 0 && (
        <span className="chip bg-white text-purple-700">
          {remaining} {remaining === 1 ? 'dia restante' : 'dias restantes'}
        </span>
      )}
    </div>
  );
}
