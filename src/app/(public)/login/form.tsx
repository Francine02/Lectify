import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';
import { Input } from '@/components/Input';
import Link from 'next/link';

export function LoginForm() {
  return (
    <>
      <h1 className="text-title font-black text-center mb-10 ">Login</h1>
      <Input.Root label="Nome de usuário" placeholder="exemplo12" />
      <Input.Password label="Senha" placeholder="*****" />
      <p className="text-gray-600 hover:underline cursor-pointer text-sm mt-1">Esqueceu a senha?</p>

      <Button className="mt-10 md:mt-12 mb-4">Entrar</Button>

      <p className="text-gray-600 text-sm">
        Não possui uma conta?
        <Link
          href="/cadastro"
          className="text-black font-semibold hover:underline cursor-pointer ml-1"
        >
          Cadastre-se
        </Link>
      </p>
    </>
  );
}
