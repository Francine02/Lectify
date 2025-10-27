import { ApiResponse } from '@/types/ApiResponse';
import { baseRequest } from '../base-request';

export const pingDeleteAccount = (): Promise<ApiResponse> => {
  const payload = {
    base_url: process.env.NEXT_PUBLIC_URL,
    reset_password_page_url: 'confirmar-exclusao',
  };
  return baseRequest('post', '/ping_email_delete_account', payload);
};
