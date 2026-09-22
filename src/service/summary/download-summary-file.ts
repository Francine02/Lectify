import { ApiResponse } from '@/types/ApiResponse';
import { baseRequest } from '../base-request';

export const downloadSummaryFile = (fileId: string): Promise<ApiResponse<Blob>> => {
  return baseRequest<Blob>('get', `/summarize/files/${fileId}`, undefined, {
    responseType: 'blob',
  });
};
