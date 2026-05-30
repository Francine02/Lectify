import { EmailData } from '@/schemas/email-schema';
import { ApiResponse } from '@/types/ApiResponse';
import { authRequest } from '../auth-request';

export const checkEmailRequest = (data: EmailData): Promise<ApiResponse> => {
  return authRequest('post', '/check_email_register', data);
};
