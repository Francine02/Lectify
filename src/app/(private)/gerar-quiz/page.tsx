import { Loading } from '@/components/Loading';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { GenerateQuizForm } from './form';

export const metadata: Metadata = {
  title: 'Gerar questões',
  description: 'Gere questões a partir de um arquivo PDF ou MD.',
  robots: { index: false, follow: false },
};

export default async function GenerateQuiz() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <Loading />
        </div>
      }
    >
      <GenerateQuizForm />
    </Suspense>
  );
}
