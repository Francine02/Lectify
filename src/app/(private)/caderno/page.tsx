import { Metadata } from 'next';
import { Notebook } from './notebook';

export const metadata: Metadata = {
  title: 'Caderno',
  description: 'Anotações, tópicos e links salvos no seu navegador.',
  robots: { index: false, follow: false },
};

export default function NotebookPage() {
  return <Notebook />;
}
