import { LogOut, Settings } from 'lucide-react';
import { clearStorage } from '@/utils/storage/clear-storage';
import type { LucideIcon } from 'lucide-react';

export const SIDEBAR_ITEMS_FOOTER: {
  link: string;
  icon: LucideIcon;
  name: string;
  action?: () => void;
}[] = [
  {
    link: '/minha-conta',
    icon: Settings,
    name: 'Minha conta',
  },
  {
    link: '/login',
    action: clearStorage,
    icon: LogOut,
    name: 'Sair',
  },
];
