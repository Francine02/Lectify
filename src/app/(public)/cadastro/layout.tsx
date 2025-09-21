import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1 className="text-title font-black text-center text-vine-600">Cadastro</h1>
      {children}

      <p className="text-gray-600 text-sm">
        Já possui uma conta?
        <Link
          href="/login"
          className="text-black font-semibold hover:underline cursor-pointer ml-1"
        >
          Entrar
        </Link>
      </p>
    </>
  );
}
