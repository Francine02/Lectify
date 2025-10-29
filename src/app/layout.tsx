import PrelineScriptWrapper from '@/components/Preline/PrelineScriptWrapper';
import '@/style/globals.css';
import { Lora } from 'next/font/google';
import '@/style/globals.css';
import { Footer } from '@/components/Footer';

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={lora.className}>
      <body>
        <div className="flex flex-col min-h-screen">
          <main className="flex-1">
            {children}
            <PrelineScriptWrapper />
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
