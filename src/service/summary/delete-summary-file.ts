import { ApiResponse } from '@/types/ApiResponse';
import { baseRequest } from '../base-request';

export interface DeleteSummaryResponse {
  message: string;
  /** Quantas questões geradas a partir do resumo foram apagadas junto. */
  removed_questions: number;
}

export const deleteSummaryFile = (fileId: string): Promise<ApiResponse<DeleteSummaryResponse>> => {
  return baseRequest<DeleteSummaryResponse>('delete', `/summarize/files/${fileId}`);
};
