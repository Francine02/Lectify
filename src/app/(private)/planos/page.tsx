import { Loading } from '@/components/Loading';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { PlansView } from './plans-view';

export const metadata: Metadata = {
  title: 'Planos',
  description: 'Escolha o plano com o limite semanal de gerações que você precisa.',
  robots: { index: false, follow: false },
};

export default async function Plans() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <Loading />
        </div>
      }
    >
      <PlansView />
    </Suspense>
  );
}
