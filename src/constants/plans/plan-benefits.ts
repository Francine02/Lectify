import { Plan } from '@/types/Plan';
import { FEATURE_MINUTE_LIMITS } from './plan-limits';

/**
 * Benefícios exibidos no card. A cota é por funcionalidade: resumos e questões
 * têm contadores separados, então o número vale para cada um deles.
 */
export const planBenefits = (plan: Plan) => [
  `${plan.weeklyLimit} gerações por semana`,
  `${plan.weeklyLimit} resumos de vídeo a cada 7 dias`,
  `${plan.weeklyLimit} gerações de questões a cada 7 dias — contador separado`,
  `Teto mensal de ${plan.monthlyLimit} gerações em cada funcionalidade`,
  `Ritmo de ${FEATURE_MINUTE_LIMITS.summarize} resumos e ${FEATURE_MINUTE_LIMITS.questions} questões por minuto`,
  'Resumos em PDF ou Markdown, em português ou inglês',
  'Biblioteca com download livre durante os 7 dias',
  ...(plan.queuePriority ? ['Prioridade na fila de processamento'] : []),
];
