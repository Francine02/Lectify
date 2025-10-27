import { Metadata } from 'next';
import { ConfirmDeleteAccountForm } from './form';

export const metadata: Metadata = {
  title: 'Confirmar exclusão da conta | Lectify',
  description: 'Confirme a exclusão da sua conta',
  robots: { index: false, follow: false },
};

export default async function ConfirmDeleteAccount() {
  return <ConfirmDeleteAccountForm />;
}
