'use client';

import { TOUR_STEPS } from '@/constants/home/tour-steps';
import { useTour } from '@/contexts/Tour';
import { cn } from '@/utils/cn';
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

const ACCENTS = {
  purple: 'bg-purple-50 text-purple-700',
  sky: 'bg-sky-50 text-sky-700',
  mint: 'bg-mint-50 text-mint-700',
  sun: 'bg-sun-50 text-sun-700',
};

/** Guia passo a passo: conta o que o recurso faz e mostra a tela em miniatura. */
export function TourDialog() {
  const { isOpen, index, close, next, back, goTo } = useTour();

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') next();
      if (event.key === 'ArrowLeft') back();
    };

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [back, close, isOpen, next]);

  if (!isOpen) return null;

  const step = TOUR_STEPS[index];
  const Icon = step.icon;
  const isLast = index === TOUR_STEPS.length - 1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Guia do Lectify"
      className="fixed inset-0 z-[95] flex items-end justify-center p-3 sm:items-center sm:p-6"
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={close} aria-hidden />

      <div className="relative flex max-h-[92vh] w-full max-w-3xl animate-pop-in flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-float">
        <header className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
          <p className="text-xs font-bold uppercase tracking-wide text-subtle">
            Guia · passo {index + 1} de {TOUR_STEPS.length}
          </p>

          <button
            type="button"
            onClick={close}
            aria-label="Fechar guia"
            className="focus-ring rounded-lg p-1.5 text-faint transition-colors hover:bg-canvas hover:text-ink"
          >
            <X size={16} />
          </button>
        </header>

        <div className="grid flex-1 gap-5 overflow-y-auto p-5 sm:p-6 md:grid-cols-[1fr_260px] md:items-center">
          <div className="space-y-3">
            <span
              className={cn(
                'flex size-11 items-center justify-center rounded-2xl',
                ACCENTS[step.accent]
              )}
            >
              <Icon size={20} />
            </span>

            <h2 className="font-display text-xl font-extrabold leading-tight">{step.title}</h2>
            <p className="text-sm leading-relaxed text-subtle">{step.description}</p>

            {step.bullets && (
              <ul className="space-y-1.5 pt-1">
                {step.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-xs text-subtle">
                    <Check size={13} className="mt-0.5 shrink-0 text-mint-500" strokeWidth={3} />
                    {bullet}
                  </li>
                ))}
              </ul>
            )}

            {step.cta && (
              <Link
                href={step.cta.href}
                onClick={close}
                className="focus-ring inline-flex items-center gap-1.5 rounded-xl border border-line px-4 py-2 text-xs font-bold text-purple-700 transition-colors hover:bg-purple-50"
              >
                {step.cta.label}
                <ArrowRight size={13} />
              </Link>
            )}
          </div>

          {/* a miniatura muda junto com o passo, por isso a key */}
          <div key={step.id} className="animate-fade-up md:justify-self-end">
            {step.preview}
          </div>
        </div>

        <footer className="flex items-center justify-between gap-3 border-t border-line px-5 py-3">
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Passos do guia">
            {TOUR_STEPS.map((item, position) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(position)}
                aria-label={`Ir para o passo ${position + 1}: ${item.title}`}
                aria-selected={position === index}
                role="tab"
                className={cn(
                  'h-1.5 rounded-full transition-all',
                  position === index ? 'w-6 bg-purple-600' : 'w-1.5 bg-line-strong hover:bg-faint'
                )}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={back}
              disabled={index === 0}
              className="focus-ring inline-flex items-center gap-1.5 rounded-xl border border-line px-3 py-2 text-xs font-bold transition-colors hover:bg-canvas disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft size={13} />
              Voltar
            </button>

            <button
              type="button"
              onClick={next}
              className="focus-ring inline-flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-brand-hover"
            >
              {isLast ? 'Concluir' : 'Próximo'}
              {isLast ? <Check size={13} /> : <ArrowRight size={13} />}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
