import { ApiResponse } from '@/types/ApiResponse';
import { authRequest } from '../auth-request';

export const checkEmailForgotPasswordRequest = (email: string): Promise<ApiResponse> => {
  const payload = {
    email,
    base_url: process.env.NEXT_PUBLIC_URL,
    reset_password_page_url: 'alterar-senha',
  };

  return authRequest('post', '/ping_email_reset_password', payload);
};
