import Cookies from 'js-cookie';

export const getTokenInStorage = () => {
  return Cookies.get('token');
};

export const getRefreshInStorage = () => {
  return Cookies.get('refresh');
};
