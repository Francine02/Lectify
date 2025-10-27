import { ApiResponse } from '@/types/ApiResponse';
import { baseRequest } from '../base-request';

export const putImageProfile = (file: File | string): Promise<ApiResponse> => {
  const formData = new FormData();
  if (file) {
    formData.append('file', file);

    return baseRequest('put', '/update_image_profile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  formData.append('file', '');

  return baseRequest('put', '/update_image_profile', formData, {
    headers: { 'Content-Type': 'application/json' },
  });
};
