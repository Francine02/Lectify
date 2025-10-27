import { Metadata } from 'next';
import { ChangePasswordForm } from './form';

export const metadata: Metadata = {
  title: 'Alterar a senha | Lectify',
  description: 'Insira sua nova senha para fazer login',
  robots: { index: false, follow: false },
};

export default function ChangePasswordPage() {
  return <ChangePasswordForm />;
}
