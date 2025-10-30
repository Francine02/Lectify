import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

type AuthStorageType = {
  access_token: string;
  refresh_token: string;
};

const daysUntilExpiry = (exp: number) => {
  return Math.max((exp * 1000 - Date.now()) / (1000 * 60 * 60 * 24), 0.01);
};

export const tokenStorage = (token: string) => {
  Cookies.set('token', token, { expires: 7, path: '/', sameSite: 'lax' });
};

export const authStorage = (data: AuthStorageType) => {
  const { exp: expRefresh } = jwtDecode<{ exp: number }>(data.refresh_token);
  const expiryDays = daysUntilExpiry(expRefresh);

  Cookies.set('refresh', data.refresh_token, {
    expires: expiryDays,
    path: '/',
    sameSite: 'strict',
  });

  tokenStorage(data.access_token);
};
