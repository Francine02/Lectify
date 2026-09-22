'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type ThemeChoice = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

export const THEME_KEY = 'lectify:theme';

type ThemeValue = {
  /** O que o usuário escolheu. */
  theme: ThemeChoice;
  /** O que está valendo agora (com 'system' já resolvido). */
  resolved: ResolvedTheme;
  setTheme: (theme: ThemeChoice) => void;
};

const ThemeContext = createContext<ThemeValue | null>(null);

const prefersDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

const resolve = (choice: ThemeChoice): ResolvedTheme =>
  choice === 'system' ? (prefersDark() ? 'dark' : 'light') : choice;

/**
 * Tema claro/escuro. O atributo `data-theme` no <html> é quem liga os tokens do
 * CSS — o script inline do layout já o aplica antes do primeiro paint, então
 * aqui só mantemos a escolha em dia.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeChoice>('system');
  const [resolved, setResolved] = useState<ResolvedTheme>('light');

  const apply = useCallback((choice: ThemeChoice) => {
    const next = resolve(choice);

    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    setResolved(next);
  }, []);

  useEffect(() => {
    let saved: ThemeChoice = 'system';

    try {
      saved = (localStorage.getItem(THEME_KEY) as ThemeChoice) || 'system';
    } catch {
      saved = 'system';
    }

    setThemeState(saved);
    apply(saved);
  }, [apply]);

  // acompanha o sistema enquanto a escolha for 'system'
  useEffect(() => {
    if (theme !== 'system') return;

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => apply('system');

    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [apply, theme]);

  const setTheme = useCallback(
    (choice: ThemeChoice) => {
      setThemeState(choice);
      apply(choice);

      try {
        localStorage.setItem(THEME_KEY, choice);
      } catch {
        // sem storage o tema volta ao do sistema no próximo carregamento
      }
    },
    [apply]
  );

  return (
    <ThemeContext.Provider value={{ theme, resolved, setTheme }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) throw new Error('useTheme precisa estar dentro de ThemeProvider');

  return context;
}
