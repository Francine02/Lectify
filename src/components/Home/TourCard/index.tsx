'use client';

import { TOUR_STEPS } from '@/constants/home/tour-steps';
import { useTour } from '@/contexts/Tour';
import { usePathname } from 'next/navigation';
import { Compass, Play } from 'lucide-react';
import { useEffect, useRef } from 'react';

/** Porta de entrada do guia — e o convite automático de quem chega pela primeira vez. */
export function TourCard() {
  const { open, hasSeen } = useTour();
  const path = usePathname();
  const autoOpened = useRef(false);

  useEffect(() => {
    if (hasSeen || autoOpened.current || path !== '/') return;

    autoOpened.current = true;
    open();
  }, [hasSeen, open, path]);

  return (
    <section className="card flex flex-wrap items-center justify-between gap-4 p-5">
      <div className="flex items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
          <Compass size={20} />
        </span>

        <div className="space-y-1">
          <h2 className="font-display text-base font-extrabold">Como funciona o Lectify</h2>
          <p className="max-w-lg text-sm text-subtle">
            Um guia rápido de {TOUR_STEPS.length} passos mostrando cada recurso na prática — do link
            do vídeo até o pomodoro.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => open()}
        className="focus-ring inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-hover"
      >
        <Play size={14} />
        {hasSeen ? 'Rever o guia' : 'Ver o guia'}
      </button>
    </section>
  );
}
