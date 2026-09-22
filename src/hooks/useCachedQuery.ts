'use client';

import { readCache, subscribeCache, writeCache } from '@/utils/cache/client-cache';
import { ApiResponse } from '@/types/ApiResponse';
import { useCallback, useEffect, useRef, useState } from 'react';

type QueryStatus = 'loading' | 'ready' | 'error';

type Options = {
  /** Tempo em que o dado guardado ainda é considerado fresco (ms). */
  staleTime?: number;
  enabled?: boolean;
};

const inFlight = new Map<string, Promise<unknown>>();

/**
 * Busca com cache: entrega o que já existe imediatamente e revalida por trás.
 * Chamadas simultâneas para a mesma chave compartilham a mesma requisição.
 */
export function useCachedQuery<T>(
  key: string,
  fetcher: () => Promise<ApiResponse<T>>,
  { staleTime = 60_000, enabled = true }: Options = {}
) {
  // o estado inicial não lê o cache: o HTML pré-renderizado não o conhece e a
  // hidratação quebraria. O efeito abaixo preenche no primeiro commit.
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<QueryStatus>('loading');
  const [isRevalidating, setIsRevalidating] = useState(false);

  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const run = useCallback(
    async (force: boolean) => {
      const entry = readCache<T>(key);
      const isFresh = entry && Date.now() - entry.updatedAt < staleTime;

      if (entry) {
        setData(entry.data);
        setStatus('ready');
      }

      if (isFresh && !force) return;

      setIsRevalidating(true);

      const pending =
        (inFlight.get(key) as Promise<ApiResponse<T>> | undefined) ??
        (() => {
          const promise = fetcherRef.current().finally(() => inFlight.delete(key));
          inFlight.set(key, promise);
          return promise;
        })();

      const response = await pending;

      setIsRevalidating(false);

      if (!response.success || response.data === undefined) {
        if (!entry) setStatus('error');
        return;
      }

      writeCache(key, response.data);
      setData(response.data);
      setStatus('ready');
    },
    [key, staleTime]
  );

  useEffect(() => {
    if (!enabled) return;

    run(false);

    const unsubscribe = subscribeCache<T>(key, (entry) => {
      setData(entry.data);
      setStatus('ready');
    });

    return () => {
      unsubscribe();
    };
  }, [enabled, key, run]);

  return {
    data,
    status,
    isRevalidating,
    refetch: () => run(true),
  };
}

/** Aquecimento de cache: usado para adiantar telas que o usuário vai abrir. */
export async function prefetchQuery<T>(
  key: string,
  fetcher: () => Promise<ApiResponse<T>>,
  staleTime = 60_000
) {
  const entry = readCache<T>(key);

  if (entry && Date.now() - entry.updatedAt < staleTime) return;
  if (inFlight.has(key)) return;

  const promise = fetcher().finally(() => inFlight.delete(key));
  inFlight.set(key, promise);

  const response = await promise;

  if (response.success && response.data !== undefined) writeCache(key, response.data);
}
