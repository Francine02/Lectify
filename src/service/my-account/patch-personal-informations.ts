import { PersonalInformationData } from '@/app/(private)/minha-conta/personal-information-schema';
import { ApiResponse } from '@/types/ApiResponse';
import { baseRequest } from '../base-request';

export const patchPersonalInformations = (data: PersonalInformationData): Promise<ApiResponse> => {
  return baseRequest('patch', '/update_profile', data);
};
