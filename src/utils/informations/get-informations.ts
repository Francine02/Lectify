import { InformationsStorageData } from '@/types/InformationsStorageData';
import Cookies from 'js-cookie';

export const getInformationsSaveInStorage = () => {
  return {
    firstname: Cookies.get('firstname') || '',
    lastname: Cookies.get('lastname') || '',
  };
};

export const getInformationItem = (key: keyof InformationsStorageData) => {
  const mapKeys: Record<keyof InformationsStorageData, string> = {
    created_at: 'created',
    email: 'email',
    firstname: 'firstname',
    image_profile: 'image',
    is_free: 'isFree',
    lastname: 'lastname',
    username: 'username',
  };

  const storageKey = mapKeys[key];
  const value = Cookies.get(storageKey);

  if (key === 'is_free') return value === 'true';
  return value ?? '';
};
