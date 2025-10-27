import { getInformationItem } from './get-informations';

export const isAccountFree = () => {
  return getInformationItem('is_free') ? 'normal' : 'premium';
};
