import { Metadata } from 'next';
import { CheckEmailForm } from './form';

export const metadata: Metadata = {
  title: 'Esqueci a senha | Lectify',
  description: 'Digite seu e-mail para receber o link de recuperação de senha',
  robots: { index: false, follow: false },
};

export default async function ForgotPasswordPage() {
  return <CheckEmailForm />;
}
