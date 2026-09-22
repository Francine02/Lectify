/** Chaves do cache de leitura do cliente. Fonte única para ler, gravar e invalidar. */
export const CACHE_KEYS = {
  summaryFiles: 'summary-files',
  quizzes: 'quizzes',
  usage: 'usage',
  profile: 'profile',
} as const;

/** Cache de um quiz específico — `GET /questions/{id}` tem contador próprio e folgado. */
export const quizCacheKey = (id: string) => `quiz:${id}`;
