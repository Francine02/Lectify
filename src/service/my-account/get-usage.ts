import { ApiResponse } from '@/types/ApiResponse';
import { UsageData } from '@/types/UsageData';
import { syncFeatureLimits } from '@/utils/form/rate-guard';
import { baseRequest } from '../base-request';

/**
 * Fonte da verdade dos limites: devolve limite, usado, restante e reset por
 * funcionalidade (`summarize` e `questions`) e por período (`minute`, `week`,
 * `month`). Aproveitamos toda leitura para realimentar o guarda de ritmo — é o
 * que evita ter os números por minuto fixos no código.
 */
export const getUsage = async (): Promise<ApiResponse<UsageData>> => {
  const response = await baseRequest<UsageData>('get', '/usage');

  if (response.success) syncFeatureLimits(response.data);

  return response;
};
