import { ApiResponse, authRequest } from '../auth-request';

type ChangePasswordRequest = {
  email: string;
  token: string;
  new_password: string;
};

export const changePasswordRequest = (data: ChangePasswordRequest): Promise<ApiResponse> => {
  return authRequest('post', '/pong_verify_email_reset_password', data);
};
