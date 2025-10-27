import { pingDeleteAccount } from '@/service/my-account/ping-delete-account';
import { toast } from 'react-toastify';

export const handleDeleteAccount = async () => {
  try {
    const result = await pingDeleteAccount();
    if (result.success) toast.success('Email de exclusão enviado!');
    else toast.error(result.error?.message || 'Erro ao enviar email.');
  } catch {
    toast.error('Erro ao enviar email de exclusão');
  }
};
