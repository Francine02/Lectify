import { SummaryData } from '@/app/(private)/gerar-resumo/summary-schema';
import { ApiResponse } from '@/types/ApiResponse';
import { baseRequest } from '../base-request';

export const checkSummary = (data: SummaryData): Promise<ApiResponse> => {
    const payload = { ...data, language_select: 'pt-BR' };
    return baseRequest('post', '/check_summarize', payload);
};
