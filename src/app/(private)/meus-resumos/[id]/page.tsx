import { Metadata } from 'next';
import { SummaryViewer } from './viewer';

export const metadata: Metadata = {
  title: 'Resumo',
  description: 'Leia o resumo gerado sem sair do app.',
  robots: { index: false, follow: false },
};

export default function SummaryPage() {
  return <SummaryViewer />;
}
