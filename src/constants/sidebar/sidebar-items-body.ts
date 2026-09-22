import { BookMarked, Home, ListChecks, NotebookPen, Sparkles, Crown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type SidebarItem = {
  link: string;
  icon: LucideIcon;
  name: string;
  /** Texto curto no painel expandido — ajuda quem está chegando agora. */
  hint?: string;
  accent?: 'purple' | 'mint' | 'sun' | 'sky';
};

export type SidebarGroup = {
  label: string;
  items: SidebarItem[];
};

export const SIDEBAR_GROUPS: SidebarGroup[] = [
  {
    label: 'Início',
    items: [{ link: '/', icon: Home, name: 'Início', hint: 'Seu painel', accent: 'purple' }],
  },
  {
    label: 'Criar',
    items: [
      {
        link: '/gerar-resumo',
        icon: Sparkles,
        name: 'Gerar resumo',
        hint: 'De um vídeo do YouTube',
        accent: 'purple',
      },
      {
        link: '/gerar-quiz',
        icon: ListChecks,
        name: 'Gerar questões',
        hint: 'A partir de um material',
        accent: 'sky',
      },
    ],
  },
  {
    label: 'Meu material',
    items: [
      {
        link: '/meus-resumos',
        icon: BookMarked,
        name: 'Meus resumos',
        hint: 'Biblioteca salva',
        accent: 'mint',
      },
      {
        link: '/meus-quizzes',
        icon: ListChecks,
        name: 'Meus quizzes',
        hint: 'Responder de novo',
        accent: 'sky',
      },
      {
        link: '/caderno',
        icon: NotebookPen,
        name: 'Caderno',
        hint: 'Anotações e links',
        accent: 'sun',
      },
    ],
  },
  {
    label: 'Conta',
    items: [
      { link: '/planos', icon: Crown, name: 'Planos', hint: 'Assinatura', accent: 'sun' },
    ],
  },
];

/** Lista plana — usada pela navegação mobile e pelo título da topbar. */
export const SIDEBAR_ITEMS_BODY = SIDEBAR_GROUPS.flatMap((group) => group.items);
