import { ApiResponse } from '@/types/ApiResponse';
import { QuizDetail } from '@/types/QuizQuestion';
import { baseRequest } from '../base-request';

/**
 * Abre um quiz já gerado. É o caminho certo para reabrir conteúdo: tem contador
 * próprio e folgado, enquanto repetir o `POST /questions` disputaria o orçamento
 * de geração do minuto. A resposta vem envelopada — as questões ficam em
 * `questions`, ao contrário do POST, que devolve o mapa puro.
 */
export const getQuiz = (id: string): Promise<ApiResponse<QuizDetail>> => {
  return baseRequest<QuizDetail>('get', `/questions/${id}`);
};
