export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 h-screen overflow-auto">
      <section className="order-2 md:order-1 mx-auto md:m-auto w-full px-5 max-w-md 2x1:max-w-lg">
        {children}
      </section>

      <section className="bg-purple-700 flex-end h-30 md:h-screen order-1 md:order-2">
        <img
          src="/assets/background.jpeg"
          className="w-full h-full object-cover md:object-contain object-left"
        />
      </section>
    </main>
  );
}
