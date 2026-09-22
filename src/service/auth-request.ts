import { DEFAULT_API_ERROR, translateApiError } from '@/constants/errors/api-errors';
import axios from 'axios';
import { BASE_URL } from './config/axios-config';
import { ApiResponse } from '../types/ApiResponse';

export async function authRequest<T>(
  method: 'post',
  endpoint: string,
  data?: any
): Promise<ApiResponse<T>> {
  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${endpoint}`,
      data,
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    const errorMessage = error.response?.data?.error;
    return {
      success: false,
      error: {
        code: error.code,
        message: errorMessage ? translateApiError(errorMessage) : DEFAULT_API_ERROR,
      },
    };
  }
}
