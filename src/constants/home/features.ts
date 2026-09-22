import {
  BookMarked,
  Highlighter,
  ListChecks,
  NotebookPen,
  Sparkles,
  Timer,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type HomeFeature = {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: 'purple' | 'sky' | 'mint' | 'sun';
  link?: string;
  /** Passo do guia que demonstra esse recurso. */
  tourId: string;
};

export const HOME_FEATURES: HomeFeature[] = [
  {
    icon: Sparkles,
    title: 'Resumos de vídeos',
    description: 'Aulas longas do YouTube viram um material curto, em PDF ou Markdown.',
    accent: 'purple',
    link: '/gerar-resumo',
    tourId: 'summary',
  },
  {
    icon: ListChecks,
    title: 'Questões automáticas',
    description: 'Cinco questões de múltipla escolha com dica e justificativa, prontas junto.',
    accent: 'sky',
    link: '/gerar-quiz',
    tourId: 'study',
  },
  {
    icon: BookMarked,
    title: 'Biblioteca de 7 dias',
    description: 'Tudo o que você gera fica salvo para reler ou baixar durante a semana.',
    accent: 'mint',
    link: '/meus-resumos',
    tourId: 'library',
  },
  {
    icon: NotebookPen,
    title: 'Caderno no navegador',
    description: 'Tópicos, anotações e links salvos no seu dispositivo, sem sair do app.',
    accent: 'sun',
    link: '/caderno',
    tourId: 'notebook',
  },
  {
    icon: Timer,
    title: 'Pomodoro integrado',
    description: 'Ciclos de foco e pausa que continuam rodando enquanto você estuda.',
    accent: 'purple',
    tourId: 'pomodoro',
  },
  {
    icon: Highlighter,
    title: 'Geração em segundo plano',
    description: 'Dispare o resumo e continue navegando: o progresso fica no canto da tela.',
    accent: 'sky',
    tourId: 'background',
  },
];
