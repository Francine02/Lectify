export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 h-screen p-4 sm:px-14 overflow-auto md:gap-5 lg:p-8 lg:gap-5 2xl:gap-14 max-w-screen-xl mx-auto">
      <section className="bg-purple-100 rounded-lg relative md:flex-col md:flex md:justify-between lg:ml-10">
        <div className="hidden md:block px-3 lg:px-6 pt-10">
          <h1 className="text-3xl font-bold text-blue-700">Seu atalho para estudar melhor.</h1>
          <p className="text-sm text-blue-700 mt-2 ">
            Transforme PDFs e vídeos do YouTube em resumos e questões.
          </p>
        </div>

        <img
          src="/assets/Learn.png"
          className="absolute inset-0 w-full h-full object-cover md:object-contain md:relative md:h-fit "
        />
      </section>

      <section className="bg-white my-auto lg:px-10 md:max-w-[40rem] w-full mx-auto">
        {children}
      </section>
    </main>
  );
}
