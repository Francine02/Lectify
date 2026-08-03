import { Metadata } from 'next';
import { GenerateQuizForm } from './form';

export const metadata: Metadata = {
  title: 'Gerar questões | Lectify',
  description: 'Gere questões a partir de um arquivo PDF ou MD.',
  robots: { index: false, follow: false },
};

export default async function GenerateQuiz() {
  return <GenerateQuizForm />;
}
