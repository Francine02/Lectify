'use client';

import { usePomodoro } from '@/contexts/Pomodoro';
import { cn } from '@/utils/cn';
import { ListChecks, NotebookPen, Play, Sparkles } from 'lucide-react';
import Link from 'next/link';

const CARD_STYLES = {
  purple: 'bg-purple-50 text-purple-700 group-hover:bg-purple-100',
  sky: 'bg-sky-50 text-sky-700 group-hover:bg-sky-100',
  sun: 'bg-sun-50 text-sun-700 group-hover:bg-sun-100',
  mint: 'bg-mint-50 text-mint-700 group-hover:bg-mint-100',
};

const ACTIONS = [
  {
    href: '/gerar-resumo',
    icon: Sparkles,
    title: 'Resumir um vídeo',
    description: 'Cole o link e receba o material',
    accent: 'purple' as const,
  },
  {
    href: '/gerar-quiz',
    icon: ListChecks,
    title: 'Gerar questões',
    description: 'De um resumo salvo ou de um arquivo',
    accent: 'sky' as const,
  },
  {
    href: '/caderno',
    icon: NotebookPen,
    title: 'Abrir o caderno',
    description: 'Tópicos, anotações e links',
    accent: 'sun' as const,
  },
];

export function QuickActions() {
  const { isRunning, toggle, formatted } = usePomodoro();

  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {ACTIONS.map(({ href, icon: Icon, title, description, accent }) => (
        <Link
          key={href}
          href={href}
          className="card card-hover group flex items-center gap-3 p-4"
        >
          <span
            className={cn(
              'flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors',
              CARD_STYLES[accent]
            )}
          >
            <Icon size={19} />
          </span>

          <span className="min-w-0">
            <span className="block text-sm font-bold">{title}</span>
            <span className="block truncate text-xs text-subtle">{description}</span>
          </span>
        </Link>
      ))}

      <button
        type="button"
        onClick={toggle}
        className="card card-hover group flex items-center gap-3 p-4 text-left"
      >
        <span
          className={cn(
            'flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors',
            CARD_STYLES.mint
          )}
        >
          <Play size={19} />
        </span>

        <span className="min-w-0">
          <span className="block text-sm font-bold">
            {isRunning ? 'Pausar o foco' : 'Iniciar pomodoro'}
          </span>
          <span className="block truncate text-xs text-subtle">
            {isRunning ? `Rodando · ${formatted}` : '25 minutos de estudo'}
          </span>
        </span>
      </button>
    </section>
  );
}
