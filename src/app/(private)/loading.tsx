/**
 * Esqueleto no lugar do spinner de tela cheia: o shell (sidebar, topbar) já está
 * pintado, então a troca de rota não pisca em branco.
 */
export default function Loading() {
  return (
    <div className="space-y-5" aria-busy>
      <div className="space-y-2">
        <div className="skeleton h-7 w-52" />
        <div className="skeleton h-4 w-72" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {[0, 1, 2, 3].map((key) => (
          <div key={key} className="skeleton h-36 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
