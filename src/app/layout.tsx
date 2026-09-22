import { ThemeProvider } from '@/contexts/Theme';
import '@/style/globals.css';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const display = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['600', '700', '800'],
  variable: '--font-display',
});

export const metadata = {
  metadataBase: new URL('https://lectify.app'),
  title: { default: 'Lectify', template: '%s | Lectify' },
  description: 'Transforme vídeos e documentos em resumos e questões de estudo.',
  icons: { icon: '/favicon.png', apple: '/assets/logo.png' },
};

/** Cor da barra do navegador no mobile, acompanhando o tema. */
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover' as const,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f4f4f9' },
    { media: '(prefers-color-scheme: dark)', color: '#101018' },
  ],
};

/**
 * Aplica o tema antes do primeiro paint — sem isso a tela pisca em branco
 * quando a escolha salva é o modo escuro.
 */
const themeScript = `(function(){try{var c=localStorage.getItem('lectify:theme')||'system';var d=c==='dark'||(c==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);var r=document.documentElement;r.dataset.theme=d?'dark':'light';r.style.colorScheme=d?'dark':'light';}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // extensões (Dark Reader e afins) escrevem atributos em html/body antes da
    // hidratação — suprimir o aviso aqui evita um erro de console que não é nosso
    <html
      lang="pt-BR"
      className={`${inter.variable} ${display.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>

      <body className="font-sans" suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
