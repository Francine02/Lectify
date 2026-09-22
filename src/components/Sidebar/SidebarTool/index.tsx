'use client';

import { cn } from '@/utils/cn';
import type { LucideIcon } from 'lucide-react';

type SidebarToolProps = {
  icon: LucideIcon;
  name: string;
  hint?: string;
  /** Texto vivo à direita quando o rail está aberto (ex.: o relógio do pomodoro). */
  badge?: string;
  isActive: boolean;
  /** Ponto pulsante quando a ferramenta está rodando com o rail fechado. */
  isBusy?: boolean;
  isExpanded: boolean;
  onClick: () => void;
};

export function SidebarTool({
  icon: Icon,
  name,
  hint,
  badge,
  isActive,
  isBusy,
  isExpanded,
  onClick,
}: SidebarToolProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      title={isExpanded ? undefined : name}
      className={cn(
        'focus-ring relative flex h-11 w-full items-center gap-3 rounded-2xl px-3 text-left transition-colors duration-200',
        isActive
          ? 'bg-white text-purple-800 shadow-soft'
          : 'text-white/70 hover:bg-white/15 hover:text-white'
      )}
    >
      <span className="relative shrink-0">
        <Icon size={19} strokeWidth={2.1} />

        {isBusy && !isActive && (
          <span className="absolute -right-0.5 -top-0.5 size-2 animate-pulse rounded-full bg-mint-500 ring-2 ring-purple-900" />
        )}
      </span>

      <span
        className={cn(
          'flex min-w-0 flex-1 items-center gap-2 transition-[opacity,transform] duration-200',
          isExpanded ? 'translate-x-0 opacity-100' : 'pointer-events-none -translate-x-1 opacity-0'
        )}
        aria-hidden={!isExpanded}
      >
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold leading-tight">{name}</span>

          {hint && (
            <span
              className={cn(
                'block truncate text-[11px] leading-tight',
                isActive ? 'text-purple-500' : 'text-white/45'
              )}
            >
              {hint}
            </span>
          )}
        </span>

        {badge && (
          <span
            className={cn(
              'shrink-0 rounded-lg px-2 py-1 text-[11px] font-bold tabular-nums',
              isActive ? 'bg-purple-50 text-purple-700' : 'bg-white/10 text-white/80'
            )}
          >
            {badge}
          </span>
        )}
      </span>
    </button>
  );
}
