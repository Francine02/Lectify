'use client';
import { Loading } from '@/components/Loading';
import { deleteAccount } from '@/constants/form/delete-account';
import { pongDeleteAccount } from '@/service/my-account/pong-delete-account';
import { clearStorage } from '@/utils/storage/clear-storage';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export function ConfirmDeleteAccountForm() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const params = useParams();

  const token = params.token as string;

  useEffect(() => {
    const deleteAccount = async () => {
      const response = await pongDeleteAccount(token);

      if (!response.success) {
        toast.error('Falha ao excluir a conta.');
        setStatus('error');
        return;
      }

      setStatus('success');
      toast.success('Conta excluída!');
      clearStorage();
    };

    deleteAccount();
  }, []);

  const current = deleteAccount.find((item) => item.key === status);

  return (
    <section className="m-auto">
      {status === 'loading' ? (
        <Loading className="size-12 mb-10" />
      ) : (
        current?.icon && <current.icon className={`mb-6 text-5xl mx-auto ${current?.colorIcon}`} />
      )}
      <h1 className="text-title font-black text-center">{current?.title}</h1>

      <p className="text-sm text-center text-gray-500 mb-10">{current?.message}</p>
    </section>
  );
}
