import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center"
      aria-labelledby="not-found-title"
    >
      <span className="font-display text-6xl font-extrabold text-purple-200">404</span>

      <div className="space-y-1">
        <h1 id="not-found-title" className="font-display text-2xl font-extrabold">
          Página não encontrada
        </h1>
        <p className="subtitle">A página que você procura não existe ou foi removida.</p>
      </div>

      <Link
        href="/"
        className="focus-ring rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-hover"
      >
        Voltar ao início
      </Link>
    </main>
  );
}
