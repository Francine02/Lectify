'use client';
import { Button } from '@/components/button';
import { Input } from '@/components/Input';
import { checkEmailRequest } from '@/service/auth/check-email-request';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RegisterData, registerSchema } from './register-schema';

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<RegisterData> = async (data) => {
    const result = await checkEmailRequest(data);

    if (!result.success) {
      setError('email', {
        type: 'manual',
        message: result.error?.message,
      });
      return;
    }

    sessionStorage.setItem('email', data.email);
    router.push('/cadastro/verificar-codigo');
  };

  return (
    <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-sm text-center text-gray-500 mb-10">
        Insira seu email para receber o código de verificação.
      </p>

      <Input.Root
        {...register('email')}
        errors={!!errors.email}
        helperText={errors.email?.message}
        label="Email"
        placeholder="exemplo@gmail.com"
      />

      <Button className="mt-10 md:mt-12 mb-4" type="submit" loading={isSubmitting}>
        Enviar
      </Button>
    </form>
  );
}
