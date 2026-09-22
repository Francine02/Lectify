'use client';

import { usePathname } from 'next/navigation';
import { PomodoroWidget } from './PomodoroWidget';
import { QuickNote } from './QuickNote';
import { SummaryJobCard } from './SummaryJobCard';

/** Ferramentas que acompanham o usuário em qualquer tela, no canto da janela. */
export function Dock() {
  const path = usePathname();

  if (path.startsWith('/confirmar-exclusao')) return null;

  return (
    <div className="pointer-events-none fixed bottom-0 right-0 z-40 flex flex-col items-end gap-3 p-4 pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-5">
      <SummaryJobCard />

      <div className="flex items-end gap-2">
        <QuickNote />
        <PomodoroWidget />
      </div>
    </div>
  );
}
