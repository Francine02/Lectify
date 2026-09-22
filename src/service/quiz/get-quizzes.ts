import { ApiResponse } from '@/types/ApiResponse';
import { QuizListItem } from '@/types/QuizQuestion';
import { baseRequest } from '../base-request';

/**
 * Quizzes persistidos do usuário, mais recentes primeiro e sem as questões.
 * Rota de leitura (30/min, contador próprio): não consome cota de geração e
 * seus 429 não escalam para bloqueio.
 */
export const getQuizzes = (): Promise<ApiResponse<QuizListItem[]>> => {
  return baseRequest<QuizListItem[]>('get', '/questions');
};
