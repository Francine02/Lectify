'use client';

import { TOUR_STEPS } from '@/constants/home/tour-steps';
import { readLocal, writeLocal } from '@/utils/storage/local-store';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const SEEN_KEY = 'lectify:tour-seen';

type TourValue = {
  isOpen: boolean;
  index: number;
  hasSeen: boolean;
  /** Abre o guia, opcionalmente direto no passo de um recurso. */
  open: (stepId?: string) => void;
  close: () => void;
  next: () => void;
  back: () => void;
  goTo: (index: number) => void;
};

const TourContext = createContext<TourValue | null>(null);

export function TourProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [hasSeen, setHasSeen] = useState(true);

  useEffect(() => {
    setHasSeen(readLocal<boolean>(SEEN_KEY, false));
  }, []);

  const markSeen = useCallback(() => {
    setHasSeen(true);
    writeLocal(SEEN_KEY, true);
  }, []);

  const open = useCallback((stepId?: string) => {
    const found = stepId ? TOUR_STEPS.findIndex((step) => step.id === stepId) : 0;

    setIndex(found >= 0 ? found : 0);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    markSeen();
  }, [markSeen]);

  const next = useCallback(() => {
    setIndex((previous) => {
      if (previous >= TOUR_STEPS.length - 1) {
        setIsOpen(false);
        markSeen();
        return previous;
      }

      return previous + 1;
    });
  }, [markSeen]);

  const back = useCallback(() => setIndex((previous) => Math.max(previous - 1, 0)), []);

  const goTo = useCallback(
    (target: number) => setIndex(Math.min(Math.max(target, 0), TOUR_STEPS.length - 1)),
    []
  );

  return (
    <TourContext.Provider value={{ isOpen, index, hasSeen, open, close, next, back, goTo }}>
      {children}
    </TourContext.Provider>
  );
}

export function useTour() {
  const context = useContext(TourContext);

  if (!context) throw new Error('useTour precisa estar dentro de TourProvider');

  return context;
}
