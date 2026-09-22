import { STORAGE_KEYS } from '@/constants/storage/storage-keys';
import { InformationsStorageData } from '@/types/InformationsStorageData';
import Cookies from 'js-cookie';

export const getInformationsSaveInStorage = () => {
  return {
    firstname: Cookies.get('firstname') || '',
    lastname: Cookies.get('lastname') || '',
  };
};

export const getInformationItem = (key: keyof InformationsStorageData) => {
  const value = Cookies.get(STORAGE_KEYS[key]);

  if (key === 'is_free') return value === 'true';
  return value ?? '';
};
