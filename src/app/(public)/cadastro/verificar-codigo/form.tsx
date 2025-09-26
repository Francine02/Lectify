'use client';
import { Button } from '@/components/button';
import { Input } from '@/components/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CheckCodeData, checkCodeSchema } from './check-code-schema';
import { checkEmailRequest } from '@/service/auth/check-email-request';

export function CheckCodeForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CheckCodeData>({
    resolver: zodResolver(checkCodeSchema),
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<CheckCodeData> = async (data) => {
    const email = sessionStorage.getItem('email') ?? '';

    const payload = {
      email,
      ...data,
    };

    const result = await checkEmailRequest(payload);

    if (!result.success) {
      setError('code', {
        type: 'manual',
        message: result.error?.message,
      });
      return;
    }

    router.push('/cadastro/informacoes-pessoais');
  };

  return (
    <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
      <p className="mb-10 text-sm text-center text-gray-500">
        Insira seu código de verificação para continuar o cadastro.
      </p>

      <Input.Code
        register={register}
        errors={!!errors.code}
        helperText={errors.code?.message}
        label="Código de verificação"
        maxLength={6}
      />

      <Button className="mt-10 md:mt-12 mb-4" type="submit" loading={isSubmitting}>
        Avançar
      </Button>
    </form>
  );
}
