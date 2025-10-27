import { FaCheck } from 'react-icons/fa';
import { MdError } from 'react-icons/md';

export const deleteAccount = [
  {
    key: 'success',
    icon: FaCheck,
    colorIcon: 'text-green-400',
    title: 'Conta excluida!',
    message:
      'Obrigado por fazer parte da nossa jornada. Se desejar voltar no futuro, estaremos por aqui.💜',
  },
  {
    key: 'error',
    icon: MdError,
    colorIcon: 'text-red-400',
    title: 'Erro ao excluir a conta!',
    message:
      'Ocorreu um erro ao efetuar a exclusão da sua conta. Por favor, tente novamente mais tarde.',
  },
  {
    key: 'loading',
    title: 'Excluindo sua conta...',
    message: 'Por favor, aguarde enquanto excluímos sua conta.',
  },
];
