import { Metadata } from 'next';
import { LoginForm } from './form';

export const metadata: Metadata = {
  title: 'Login | Lectify',
  description:
    'Acesse sua conta para transformar PDFs em questões e gerar resumos de vídeos do YouTube.',
  robots: { index: false, follow: false },
};

function Login() {
  return <LoginForm />;
}

export default Login;
