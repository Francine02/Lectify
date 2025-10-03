import { PersonalInformationData } from '@/app/(public)/cadastro/informacoes-pessoais/personal-information-schema';
import { ApiResponse, authRequest } from '../auth-request';

export const registerRequest = async (data: PersonalInformationData): Promise<ApiResponse> => {
  return authRequest('post', '/register', data);
};
