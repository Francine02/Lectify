import { STORAGE_KEYS } from '@/constants/storage/storage-keys';
import { InformationsStorageData } from '@/types/InformationsStorageData';
import Cookies from 'js-cookie';

export const saveInformationsInStorage = (data: InformationsStorageData) => {
  Object.entries(data).forEach(([key, value]) => {
    const mappedKey = STORAGE_KEYS[key as keyof InformationsStorageData];

    if (!mappedKey) return;

    if (value == null) {
      Cookies.remove(mappedKey, { path: '/' });
      return;
    }

    Cookies.set(mappedKey, String(value), { path: '/', expires: 7 });
  });
};
