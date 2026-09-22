import {
  FEATURE_MINUTE_LIMITS,
  RateFeature,
  SHARED_MINUTE_CEILING,
} from '@/constants/plans/plan-limits';
import { UsageData } from '@/types/UsageData';

/**
 * Guarda de ritmo do cliente para as duas rotas de geração.
 *
 * O backend cobra dois limites ao mesmo tempo: um por funcionalidade
 * (contadores separados — gastar resumo não consome quiz) e um teto antiabuso
 * compartilhado. O detalhe que engana: o contador por funcionalidade só avança
 * nas respostas 201, mas a checagem barra *qualquer* requisição quando ele já
 * está no teto. Ou seja, acerto de cache é gratuito enquanto sobrar cota de
 * geração no minuto — esgotada a cota, até o cache leva 429.
 *
 * Espelhamos exatamente isso: `registerGeneration` só é chamado no 201 e
 * `registerAttempt` em toda tentativa. O motivo de existir é o bloqueio: quatro
 * 429 em cinco minutos travam a conta por 30 minutos, e só as rotas que
 * consomem cota alimentam esse contador.
 */
const WINDOW_MS = 60_000;

type Cooldown = {
  /** Segundos até a rota aceitar outra chamada. 0 = pode ir. */
  seconds: number;
  /** Qual camada barrou — muda a mensagem mostrada ao usuário. */
  reason?: 'feature' | 'shared';
};

const FREE: Cooldown = { seconds: 0 };

const generations: Record<RateFeature, number[]> = { summarize: [], questions: [] };

let attempts: number[] = [];

/** Limites vivos: começam no palpite e são substituídos pelo que /usage informa. */
const limits: Record<RateFeature, number> = { ...FEATURE_MINUTE_LIMITS };

const prune = (times: number[]) => {
  const now = Date.now();
  return times.filter((time) => now - time < WINDOW_MS);
};

const waitFor = (times: number[]) => {
  const oldest = Math.min(...times);
  return Math.max(1, Math.ceil((oldest + WINDOW_MS - Date.now()) / 1000));
};

/**
 * Aplica os limites por minuto que o backend declarou. Chamado a cada leitura
 * de `GET /usage` — assim os números nunca ficam fixos no código.
 */
export const syncFeatureLimits = (usage?: UsageData | null) => {
  if (!usage?.features) return;

  (Object.keys(limits) as RateFeature[]).forEach((feature) => {
    const minute = usage.features[feature]?.find((entry) => entry.period === 'minute');

    if (minute && minute.limit > 0) limits[feature] = minute.limit;
  });
};

export const featureMinuteLimit = (feature: RateFeature) => limits[feature];

/** Toda requisição às rotas de geração conta para o teto compartilhado. */
export const registerAttempt = () => {
  attempts = prune(attempts);
  attempts.push(Date.now());
};

/** Só o 201 gasta cota — 200 (cache) e 409 (já na fila) não avançam o contador. */
export const registerGeneration = (feature: RateFeature) => {
  generations[feature] = prune(generations[feature]);
  generations[feature].push(Date.now());
};

/** Registra a tentativa e, se a resposta consumiu cota, também a geração. */
export const registerResponse = (feature: RateFeature, status?: number) => {
  registerAttempt();
  if (status === 201) registerGeneration(feature);
};

export const featureCooldown = (feature: RateFeature): Cooldown => {
  generations[feature] = prune(generations[feature]);
  attempts = prune(attempts);

  if (attempts.length >= SHARED_MINUTE_CEILING)
    return { seconds: waitFor(attempts), reason: 'shared' };

  if (generations[feature].length >= limits[feature])
    return { seconds: waitFor(generations[feature]), reason: 'feature' };

  return FREE;
};

export const summaryCooldown = () => featureCooldown('summarize');
export const questionsCooldown = () => featureCooldown('questions');

/** Mensagem pronta para o toast — explica por que a ação foi adiada. */
export const cooldownMessage = (feature: RateFeature, cooldown: Cooldown) => {
  if (cooldown.reason === 'shared')
    return `Aguarde ${cooldown.seconds}s: muitas gerações seguidas. Insistir bloqueia a conta por 30 minutos.`;

  const label = feature === 'summarize' ? 'resumos' : 'questões';

  return `Aguarde ${cooldown.seconds}s — o limite é de ${limits[feature]} ${label} por minuto. Reabrir o que já foi gerado não consome esse ritmo.`;
};

export const resetRateGuard = () => {
  generations.summarize = [];
  generations.questions = [];
  attempts = [];
};

/* ------------------------------------------------------------------ *
 * Bloqueio antiabuso (403 com "try again in N minute(s)")
 * ------------------------------------------------------------------ */

const BLOCK_KEY = 'lectify:blocked-until';

const store = () => {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

const setBlockedUntil = (timestamp: number) => {
  try {
    store()?.setItem(BLOCK_KEY, String(timestamp));
  } catch {
    // sem storage o bloqueio some no reload — o backend continua barrando
  }
};

/** Lê a mensagem crua do backend e guarda até quando as ações ficam travadas. */
export const registerBlockFromError = (message?: string) => {
  if (!message || typeof window === 'undefined') return;
  if (!/temporarily blocked/i.test(message)) return;

  const found = message.match(/try again in (\d+)\s*minute/i);
  const minutes = found ? Number(found[1]) : 30;

  setBlockedUntil(Date.now() + minutes * 60_000);
};

/** Segundos restantes de bloqueio. 0 = liberado. */
export const blockRemaining = () => {
  if (typeof window === 'undefined') return 0;

  const raw = store()?.getItem(BLOCK_KEY);
  if (!raw) return 0;

  const remaining = Math.ceil((Number(raw) - Date.now()) / 1000);

  if (remaining <= 0) {
    try {
      store()?.removeItem(BLOCK_KEY);
    } catch {
      // nada a fazer
    }
    return 0;
  }

  return remaining;
};

export const clearBlock = () => {
  try {
    store()?.removeItem(BLOCK_KEY);
  } catch {
    // nada a fazer
  }
};
