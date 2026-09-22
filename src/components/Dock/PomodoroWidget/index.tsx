'use client';

import { POMODORO_LABELS, PomodoroMode, usePomodoro } from '@/contexts/Pomodoro';
import { useTools } from '@/contexts/Tools';
import { cn } from '@/utils/cn';
import { Pause, Play, RotateCcw, SkipForward, Timer, X } from 'lucide-react';

const MODES: PomodoroMode[] = ['focus', 'short', 'long'];

export function PomodoroWidget() {
  const { mode, isRunning, formatted, progress, completedFocus, toggle, reset, skip, selectMode } =
    usePomodoro();
  const { openTool, toggle: toggleTool, close } = useTools();

  const isOpen = openTool === 'pomodoro';
  // no desktop a porta de entrada é a barra lateral: o canto só guarda o timer
  // enquanto ele está rodando
  const showBubble = isRunning || isOpen;

  return (
    <div className="pointer-events-auto flex flex-col items-end gap-2">
      {isOpen && (
        <section className="w-[268px] animate-pop-in rounded-2xl border border-line bg-surface p-4 shadow-float">
          <header className="mb-3 flex items-center justify-between">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-subtle">
              <Timer size={13} className="text-purple-600" />
              Pomodoro
            </p>

            <button
              type="button"
              onClick={close}
              aria-label="Fechar pomodoro"
              className="focus-ring rounded-lg p-1 text-faint transition-colors hover:bg-canvas hover:text-ink"
            >
              <X size={15} />
            </button>
          </header>

          <div className="mb-3 flex gap-1 rounded-xl bg-canvas p-1">
            {MODES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => selectMode(item)}
                className={cn(
                  'flex-1 rounded-lg px-2 py-1.5 text-[11px] font-semibold transition-colors',
                  mode === item ? 'bg-surface text-purple-700 shadow-soft' : 'text-subtle'
                )}
              >
                {POMODORO_LABELS[item]}
              </button>
            ))}
          </div>

          <p className="text-center font-display text-5xl font-extrabold tabular-nums tracking-tight">
            {formatted}
          </p>

          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-canvas">
            <div
              className="h-full rounded-full bg-purple-600 transition-[width] duration-500"
              style={{ width: `${Math.min(progress * 100, 100)}%` }}
            />
          </div>

          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              onClick={toggle}
              className="focus-ring inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
            >
              {isRunning ? <Pause size={15} /> : <Play size={15} />}
              {isRunning ? 'Pausar' : 'Começar'}
            </button>

            <button
              type="button"
              onClick={reset}
              aria-label="Reiniciar"
              className="focus-ring rounded-xl border border-line p-2.5 text-subtle transition-colors hover:bg-canvas"
            >
              <RotateCcw size={15} />
            </button>

            <button
              type="button"
              onClick={skip}
              aria-label="Pular etapa"
              className="focus-ring rounded-xl border border-line p-2.5 text-subtle transition-colors hover:bg-canvas"
            >
              <SkipForward size={15} />
            </button>
          </div>

          <p className="mt-3 text-center text-[11px] text-faint">
            {completedFocus} {completedFocus === 1 ? 'ciclo concluído' : 'ciclos concluídos'} hoje
          </p>
        </section>
      )}

      <button
        type="button"
        onClick={() => toggleTool('pomodoro')}
        aria-label="Abrir pomodoro"
        className={cn(
          'focus-ring flex items-center gap-2 rounded-full border px-3 py-2.5 shadow-lift transition-colors',
          !showBubble && 'lg:hidden',
          isRunning
            ? 'border-brand bg-brand text-white'
            : 'border-line bg-surface text-ink hover:border-line-strong'
        )}
      >
        <Timer size={16} className={cn(isRunning && 'animate-pulse')} />
        <span className="text-xs font-bold tabular-nums">{formatted}</span>
      </button>
    </div>
  );
}
