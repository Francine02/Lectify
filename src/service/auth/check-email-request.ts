import { EmailData } from 'schemas/email-schema';
import { authRequest } from '../auth-request';
import { ApiResponse } from '@/types/ApiResponse';

export const checkEmailRequest = (data: EmailData): Promise<ApiResponse> => {
  return authRequest('post', '/check_email_register', data);
};
