import { Logo } from '@/components/Logo';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 h-screen overflow-auto">
      <section className="order-2 md:order-1 m-auto w-full px-5 max-w-md 2x1:max-w-lg py-6">
        {children}
      </section>

      <aside className="relative bg-purple-700 order-1 md:order-2 h-36 md:h-full">
        <Logo className="absolute right-5 lg:right-10 top-6 z-10" />
        <img
          src="/assets/background.jpeg"
          alt="Plano de fundo em pixel art roxo"
          className="absolute inset-0 w-full h-full md:object-fill object-cover"
        />
      </aside>
    </main>
  );
}
