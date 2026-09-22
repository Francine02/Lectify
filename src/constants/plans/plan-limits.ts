import { PlanId } from '@/types/Plan';

/**
 * Limites de ritmo das rotas de geração. São duas camadas independentes:
 *
 * 1. ritmo por funcionalidade — contadores separados, só avançam no 201;
 * 2. teto antiabuso compartilhado pelas duas rotas — conta toda requisição.
 *
 * Os valores abaixo são apenas o ponto de partida: quem manda é o período
 * `minute` de `GET /usage`, que o rate-guard lê e aplica assim que chega.
 * As rotas de leitura (listagens, download, quiz salvo) não têm freio no
 * cliente — são folgadas e os 429 delas não escalam para bloqueio.
 */
export type RateFeature = 'summarize' | 'questions';

export const FEATURE_MINUTE_LIMITS: Record<RateFeature, number> = {
  summarize: 2,
  questions: 6,
};

/**
 * Teto compartilhado por `POST /summarize` e `POST /questions`. O backend
 * aceita 15/min; guardamos uma de folga porque outra aba pode estar gastando
 * o mesmo orçamento — e quatro 429 em cinco minutos bloqueiam a conta.
 */
export const SHARED_MINUTE_CEILING = 14;

/** Cota de gerações por ciclo de 7 dias. Informativa: quem cobra é o backend. */
export const PLAN_WEEKLY_QUOTAS: Record<PlanId, number> = {
  '1_month': 12,
  '6_months': 24,
  '1_year': 50,
};

/** Cota mensal — teto acima do ciclo semanal, também cobrado pelo backend. */
export const PLAN_MONTHLY_QUOTAS: Record<PlanId, number> = {
  '1_month': 48,
  '6_months': 96,
  '1_year': 200,
};
