import Cookies from 'js-cookie';

export const clearStorage = () => {
  Object.keys(Cookies.get()).forEach(function (cookieName) {
    Cookies.remove(cookieName);
  });
};
