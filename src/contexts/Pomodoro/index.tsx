'use client';

import { LOCAL_KEYS, readLocal, writeLocal } from '@/utils/storage/local-store';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

export type PomodoroMode = 'focus' | 'short' | 'long';

export const POMODORO_DURATIONS: Record<PomodoroMode, number> = {
  focus: 25 * 60,
  short: 5 * 60,
  long: 15 * 60,
};

export const POMODORO_LABELS: Record<PomodoroMode, string> = {
  focus: 'Foco',
  short: 'Pausa curta',
  long: 'Pausa longa',
};

type StoredState = {
  mode: PomodoroMode;
  /** Timestamp do fim quando rodando — assim o relógio não depende da aba ativa. */
  endsAt: number | null;
  remaining: number;
  isRunning: boolean;
  completedFocus: number;
};

type PomodoroValue = StoredState & {
  duration: number;
  progress: number;
  label: string;
  formatted: string;
  toggle: () => void;
  reset: () => void;
  skip: () => void;
  selectMode: (mode: PomodoroMode) => void;
};

const INITIAL: StoredState = {
  mode: 'focus',
  endsAt: null,
  remaining: POMODORO_DURATIONS.focus,
  isRunning: false,
  completedFocus: 0,
};

const PomodoroContext = createContext<PomodoroValue | null>(null);

const format = (seconds: number) => {
  const safe = Math.max(0, Math.round(seconds));
  const minutes = Math.floor(safe / 60);

  return `${String(minutes).padStart(2, '0')}:${String(safe % 60).padStart(2, '0')}`;
};

/** Bip curto no fim do ciclo — sem arquivo de áudio para não pesar o bundle. */
const chime = () => {
  try {
    const Audio = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const context = new Audio();
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.frequency.value = 660;
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.2, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.9);

    oscillator.start();
    oscillator.stop(context.currentTime + 0.9);
  } catch {
    // navegador sem permissão de áudio: o aviso visual já resolve
  }
};

export function PomodoroProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StoredState>(INITIAL);
  const finishedRef = useRef(false);

  useEffect(() => {
    const saved = readLocal<StoredState>(LOCAL_KEYS.pomodoro, INITIAL);

    if (saved.isRunning && saved.endsAt) {
      const left = Math.round((saved.endsAt - Date.now()) / 1000);

      setState(
        left > 0
          ? { ...saved, remaining: left }
          : { ...saved, isRunning: false, endsAt: null, remaining: 0 }
      );
      return;
    }

    setState({ ...saved, isRunning: false, endsAt: null });
  }, []);

  const save = useCallback((next: StoredState) => {
    setState(next);
    writeLocal(LOCAL_KEYS.pomodoro, next);
  }, []);

  const advance = useCallback(
    (current: StoredState) => {
      const completedFocus = current.mode === 'focus' ? current.completedFocus + 1 : current.completedFocus;
      const nextMode: PomodoroMode =
        current.mode !== 'focus' ? 'focus' : completedFocus % 4 === 0 ? 'long' : 'short';

      save({
        mode: nextMode,
        endsAt: null,
        isRunning: false,
        remaining: POMODORO_DURATIONS[nextMode],
        completedFocus,
      });
    },
    [save]
  );

  useEffect(() => {
    if (!state.isRunning || !state.endsAt) return;

    finishedRef.current = false;

    const interval = setInterval(() => {
      const left = Math.round(((state.endsAt as number) - Date.now()) / 1000);

      if (left > 0) {
        setState((previous) => ({ ...previous, remaining: left }));
        return;
      }

      if (finishedRef.current) return;
      finishedRef.current = true;

      chime();
      advance(state);
    }, 500);

    return () => clearInterval(interval);
  }, [advance, state]);

  const toggle = useCallback(() => {
    if (state.isRunning) {
      const left = state.endsAt ? Math.round((state.endsAt - Date.now()) / 1000) : state.remaining;
      save({ ...state, isRunning: false, endsAt: null, remaining: Math.max(left, 0) });
      return;
    }

    const remaining = state.remaining > 0 ? state.remaining : POMODORO_DURATIONS[state.mode];

    save({ ...state, isRunning: true, remaining, endsAt: Date.now() + remaining * 1000 });
  }, [save, state]);

  const reset = useCallback(
    () =>
      save({
        ...state,
        isRunning: false,
        endsAt: null,
        remaining: POMODORO_DURATIONS[state.mode],
      }),
    [save, state]
  );

  const skip = useCallback(() => advance(state), [advance, state]);

  const selectMode = useCallback(
    (mode: PomodoroMode) =>
      save({ ...state, mode, isRunning: false, endsAt: null, remaining: POMODORO_DURATIONS[mode] }),
    [save, state]
  );

  const duration = POMODORO_DURATIONS[state.mode];

  return (
    <PomodoroContext.Provider
      value={{
        ...state,
        duration,
        progress: duration > 0 ? 1 - state.remaining / duration : 0,
        label: POMODORO_LABELS[state.mode],
        formatted: format(state.remaining),
        toggle,
        reset,
        skip,
        selectMode,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
}

export function usePomodoro() {
  const context = useContext(PomodoroContext);

  if (!context) throw new Error('usePomodoro precisa estar dentro de PomodoroProvider');

  return context;
}
