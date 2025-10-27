import { InformationsStorageData } from '@/types/InformationsStorageData';
import Cookies from 'js-cookie';

const mapKeys: Record<keyof InformationsStorageData, string> = {
  created_at: 'created',
  email: 'email',
  firstname: 'firstname',
  image_profile: 'image',
  is_free: 'isFree',
  lastname: 'lastname',
  username: 'username',
};

export const saveInformationsInStorage = (data: InformationsStorageData) => {
  Object.entries(data).forEach(([key, value]) => {
    const mappedKey = mapKeys[key as keyof InformationsStorageData];

    if (mappedKey && value != null)
      Cookies.set(mappedKey, String(value) ?? '', { path: '/', expires: 7 });
  });
};
