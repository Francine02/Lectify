import { Metadata } from 'next';
import { CheckEmailForm } from './form';

export const metadata: Metadata = {
  //TODO: colocar a url das imagens
  title: 'Cadastro | Lectify',
  description:
    'Crie sua conta grátis e comece a transformar PDFs em questões e gerar resumos de vídeos do YouTube.',
  openGraph: {
    title: 'Cadastro | Lectify',
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
    title: 'Cadastro | Lectify',
    description: 'Comece já a usar nossa plataforma de estudos.',
    images: '',
  },
};

export default async function RegisterPage() {
  return <CheckEmailForm />;
}
