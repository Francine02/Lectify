import { Metadata } from 'next';
import { SummaryLibrary } from './library';

export const metadata: Metadata = {
  title: 'Meus resumos',
  description: 'Todos os resumos que você já gerou, prontos para reler ou baixar.',
  robots: { index: false, follow: false },
};

export default async function MySummaries() {
  return <SummaryLibrary />;
}
