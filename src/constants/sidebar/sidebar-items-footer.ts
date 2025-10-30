import { clearStorage } from '@/utils/storage/clear-storage';
import { IoMdSettings } from 'react-icons/io';
import { IoLogOut } from 'react-icons/io5';

export const sidebarItemsFooter = [
  {
    link: '/minha-conta',
    icon: IoMdSettings,
    name: 'Minha conta',
  },
  {
    link: '/',
    action: clearStorage,
    icon: IoLogOut,
    name: 'Sair',
  },
];
