import { ApiResponse } from '@/types/ApiResponse';
import { baseRequest } from '../base-request';

type PatchPersonalInformationsRequest = {
  password?: string;
  firstname?: string;
  lastname?: string;
};

export const patchPersonalInformations = (
  data: PatchPersonalInformationsRequest
): Promise<ApiResponse> => {
  return baseRequest('patch', '/update_profile', data);
};
