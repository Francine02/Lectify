import { EmailData } from 'schemas/email-schema';
import { authRequest, ApiResponse } from '../auth-request';

export const checkEmailRequest = (data: EmailData): Promise<ApiResponse> => {
  return authRequest('post', '/check_email_register', data);
};
