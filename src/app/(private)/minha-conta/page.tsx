import { Metadata } from 'next';
import { MyAccountForm } from './form';

export const metadata: Metadata = {
  title: 'Minha conta | Lectify',
  description: 'Acesse sua conta para para alterar as informações de perfil',
  robots: { index: false, follow: false },
};

function MyAccount() {
  return <MyAccountForm />;
}

export default MyAccount;
