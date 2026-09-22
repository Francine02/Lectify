import { SummaryData } from '@/app/(private)/gerar-resumo/summary-schema';
import { ApiResponse } from '@/types/ApiResponse';
import { normalizeYoutubeUrl } from '@/utils/formatters/normalize-youtube-url';
import { registerResponse } from '@/utils/form/rate-guard';
import { baseRequest } from '../base-request';

/**
 * 201 entra na fila e debita cota · 200 devolve o arquivo binário que já estava
 * no acervo, sem debitar · 409 é o mesmo pedido já em processamento, e não é
 * erro: o fluxo segue para o polling · 400 é URL, formato ou idioma inválido.
 *
 * `responseType: 'blob'` existe por causa do 200 — o corpo é o arquivo, não JSON.
 */
export const generateSummary = async (data: SummaryData): Promise<ApiResponse> => {
  const payload = { ...data, youtube_url: normalizeYoutubeUrl(data.youtube_url) };

  const response = await baseRequest('post', '/summarize', payload, { responseType: 'blob' });

  registerResponse('summarize', response.status);

  return response;
};
