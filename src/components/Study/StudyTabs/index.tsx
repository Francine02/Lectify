'use client';

import { cn } from '@/utils/cn';

export type StudyTab = {
  id: string;
  label: string;
  badge?: string;
};

type StudyTabsProps = {
  tabs: StudyTab[];
  active: string;
  onChange: (id: string) => void;
};

export function StudyTabs({ tabs, active, onChange }: StudyTabsProps) {
  return (
    <div className="flex gap-1 rounded-xl border border-line bg-surface p-1" role="tablist">
      {tabs.map((tab) => {
        const isActive = tab.id === active;

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              'focus-ring flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-bold transition-colors',
              isActive ? 'bg-purple-50 text-purple-700' : 'text-subtle hover:text-ink'
            )}
          >
            {tab.label}

            {tab.badge && (
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 text-[11px] font-bold transition-colors',
                  isActive ? 'bg-purple-600 text-white' : 'bg-canvas text-subtle'
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
