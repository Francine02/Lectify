'use client';

import { cn } from '@/utils/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarItemProps } from './SidebarItemProps';

export function SidebarItem({ link, icon: Icon, name, hint, action, isExpanded }: SidebarItemProps) {
  const path = usePathname();
  const isActive = link === '/' ? path === '/' : path.startsWith(link);

  return (
    <Link
      href={link}
      onClick={action}
      aria-current={isActive ? 'page' : undefined}
      title={isExpanded ? undefined : name}
      className={cn(
        'focus-ring relative flex h-11 items-center gap-3 rounded-2xl px-3 transition-colors duration-200',
        isActive
          ? 'bg-white text-purple-800 shadow-soft'
          : 'text-white/70 hover:bg-white/15 hover:text-white'
      )}
    >
      <Icon size={19} strokeWidth={2.1} className="shrink-0" />

      <span
        className={cn(
          'min-w-0 flex-1 transition-[opacity,transform] duration-200',
          isExpanded ? 'translate-x-0 opacity-100' : 'pointer-events-none -translate-x-1 opacity-0'
        )}
        aria-hidden={!isExpanded}
      >
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
    </Link>
  );
}
