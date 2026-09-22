import { Plan } from '@/types/Plan';
import { PLAN_MONTHLY_QUOTAS, PLAN_WEEKLY_QUOTAS } from './plan-limits';

export const PLANS: Plan[] = [
  {
    id: '1_month',
    name: '1 mês',
    price: 19.9,
    months: 1,
    rank: 1,
    weeklyLimit: PLAN_WEEKLY_QUOTAS['1_month'],
    monthlyLimit: PLAN_MONTHLY_QUOTAS['1_month'],
    description: 'Para experimentar a plataforma sem compromisso.',
  },
  {
    id: '6_months',
    name: '6 meses',
    price: 99.9,
    months: 6,
    rank: 2,
    weeklyLimit: PLAN_WEEKLY_QUOTAS['6_months'],
    monthlyLimit: PLAN_MONTHLY_QUOTAS['6_months'],
    description: 'O equilíbrio ideal entre preço e volume de estudo.',
    highlight: true,
  },
  {
    id: '1_year',
    name: '1 ano',
    price: 179.9,
    months: 12,
    rank: 3,
    weeklyLimit: PLAN_WEEKLY_QUOTAS['1_year'],
    monthlyLimit: PLAN_MONTHLY_QUOTAS['1_year'],
    description: 'Para quem estuda todos os dias e precisa de folga no limite.',
    queuePriority: true,
  },
];

export const PLANS_BY_ID = Object.fromEntries(PLANS.map((plan) => [plan.id, plan])) as Record<
  string,
  Plan
>;

/** Janela em que a renovação do mesmo plano fica liberada. */
export const RENEWAL_WINDOW_DAYS = 30;
