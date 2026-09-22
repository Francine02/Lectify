export type PlanId = '1_month' | '6_months' | '1_year';

export interface Plan {
  id: PlanId;
  name: string;
  price: number;
  months: number;
  /** Espelha PLAN_RANKS do backend — define o que é upgrade e o que é downgrade. */
  rank: number;
  /** Gerações por ciclo de 7 dias — contador separado para resumos e questões. */
  weeklyLimit: number;
  /** Teto mensal, acima do ciclo de 7 dias. */
  monthlyLimit: number;
  description: string;
  highlight?: boolean;
  /** Assinantes do plano anual são atendidos primeiro na fila de processamento. */
  queuePriority?: boolean;
}
