import { InformationsAccountType } from '@/types/InformationsAccountType';
import { formatDatePt } from '@/utils/formatters/formatDatePt';

export const FIELDS_ACCOUNT = (info: InformationsAccountType) => [
  { label: 'Nome de usuário', value: info.username },
  { label: 'Data da conta', value: 'Desde ' + formatDatePt(info.created) },
  { label: 'Email', value: info.email },
];
