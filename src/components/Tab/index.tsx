'use client';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface TabProps {
  list: { label: string; href: string }[];
}

export function Tab({ list }: TabProps) {
  const pathname = usePathname();

  return (
    <div className="border-b border-gray-200">
      <nav className="flex gap-x-1" aria-label="Tabs" role="tablist" aria-orientation="horizontal">
        {list.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                '-mb-px py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium text-center border border-gray-200 rounded-t-lg',
                'focus:outline-none transition-colors duration-200',
                !isActive && 'bg-gray-50 text-gray-500 hover:text-gray-700 hover:bg-gray-100',
                isActive && 'bg-white text-purple-700 border-b-transparent'
              )}
              role="tab"
              aria-selected={isActive}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
