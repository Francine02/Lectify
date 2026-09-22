import { clearCache } from '@/utils/cache/client-cache';
import Cookies from 'js-cookie';

export const clearStorage = () => {
  Object.keys(Cookies.get()).forEach(function (cookieName) {
    Cookies.remove(cookieName);
  });

  // o cache de leitura é por sessão: sair da conta não pode deixar resquício
  clearCache();
};
