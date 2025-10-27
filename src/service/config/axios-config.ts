import { tokenStorage } from '@/utils/storage/save-auth-storage';
import { clearStorage } from '@/utils/storage/clear-storage';
import { getRefreshInStorage, getTokenInStorage } from '@/utils/storage/get-auth-storage';
import axios from 'axios';

export const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/lectify`;

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (request) => {
    const token = getTokenInStorage();
    if (token) {
      request.headers['Authorization'] = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = getRefreshInStorage();

    if (error?.response?.status === 401 && !originalRequest?.__isRetryRequest) {
      originalRequest.__isRetryRequest = true;

      try {
        const result = await axios.post(
          `${BASE_URL}/refresh_token`,
          {},
          {
            headers: { Authorization: `Bearer ${refreshToken}` },
          }
        );

        const newToken = result.data.access_token;

        tokenStorage(newToken);

        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        clearStorage();

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
