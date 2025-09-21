import PrelineScriptWrapper from '@/components/Preline/PrelineScriptWrapper';
import '@/style/globals.css';
import { AnimatePresence } from 'framer-motion';
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
        <AnimatePresence mode="wait">{children}</AnimatePresence>
        <PrelineScriptWrapper />
      </body>
    </html>
  );
}
