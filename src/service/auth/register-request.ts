import { PersonalInformationData } from '@/app/(public)/cadastro/informacoes-pessoais/personal-information-schema';
import { authRequest } from '../auth-request';
import { ApiResponse } from '@/types/ApiResponse';

export const registerRequest = async (data: PersonalInformationData): Promise<ApiResponse> => {
  return authRequest('post', '/register', data);
};
