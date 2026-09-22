import type { LucideIcon } from 'lucide-react';

export interface SidebarItemProps {
  link: string;
  icon: LucideIcon;
  name: string;
  hint?: string;
  action?: () => void;
  /** O rótulo só aparece quando o rail está expandido. */
  isExpanded: boolean;
}
