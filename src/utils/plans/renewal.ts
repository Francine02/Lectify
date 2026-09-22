import { RENEWAL_WINDOW_DAYS } from '@/constants/plans/plans';
import { daysUntil } from './days-until';

/** Data em que a renovação do plano é liberada (vencimento menos a janela). */
export const renewalOpensAt = (subscriptionEnd?: string | null) => {
  if (!subscriptionEnd) return null;

  const end = new Date(subscriptionEnd);

  if (Number.isNaN(end.getTime())) return null;

  const opensAt = new Date(end);
  opensAt.setDate(opensAt.getDate() - RENEWAL_WINDOW_DAYS);

  return opensAt.toISOString();
};

export type SubscriptionAlert = 'expired' | 'expiring' | 'renewable' | 'none';

/** Urgência da assinatura, usada nos avisos de renovação. */
export const subscriptionAlert = (subscriptionEnd?: string | null): SubscriptionAlert => {
  const remaining = daysUntil(subscriptionEnd);

  if (remaining === null) return 'none';
  if (remaining <= 0) return 'expired';
  if (remaining <= 7) return 'expiring';
  if (remaining <= RENEWAL_WINDOW_DAYS) return 'renewable';

  return 'none';
};
