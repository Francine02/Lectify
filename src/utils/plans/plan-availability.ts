import { PLANS_BY_ID, RENEWAL_WINDOW_DAYS } from '@/constants/plans/plans';
import { Plan, PlanId } from '@/types/Plan';
import { formatSummaryDate } from '@/utils/formatters/format-summary-date';
import { daysUntil } from './days-until';

export type PlanAvailability = {
  label: string;
  disabled: boolean;
  hint?: string;
  isCurrent: boolean;
};

type Params = {
  plan: Plan;
  currentPlanId?: PlanId | null;
  subscriptionEnd?: string | null;
  isFree: boolean;
};

/**
 * Regras da tela de planos:
 * - sem assinatura ativa: tudo liberado;
 * - plano de rank maior: upgrade liberado (o backend soma o tempo restante);
 * - plano de rank menor: bloqueado, não faz sentido pagar por menos do que já se tem;
 * - mesmo plano: renovação só perto do vencimento.
 */
export const planAvailability = ({
  plan,
  currentPlanId,
  subscriptionEnd,
  isFree,
}: Params): PlanAvailability => {
  const current = currentPlanId ? PLANS_BY_ID[currentPlanId] : undefined;

  if (isFree || !current) return { label: 'Assinar', disabled: false, isCurrent: false };

  if (plan.rank > current.rank)
    return {
      label: 'Fazer upgrade',
      disabled: false,
      hint: 'O tempo que resta do seu plano atual é somado.',
      isCurrent: false,
    };

  if (plan.rank < current.rank)
    return {
      label: 'Plano inferior ao seu',
      disabled: true,
      hint: `Você já tem o plano ${current.name}, com limite maior.`,
      isCurrent: false,
    };

  const remaining = daysUntil(subscriptionEnd);

  if (remaining === null) return { label: 'Renovar', disabled: false, isCurrent: true };

  if (remaining > RENEWAL_WINDOW_DAYS)
    return {
      label: 'Renovação ainda não liberada',
      disabled: true,
      hint: `Seu plano vale até ${formatSummaryDate(subscriptionEnd)}. A renovação abre nos últimos ${RENEWAL_WINDOW_DAYS} dias.`,
      isCurrent: true,
    };

  return {
    label: 'Renovar plano',
    disabled: false,
    hint:
      remaining <= 0
        ? 'Seu plano venceu.'
        : `Faltam ${remaining} dia(s) para o vencimento.`,
    isCurrent: true,
  };
};
