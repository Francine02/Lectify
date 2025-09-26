import { RegisterData } from 'app/(public)/cadastro/register-schema';
import { authRequest, ApiResponse } from '../auth-request';

export const checkEmailRequest = (data: RegisterData): Promise<ApiResponse> => {
  return authRequest('post', '/check_email_register', data);
};
