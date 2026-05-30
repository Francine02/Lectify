import { Metadata } from 'next';
import { GenerateSummaryForm } from './form';

export const metadata: Metadata = {
  title: 'Gerar resumo | Lectify',
  description: 'Gere um resumo em formato de pdf ou md a partir de uma URL de um vídeo do YouTube',
  robots: { index: false, follow: false },
};

export default async function GenerateSummary() {
  return <GenerateSummaryForm />;
}
