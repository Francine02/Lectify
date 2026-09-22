'use client';

import {
  DEFAULT_SUMMARY_LANGUAGE,
  SummaryLanguage,
} from '@/constants/form/summary-languages';
import { SummaryFormat, useSummaryJob } from '@/contexts/SummaryJob';
import { normalizeYoutubeUrl } from '@/utils/formatters/normalize-youtube-url';
import { readLocal, writeLocal } from '@/utils/storage/local-store';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

export type QueueItemStatus = 'pending' | 'running' | 'done' | 'error';

export type QueueItem = {
  id: string;
  url: string;
  format: SummaryFormat;
  language?: SummaryLanguage;
  status: QueueItemStatus;
  fileId?: string;
  error?: string;
  finishedAt?: number;
};

type StudyQueueValue = {
  items: QueueItem[];
  isPaused: boolean;
  /** Segundos até a próxima geração começar. 0 = pode ir. */
  waiting: number;
  /** A fila está parada esperando o usuário fechar um resumo aberto na tela. */
  isBlockedByResult: boolean;
  pending: number;
  add: (urls: string[], format: SummaryFormat, language?: SummaryLanguage) => number;
  remove: (id: string) => void;
  retry: (id: string) => void;
  clearFinished: () => void;
  clearAll: () => void;
  setPaused: (paused: boolean) => void;
};

/**
 * Espaçamento entre gerações. O backend aceita 2 resumos por minuto e o
 * processamento é serial de qualquer forma — um worker, um job por vez, fila
 * global. Damos folga de propósito para a fila nunca chegar perto do limite:
 * um 429 aqui custa caro (quatro deles bloqueiam a conta por 30 minutos).
 */
const SPACING_MS = 120_000;
/** Respiro extra depois que um resumo termina, antes de começar o próximo. */
const COOLDOWN_AFTER_FINISH_MS = 20_000;
const MAX_ITEMS = 12;
const QUEUE_KEY = 'lectify:study-queue';

const uid = () => Math.random().toString(36).slice(2, 10);

const StudyQueueContext = createContext<StudyQueueValue | null>(null);

/**
 * Fila de vídeos: o usuário cola vários links e a geração acontece uma por vez,
 * em segundo plano, com folga entre elas.
 */
export function StudyQueueProvider({ children }: { children: React.ReactNode }) {
  const job = useSummaryJob();

  const [items, setItems] = useState<QueueItem[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [waiting, setWaiting] = useState(0);
  const [isBlockedByResult, setIsBlockedByResult] = useState(false);

  const lastStartRef = useRef(0);
  const lastFinishRef = useRef(0);
  const jobRef = useRef(job);

  jobRef.current = job;

  useEffect(() => {
    const saved = readLocal<QueueItem[]>(QUEUE_KEY, []);

    // um item que ficou "running" de uma sessão anterior volta para a fila
    setItems(saved.map((item) => (item.status === 'running' ? { ...item, status: 'pending' } : item)));
  }, []);

  const persist = useCallback((next: QueueItem[]) => {
    setItems(next);
    writeLocal(QUEUE_KEY, next);
  }, []);

  const patch = useCallback(
    (id: string, changes: Partial<QueueItem>) =>
      setItems((previous) => {
        const next = previous.map((item) => (item.id === id ? { ...item, ...changes } : item));
        writeLocal(QUEUE_KEY, next);
        return next;
      }),
    []
  );

  const add = useCallback(
    (urls: string[], format: SummaryFormat, language: SummaryLanguage = DEFAULT_SUMMARY_LANGUAGE) => {
      let added = 0;

      setItems((previous) => {
        const free = Math.max(MAX_ITEMS - previous.length, 0);

        // a URL é normalizada antes de tudo: é assim que a API a grava, e é
        // assim que a deduplicação com o que já está na fila funciona
        const novos = urls
          .map(normalizeYoutubeUrl)
          .filter((url) => !previous.some((item) => item.url === url && item.status !== 'done'))
          .slice(0, free)
          .map<QueueItem>((url) => ({ id: uid(), url, format, language, status: 'pending' }));

        added = novos.length;

        const next = [...previous, ...novos];
        writeLocal(QUEUE_KEY, next);

        return next;
      });

      return added;
    },
    []
  );

  const remove = useCallback(
    (id: string) =>
      setItems((previous) => {
        const next = previous.filter((item) => item.id !== id);
        writeLocal(QUEUE_KEY, next);
        return next;
      }),
    []
  );

  const retry = useCallback(
    (id: string) => patch(id, { status: 'pending', error: undefined }),
    [patch]
  );

  const clearFinished = useCallback(
    () =>
      setItems((previous) => {
        const next = previous.filter((item) => item.status !== 'done' && item.status !== 'error');
        writeLocal(QUEUE_KEY, next);
        return next;
      }),
    []
  );

  const clearAll = useCallback(() => persist([]), [persist]);

  /** Máquina de estados da fila, avaliada a cada segundo. */
  useEffect(() => {
    const tick = () => {
      const current = jobRef.current;
      const running = items.find((item) => item.status === 'running');

      // o job da fila terminou: registra o resultado e libera a tela
      if (running && current.origin === 'queue' && current.status !== 'running') {
        if (current.status === 'done') {
          patch(running.id, {
            status: 'done',
            fileId: current.result?.fileId,
            finishedAt: Date.now(),
          });
        } else if (current.status === 'error') {
          patch(running.id, { status: 'error', error: current.error, finishedAt: Date.now() });
        } else {
          return;
        }

        lastFinishRef.current = Date.now();
        current.reset();
        return;
      }

      if (running || isPaused) {
        setWaiting(0);
        return;
      }

      const next = items.find((item) => item.status === 'pending');

      if (!next) {
        setWaiting(0);
        return;
      }

      // não começa nada por cima de uma geração manual em andamento
      if (current.status === 'running') {
        setWaiting(0);
        setIsBlockedByResult(false);
        return;
      }

      // nem por cima de um resultado que o usuário ainda está lendo
      if (current.status !== 'idle' && current.origin === 'manual') {
        setWaiting(0);
        setIsBlockedByResult(true);
        return;
      }

      setIsBlockedByResult(false);

      const since = Date.now() - lastStartRef.current;
      const sinceFinish = Date.now() - lastFinishRef.current;
      const remaining = Math.max(SPACING_MS - since, COOLDOWN_AFTER_FINISH_MS - sinceFinish);

      if (remaining > 0) {
        setWaiting(Math.ceil(remaining / 1000));
        return;
      }

      setWaiting(0);
      lastStartRef.current = Date.now();

      patch(next.id, { status: 'running' });
      current.start(
        {
          youtube_url: next.url,
          output_format: next.format,
          language_select: next.language ?? DEFAULT_SUMMARY_LANGUAGE,
        },
        'queue'
      );
    };

    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [isPaused, items, patch]);

  return (
    <StudyQueueContext.Provider
      value={{
        items,
        isPaused,
        waiting,
        isBlockedByResult,
        pending: items.filter((item) => item.status === 'pending' || item.status === 'running')
          .length,
        add,
        remove,
        retry,
        clearFinished,
        clearAll,
        setPaused: setIsPaused,
      }}
    >
      {children}
    </StudyQueueContext.Provider>
  );
}

export function useStudyQueue() {
  const context = useContext(StudyQueueContext);

  if (!context) throw new Error('useStudyQueue precisa estar dentro de StudyQueueProvider');

  return context;
}

export const QUEUE_SPACING_SECONDS = SPACING_MS / 1000;
export const QUEUE_MAX_ITEMS = MAX_ITEMS;
