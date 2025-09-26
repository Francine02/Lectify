import { Metadata } from 'next';
import { RegisterForm } from './form';

export const metadata: Metadata = {
  //TODO: colocar a url das imagens
  title: 'Lectify | Cadastro',
  description:
    'Crie sua conta grátis e comece a transformar PDFs em questões e gerar resumos de vídeos do YouTube.',
  openGraph: {
    title: 'Lectify | Cadastro',
    description: 'Entre agora para usar nossa plataforma de estudos com PDFs e YouTube.',
    url: process.env.NEXT_PUBLIC_URL,
    siteName: 'Lectify',
    images: [
      {
        url: '',
        width: 1200,
        height: 630,
        alt: 'Lectify - Plataforma de Estudos',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lectify | Cadastro',
    description: 'Comece já a usar nossa plataforma de estudos.',
    images: '',
  },
};

function Register() {
  return <RegisterForm />;
}

export default Register;
