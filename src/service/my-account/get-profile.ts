import { ApiResponse } from '@/types/ApiResponse';
import { ProfileData } from '@/types/ProfileData';
import { baseRequest } from '../base-request';

export const getProfile = (): Promise<ApiResponse<ProfileData>> => {
  return baseRequest<ProfileData>('get', '/profile');
};
