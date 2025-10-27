import { getInformationItem } from './get-informations';

export const getFullName = () => {
  const firstname = getInformationItem('firstname') || '';
  const lastname = getInformationItem('lastname') || '';
  return `${firstname} ${lastname}`.trim();
};
