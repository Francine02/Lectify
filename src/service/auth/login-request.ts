import { LoginData } from '@/app/(public)/login/login-schema';
import { ApiResponse, authRequest } from '../auth-request';

export const loginRequest = async (data: LoginData): Promise<ApiResponse> => {
  return authRequest('post', '/login', data);
};
