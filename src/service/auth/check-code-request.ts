import { ApiResponse } from '@/types/ApiResponse';
import { authRequest } from '../auth-request';

type CodeRequest = {
  code: string;
  email: string;
};

export const checkCodeRequest = (data: CodeRequest): Promise<ApiResponse> => {
  return authRequest('post', '/verify_email_register', data);
};
