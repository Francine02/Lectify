'use client';

import { Logo } from '@/components/Logo';
import { SIDEBAR_GROUPS } from '@/constants/sidebar/sidebar-items-body';
import { SIDEBAR_ITEMS_FOOTER } from '@/constants/sidebar/sidebar-items-footer';
import { usePomodoro } from '@/contexts/Pomodoro';
import { useTools } from '@/contexts/Tools';
import { cn } from '@/utils/cn';
import { NotebookPen, Timer } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { SidebarAccount } from './SidebarAccount';
import { SidebarItem } from './SidebarItem';
import { SidebarTool } from './SidebarTool';

/** Distância do canto esquerdo que já abre o painel. */
const OPEN_AT = 130;
/** Só fecha quando o ponteiro passa da largura do painel aberto — evita piscar. */
const CLOSE_AFTER = 280;

export function Sidebar() {
  const path = usePathname();
  const { openTool, toggle } = useTools();
  const { isRunning, formatted, label } = usePomodoro();
  const [isExpanded, setIsExpanded] = useState(false);
  const expandedRef = useRef(false);

  useEffect(() => {
    expandedRef.current = isExpanded;
  }, [isExpanded]);

  useEffect(() => {
    if (window.matchMedia('(hover: none), (max-width: 1023px)').matches) return;

    const handleMove = (event: MouseEvent) => {
      const limit = expandedRef.current ? CLOSE_AFTER : OPEN_AT;
      const isNear = event.clientX <= limit;

      if (isNear !== expandedRef.current) setIsExpanded(isNear);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  if (path.startsWith('/confirmar-exclusao')) return null;

  return (
    <aside
      aria-label="Navegação principal"
      onFocusCapture={() => setIsExpanded(true)}
      onBlurCapture={() => setIsExpanded(false)}
      className="fixed inset-y-0 left-0 z-50 hidden w-[96px] lg:block"
    >
      <nav
        className={cn(
          'absolute inset-y-3 left-3 flex flex-col overflow-hidden rounded-[28px] bg-purple-900 shadow-float',
          'transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
          isExpanded ? 'w-[252px]' : 'w-[72px]'
        )}
      >
        <header className="flex h-16 shrink-0 items-center gap-3 px-4">
          <Logo className="w-8 shrink-0 sm:w-8" />

          <span
            className={cn(
              'font-display text-lg font-extrabold tracking-tight text-white transition-opacity duration-200',
              isExpanded ? 'opacity-100' : 'pointer-events-none opacity-0'
            )}
            aria-hidden={!isExpanded}
          >
            Lectify
          </span>
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto overflow-x-hidden px-3 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SIDEBAR_GROUPS.map((group) => (
            <div key={group.label} className="space-y-1">
              <p
                className={cn(
                  'px-3 text-[10px] font-bold uppercase tracking-[0.12em] text-white/35 transition-opacity duration-200',
                  isExpanded ? 'opacity-100' : 'pointer-events-none opacity-0'
                )}
                aria-hidden={!isExpanded}
              >
                {group.label}
              </p>

              {group.items.map((item) => (
                <SidebarItem
                  key={item.name}
                  icon={item.icon}
                  name={item.name}
                  hint={item.hint}
                  link={item.link}
                  isExpanded={isExpanded}
                />
              ))}
            </div>
          ))}
          <div className="space-y-1">
            <p
              className={cn(
                'px-3 text-[10px] font-bold uppercase tracking-[0.12em] text-white/35 transition-opacity duration-200',
                isExpanded ? 'opacity-100' : 'pointer-events-none opacity-0'
              )}
              aria-hidden={!isExpanded}
            >
              Ferramentas
            </p>

            <SidebarTool
              icon={Timer}
              name="Pomodoro"
              hint={isRunning ? `${label} em andamento` : 'Ciclos de foco'}
              badge={isRunning ? formatted : undefined}
              isActive={openTool === 'pomodoro'}
              isBusy={isRunning}
              isExpanded={isExpanded}
              onClick={() => toggle('pomodoro')}
            />

            <SidebarTool
              icon={NotebookPen}
              name="Anotação rápida"
              hint="Sem sair da tela"
              isActive={openTool === 'note'}
              isExpanded={isExpanded}
              onClick={() => toggle('note')}
            />
          </div>
        </div>

        <footer className="shrink-0 space-y-1 border-t border-white/10 px-3 py-3">
          <SidebarAccount isExpanded={isExpanded} />

          {SIDEBAR_ITEMS_FOOTER.map((item) => (
            <SidebarItem
              key={item.name}
              action={item.action}
              icon={item.icon}
              name={item.name}
              link={item.link}
              isExpanded={isExpanded}
            />
          ))}
        </footer>
      </nav>
    </aside>
  );
}
