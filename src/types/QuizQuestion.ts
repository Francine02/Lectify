/** Formato cru de uma questão. `Dificuldade` vem com D maiúsculo, ao contrário das demais. */
export interface QuizQuestionResponse {
  pergunta: string;
  alternativas: string[];
  dica: string;
  /** Texto de uma das alternativas — não o índice nem a letra. */
  resposta_correta: string;
  justificativa: string;
  Dificuldade: string;
}

/** `POST /questions` devolve o mapa puro: { questao1: {...}, ..., questao5: {...} }. */
export type QuizResponse = Record<string, QuizQuestionResponse>;

/** Item de `GET /questions` — a lista vem sem as questões, mais recentes primeiro. */
export interface QuizListItem {
  id: string;
  title: string;
  /** Nulo quando o quiz veio de um upload avulso, sem resumo associado. */
  file_id: string | null;
  created_at: string;
  expires_at: string;
}

/** `GET /questions/{id}` devolve o mesmo item com as questões envelopadas. */
export interface QuizDetail extends QuizListItem {
  questions: QuizResponse;
}

/** Aceita as duas formas: o mapa puro do POST ou o envelope do GET by id. */
export type QuizPayload = QuizResponse | QuizDetail;

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  hint: string;
  correctAnswer: string;
  explanation: string;
  difficulty: string;
}

export interface QuizAnswer {
  questionId: string;
  selected: string;
  isCorrect: boolean;
}
