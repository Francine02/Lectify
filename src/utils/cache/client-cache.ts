/**
 * Cache de leitura do cliente (stale-while-revalidate).
 *
 * Guarda a última resposta de cada endpoint em memória e no sessionStorage, para
 * que voltar a uma tela já visitada pinte a lista na hora e a revalidação
 * aconteça em segundo plano — sem a tela em branco de sempre.
 */
type CacheEntry<T> = {
  data: T;
  updatedAt: number;
};

const PREFIX = 'lectify:cache:';

const memory = new Map<string, CacheEntry<unknown>>();
const listeners = new Map<string, Set<(entry: CacheEntry<unknown>) => void>>();

const session = () => {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
};

export const readCache = <T>(key: string): CacheEntry<T> | null => {
  const inMemory = memory.get(key) as CacheEntry<T> | undefined;
  if (inMemory) return inMemory;

  if (typeof window === 'undefined') return null;

  try {
    const raw = session()?.getItem(PREFIX + key);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as CacheEntry<T>;
    memory.set(key, parsed);

    return parsed;
  } catch {
    return null;
  }
};

export const writeCache = <T>(key: string, data: T) => {
  const entry: CacheEntry<T> = { data, updatedAt: Date.now() };

  memory.set(key, entry);

  try {
    session()?.setItem(PREFIX + key, JSON.stringify(entry));
  } catch {
    // cota cheia ou storage bloqueado: o cache em memória já resolve a sessão
  }

  listeners.get(key)?.forEach((listener) => listener(entry as CacheEntry<unknown>));
};

export const invalidateCache = (key: string) => {
  memory.delete(key);

  try {
    session()?.removeItem(PREFIX + key);
  } catch {
    // nada a fazer
  }
};

export const clearCache = () => {
  memory.clear();

  const store = session();
  if (!store) return;

  try {
    Object.keys(store)
      .filter((key) => key.startsWith(PREFIX))
      .forEach((key) => store.removeItem(key));
  } catch {
    // nada a fazer
  }
};

export const subscribeCache = <T>(key: string, listener: (entry: CacheEntry<T>) => void) => {
  const set = listeners.get(key) ?? new Set();

  set.add(listener as (entry: CacheEntry<unknown>) => void);
  listeners.set(key, set);

  return () => set.delete(listener as (entry: CacheEntry<unknown>) => void);
};
