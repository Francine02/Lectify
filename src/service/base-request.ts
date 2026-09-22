import { DEFAULT_API_ERROR, translateApiError } from '@/constants/errors/api-errors';
import { ApiResponse } from '@/types/ApiResponse';
import { registerBlockFromError } from '@/utils/form/rate-guard';
import api, { BASE_URL } from './config/axios-config';

export async function baseRequest<T>(
  method: 'post' | 'put' | 'patch' | 'get' | 'delete',
  endpoint: string,
  data?: any,
  config: object = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await api({
      method,
      url: `${BASE_URL}${endpoint}`,
      data,
      ...config,
    });

    return {
      success: true,
      status: response.status,
      data: response.data,
    };
  } catch (error: any) {
    let errorMessage = '';

    // com responseType: 'blob' o corpo do erro também chega como Blob
    if (error.response?.data instanceof Blob) {
      try {
        const text = await error.response.data.text();
        errorMessage = JSON.parse(text).error;
      } catch {
        errorMessage = '';
      }
    } else {
      errorMessage = error.response?.data?.error;
    }

    // 403 de bloqueio antiabuso: guardamos até quando as ações ficam travadas
    registerBlockFromError(errorMessage);

    return {
      success: false,
      status: error.response?.status,
      error: {
        code: error.code,
        message: errorMessage ? translateApiError(errorMessage) : DEFAULT_API_ERROR,
      },
    };
  }
}
