'use client';
import Link from 'next/link';
import { SidebarItemProps } from './SidebarItemProps';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';

export function SidebarItem({ link, icon: Icon, name }: SidebarItemProps) {
  const path = usePathname();

  const isActive = path === link;

  return (
    <div className="hs-tooltip [--placement:right] block w-full ml-10">
      <Link
        className={cn(
          'hs-tooltip-toggle flex h-9.5 items-center p-2  text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-gray-100 hover:text-purple-700 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none',
          isActive && 'bg-gray-100 text-purple-700'
        )}
        href={link}
      >
        <Icon className="shrink-0 size-5 text-center" />

        <span
          className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg whitespace-nowrap"
          role="tooltip"
        >
          {name}
        </span>
      </Link>
    </div>
  );
}
