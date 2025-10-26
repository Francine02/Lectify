import { ApiResponse } from '@/types/ApiResponse';
import { authRequest } from '../auth-request';

type ChangePasswordRequest = {
  email: string;
  token: string;
  new_password: string;
};

export const changePasswordRequest = (data: ChangePasswordRequest): Promise<ApiResponse> => {
  return authRequest('post', '/pong_email_reset_password', data);
};
