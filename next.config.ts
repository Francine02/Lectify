import type { NextConfig } from 'next';

/**
 * Origens autorizadas a consumir os assets do dev server. Sem isso, o Next
 * bloqueia `/_next/*` quando a página é aberta por um túnel (ngrok) ou pelo IP
 * da máquina no celular — a tela carrega sem estilo e sem hot reload.
 * `DEV_ORIGIN` é para o IP da LAN, ex.: 192.168.0.12:3000.
 */
const devOrigins = [
  '*.ngrok-free.app',
  '*.ngrok.app',
  '*.ngrok.io',
  '*.trycloudflare.com',
  '*.loca.lt',
];

/**
 * Proxy opcional da API. Quando definido, o front fala com a própria origem
 * (`/api/lectify/...`) e o servidor Next repassa para o Flask — assim um túnel
 * https não esbarra em conteúdo misto nem em CORS, e basta expor uma porta.
 */
const apiTarget = process.env.API_PROXY_TARGET;

const nextConfig: NextConfig = {
  allowedDevOrigins: process.env.DEV_ORIGIN ? [...devOrigins, process.env.DEV_ORIGIN] : devOrigins,

  experimental: {
    // importa só os ícones usados, em vez do pacote inteiro
    optimizePackageImports: ['lucide-react', 'react-icons'],
  },

  async rewrites() {
    if (!apiTarget) return [];

    return [
      {
        source: '/api/lectify/:path*',
        destination: `${apiTarget.replace(/\/$/, '')}/lectify/:path*`,
      },
    ];
  },
};

export default nextConfig;
