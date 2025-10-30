import { ElementType } from 'react';

export interface SidebarItemProps {
  link: string;
  action?: () => void;
  icon: ElementType;
  name: string;
}
