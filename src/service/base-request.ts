import { ApiResponse } from '@/types/ApiResponse';
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
            data: response.data,
        };
    } catch (error: any) {
        let errorMessage = '';
        
        if (error.response?.data instanceof Blob) {
            const text = await error.response.data.text();
            const json = JSON.parse(text);

            errorMessage = json.error;
        } else {
            errorMessage = error.response?.data?.error;
        }

        return {
            success: false,
            error: {
                code: error.code,
                message: errorMessage ?? 'Ocorreu um erro! Por favor, tente novamente mais tarde',
            },
        };
    }
}
