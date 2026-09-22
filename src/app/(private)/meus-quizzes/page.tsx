import { Metadata } from 'next';
import { QuizLibrary } from './quiz-library';

export const metadata: Metadata = {
  title: 'Meus quizzes',
  description: 'Todos os quizzes que você já gerou, prontos para responder de novo.',
  robots: { index: false, follow: false },
};

export default async function MyQuizzes() {
  return <QuizLibrary />;
}
