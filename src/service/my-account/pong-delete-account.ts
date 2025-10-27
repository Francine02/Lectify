import { ApiResponse } from '@/types/ApiResponse';
import { baseRequest } from '../base-request';

export const pongDeleteAccount = (token: string): Promise<ApiResponse> => {
  return baseRequest('delete', '/pong_email_delete_account', token);
};
