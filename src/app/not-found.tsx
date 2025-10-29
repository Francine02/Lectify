export default function NotFound() {
  return (
    <main
      className="m-auto flex flex-col items-center justify-center h-screen text-center"
      aria-labelledby="not-found-title"
    >
      <h1 id="not-found-title" className="text-3xl font-bold mb-2">
        Página não encontrada!
      </h1>
      <p className="text-gray-600">A página que você está procurando não existe ou foi removida.</p>
    </main>
  );
}
