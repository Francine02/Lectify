'use client';

import { ThemeChoice, useTheme } from '@/contexts/Theme';
import { cn } from '@/utils/cn';
import { Monitor, Moon, Palette, Sun } from 'lucide-react';

const OPTIONS: { id: ThemeChoice; label: string; hint: string; icon: typeof Sun }[] = [
  { id: 'light', label: 'Claro', hint: 'Sempre claro', icon: Sun },
  { id: 'dark', label: 'Escuro', hint: 'Sempre escuro', icon: Moon },
  { id: 'system', label: 'Sistema', hint: 'Segue o aparelho', icon: Monitor },
];

/** Miniatura da interface, para escolher pelo visual e não pelo nome. */
const Preview = ({ variant }: { variant: 'light' | 'dark' }) => {
  const isDark = variant === 'dark';

  return (
    <span
      className={cn(
        'flex h-12 w-full gap-1 overflow-hidden rounded-lg border p-1',
        isDark ? 'border-[#262634] bg-[#101018]' : 'border-[#ebebf2] bg-[#f4f4f9]'
      )}
      aria-hidden
    >
      <span className={cn('w-2.5 rounded', isDark ? 'bg-[#15102a]' : 'bg-[#2d1769]')} />

      <span className="flex flex-1 flex-col gap-1">
        <span className={cn('h-2 w-2/3 rounded-sm', isDark ? 'bg-[#35354a]' : 'bg-[#dcdce8]')} />
        <span
          className={cn(
            'flex-1 rounded border',
            isDark ? 'border-[#262634] bg-[#191923]' : 'border-[#ebebf2] bg-white'
          )}
        />
      </span>
    </span>
  );
};

export function AppearanceCard({ className }: { className?: string }) {
  const { theme, resolved, setTheme } = useTheme();

  return (
    <section className={cn('card space-y-4 p-5', className)}>
      <header className="flex items-center gap-2.5">
        <span className="flex size-9 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
          <Palette size={16} />
        </span>

        <div>
          <h2 className="font-display text-base font-extrabold">Aparência</h2>
          <p className="text-sm text-subtle">
            Escolha o tema da interface — vale só neste dispositivo.
          </p>
        </div>
      </header>

      <div className="grid gap-3 sm:grid-cols-3">
        {OPTIONS.map(({ id, label, hint, icon: Icon }) => {
          const isSelected = theme === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => setTheme(id)}
              aria-pressed={isSelected}
              className={cn(
                'focus-ring flex flex-col gap-2 rounded-xl border p-3 text-left transition-colors',
                isSelected
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-line bg-surface hover:bg-canvas'
              )}
            >
              <Preview variant={id === 'system' ? resolved : id} />

              <span className="flex items-center gap-2">
                <Icon size={14} className={isSelected ? 'text-purple-700' : 'text-subtle'} />

                <span className="min-w-0">
                  <span className="block text-sm font-bold leading-tight">{label}</span>
                  <span className="block truncate text-[11px] text-subtle">{hint}</span>
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
