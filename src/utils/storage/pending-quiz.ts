import { QuizQuestion } from '@/types/QuizQuestion';

/**
 * Ponte em memória entre "Gerar resumo" e "Gerar questões": permite aproveitar o
 * resumo recém-criado sem pedir upload de novo. É intencionalmente volátil —
 * após um reload o usuário cai no fluxo normal de upload.
 */
type PendingQuiz = {
  questions?: QuizQuestion[];
  file?: File;
  source?: string;
};

let pending: PendingQuiz | null = null;

export const setPendingQuiz = (value: PendingQuiz) => {
  pending = { ...pending, ...value };
};

export const takePendingQuiz = () => {
  const current = pending;
  pending = null;
  return current;
};

export const clearPendingQuiz = () => {
  pending = null;
};
