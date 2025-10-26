import { LoginData } from '@/app/(public)/login/login-schema';
import { authRequest } from '../auth-request';
import { ApiResponse } from '@/types/ApiResponse';

export const loginRequest = async (data: LoginData): Promise<ApiResponse> => {
  return authRequest('post', '/login', data);
};
