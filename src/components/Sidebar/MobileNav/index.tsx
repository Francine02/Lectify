'use client';

import { cn } from '@/utils/cn';
import { BookMarked, Home, NotebookPen, Sparkles, UserRound } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ITEMS = [
  { link: '/', icon: Home, name: 'Início' },
  { link: '/gerar-resumo', icon: Sparkles, name: 'Resumo' },
  { link: '/meus-resumos', icon: BookMarked, name: 'Biblioteca' },
  { link: '/caderno', icon: NotebookPen, name: 'Caderno' },
  { link: '/minha-conta', icon: UserRound, name: 'Conta' },
];

/** Navegação principal no mobile: dock flutuante no rodapé, no lugar do drawer. */
export function MobileNav() {
  const path = usePathname();

  if (path.startsWith('/confirmar-exclusao')) return null;

  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden"
    >
      <ul className="mx-auto flex max-w-md items-center justify-between gap-1 rounded-[22px] border border-line bg-surface/95 p-1.5 shadow-lift backdrop-blur">
        {ITEMS.map(({ link, icon: Icon, name }) => {
          const isActive = link === '/' ? path === '/' : path.startsWith(link);

          return (
            <li key={link} className="flex-1">
              <Link
                href={link}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex flex-col items-center gap-0.5 rounded-2xl px-1 py-2 transition-colors',
                  isActive ? 'bg-purple-50 text-purple-700' : 'text-subtle'
                )}
              >
                <Icon size={19} strokeWidth={2.1} />
                <span className="text-[10px] font-semibold leading-none">{name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
