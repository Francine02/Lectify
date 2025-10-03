import PrelineScriptWrapper from '@/components/Preline/PrelineScriptWrapper';
import '@/style/globals.css';
import { Lora } from 'next/font/google';
import '@/style/globals.css';

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={lora.className}>
      <body>
        {children}
        <PrelineScriptWrapper />
      </body>
    </html>
  );
}
