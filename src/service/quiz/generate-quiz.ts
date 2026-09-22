import { CACHE_KEYS } from '@/constants/cache/cache-keys';
import { ApiResponse } from '@/types/ApiResponse';
import { QuizResponse } from '@/types/QuizQuestion';
import { invalidateCache } from '@/utils/cache/client-cache';
import { registerResponse } from '@/utils/form/rate-guard';
import { baseRequest } from '../base-request';

/**
 * POST /lectify/questions aceita duas entradas:
 * - `{ file_id }` de um resumo do acervo — caminho preferido, sem upload;
 * - multipart com o campo `file` (.pdf ou .md, até 5 MB), para arquivos de fora.
 *
 * O cache é por usuário e por conteúdo, e é o mesmo nas duas entradas: quem
 * gerou por upload recebe 200 ao pedir depois pelo `file_id` equivalente.
 * 201 gera na hora e debita cota; 200 vem do cache e não debita — por isso o
 * status volta junto e é ele quem alimenta o guarda de ritmo.
 */
const afterGenerate = (response: ApiResponse<QuizResponse>) => {
  registerResponse('questions', response.status);

  // um quiz novo entra na listagem e muda a cota restante
  if (response.status === 201) {
    invalidateCache(CACHE_KEYS.quizzes);
    invalidateCache(CACHE_KEYS.usage);
  }

  return response;
};

export const generateQuiz = (file: File): Promise<ApiResponse<QuizResponse>> => {
  const formData = new FormData();
  formData.append('file', file);

  return baseRequest<QuizResponse>('post', '/questions', formData).then(afterGenerate);
};

export const generateQuizFromFileId = (fileId: string): Promise<ApiResponse<QuizResponse>> => {
  return baseRequest<QuizResponse>('post', '/questions', { file_id: fileId }).then(afterGenerate);
};
