/**
 * Store local simples para as ferramentas que vivem só no navegador
 * (caderno, pomodoro). Grava em localStorage e avisa todas as telas abertas.
 */
const CHANGE_EVENT = 'lectify:local-store';

const storage = () => {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

export const readLocal = <T>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;

  try {
    const raw = storage()?.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const writeLocal = <T>(key: string, value: T) => {
  try {
    storage()?.setItem(key, JSON.stringify(value));
  } catch {
    // modo privado ou cota cheia: seguimos só com o estado em memória
  }

  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: key }));
};

export const removeLocal = (key: string) => {
  try {
    storage()?.removeItem(key);
  } catch {
    // nada a fazer
  }

  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: key }));
};

export const subscribeLocal = (key: string, listener: () => void) => {
  const handleCustom = (event: Event) => {
    if ((event as CustomEvent<string>).detail === key) listener();
  };

  const handleStorage = (event: StorageEvent) => {
    if (event.key === key) listener();
  };

  window.addEventListener(CHANGE_EVENT, handleCustom);
  window.addEventListener('storage', handleStorage);

  return () => {
    window.removeEventListener(CHANGE_EVENT, handleCustom);
    window.removeEventListener('storage', handleStorage);
  };
};

export const LOCAL_KEYS = {
  notes: 'lectify:notes',
  pomodoro: 'lectify:pomodoro',
} as const;
