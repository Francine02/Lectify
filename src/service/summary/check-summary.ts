import { SummaryData } from '@/app/(private)/gerar-resumo/summary-schema';
import { ApiResponse } from '@/types/ApiResponse';
import { normalizeYoutubeUrl } from '@/utils/formatters/normalize-youtube-url';
import { baseRequest } from '../base-request';

/**
 * Mesmo corpo do /summarize; devolve `status` em 'processing', 'success' ou
 * 'error'. Rota de leitura folgada (50/min) — é nela que o polling insiste.
 */
export const checkSummary = (data: SummaryData): Promise<ApiResponse> => {
  const payload = { ...data, youtube_url: normalizeYoutubeUrl(data.youtube_url) };

  return baseRequest('post', '/check_summarize', payload);
};
