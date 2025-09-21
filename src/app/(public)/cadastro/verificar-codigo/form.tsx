'use client';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useRouter } from 'next/navigation';

export function CheckCodeForm() {
  const router = useRouter();

  const handleSubmit = () => {
    router.push('/cadastro/cadastrar');
  };
  return (
    <>
      <p className="mb-10 text-sm text-center text-gray-500">
        Insira seu código de verificação para continuar o cadastro.
      </p>

      <Input.Code label="Código de verificação" />

      <Button className="mt-10 md:mt-12 mb-4" onClick={() => handleSubmit()}>
        Avançar
      </Button>
    </>
  );
}
