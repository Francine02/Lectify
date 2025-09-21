'use client';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useRouter } from 'next/navigation';

export function RegisterForm() {
  const router = useRouter();

  const handleSubmit = () => {
    router.push('/cadastro/verificar-codigo');
  };

  return (
    <>
      <p className="text-sm text-center text-gray-500 mb-10">
        Insira seu email para receber o código de verificação.
      </p>

      <Input.Root label="Email" placeholder="exemplo@gmail.com" />

      <Button className="mt-10 md:mt-12 mb-4" onClick={() => handleSubmit()}>
        Enviar
      </Button>
    </>
  );
}
