import { Metadata } from 'next';
import { NoteStudio } from './studio';

export const metadata: Metadata = {
  title: 'Anotação',
  description: 'Escreva ao lado do resumo e baixe tudo em um documento só.',
  robots: { index: false, follow: false },
};

export default function NotePage() {
  return <NoteStudio />;
}
