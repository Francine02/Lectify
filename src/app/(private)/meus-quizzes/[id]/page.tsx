import { Metadata } from 'next';
import { SavedQuizView } from './quiz-view';

export const metadata: Metadata = {
  title: 'Quiz',
  description: 'Responda de novo um quiz já gerado, sem consumir cota.',
  robots: { index: false, follow: false },
};

export default function SavedQuizPage() {
  return <SavedQuizView />;
}
