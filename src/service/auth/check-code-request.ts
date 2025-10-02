import { authRequest, ApiResponse } from '../auth-request';

type CodeRequest = {
  code: string;
  email: string;
};

export const checkCodeRequest = (data: CodeRequest): Promise<ApiResponse> => {
  return authRequest('post', '/verify_email_register', data);
};
