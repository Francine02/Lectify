import { ApiResponse } from '@/types/ApiResponse';
import { SummaryFile } from '@/types/SummaryFile';
import { baseRequest } from '../base-request';

export const getSummaryFiles = (): Promise<ApiResponse<SummaryFile[]>> => {
  return baseRequest<SummaryFile[]>('get', '/summarize/files');
};
