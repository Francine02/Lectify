import { authRequest, ApiResponse } from '../auth-request';

export const checkCodeRequest = (code: string): Promise<ApiResponse> => {
  return authRequest('post', '/verify_email_register', { code });
};
