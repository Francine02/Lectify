import { Logo } from '@/components/Logo';
import PrelineScriptWrapper from '@/components/Preline/PrelineScriptWrapper';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid min-h-dvh grid-cols-1 md:grid-cols-2">
      <section className="order-2 m-auto w-full max-w-md px-5 py-8 md:order-1">{children}</section>

      <aside className="relative order-1 h-40 overflow-hidden bg-purple-900 md:order-2 md:h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-800 via-purple-900 to-purple-700" />

        <div
          className="pointer-events-none absolute -left-16 top-1/3 size-72 rounded-full bg-purple-500/30 blur-3xl"
          aria-hidden
        />

        <div className="relative flex h-full flex-col justify-between p-6 md:p-10">
          <Logo className="w-9" />

          <div className="hidden max-w-sm space-y-3 text-white md:block">
            <h2 className="font-display text-3xl font-extrabold leading-tight">
              Assista menos.
              <br />
              Aprenda mais.
            </h2>
            <p className="text-sm text-white/70">
              Resumos e questões a partir das suas aulas do YouTube, prontos em minutos.
            </p>
          </div>
        </div>
      </aside>

      {/* o Preline só é necessário nos fluxos de cadastro (pin input e força de senha) */}
      <PrelineScriptWrapper />
    </main>
  );
}
