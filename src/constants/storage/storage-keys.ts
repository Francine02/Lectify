import { InformationsStorageData } from '@/types/InformationsStorageData';

/** Nome de cada informação de perfil no cookie. Fonte única para leitura e escrita. */
export const STORAGE_KEYS: Record<keyof InformationsStorageData, string> = {
  created_at: 'created',
  email: 'email',
  firstname: 'firstname',
  image_profile: 'image',
  is_free: 'isFree',
  lastname: 'lastname',
  username: 'username',
  plan: 'plan',
  subscription_end: 'subscriptionEnd',
};

/** Disparado pelo ProfileSync quando os dados de perfil sao atualizados. */
export const PROFILE_UPDATED_EVENT = 'lectify:profile-updated';
