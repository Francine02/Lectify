'use client';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { EmailData, emailSchema } from '@/schemas/email-schema';
import { checkEmailRequest } from '@/service/auth/check-email-request';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { setStep } from './auth-step';

export function CheckEmailForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EmailData>({
    resolver: zodResolver(emailSchema),
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<EmailData> = async (data) => {
    const result = await checkEmailRequest(data);

    if (!result.success) {
      setError('email', {
        type: 'manual',
        message: result.error?.message,
      });
      return;
    }

    sessionStorage.setItem('email', data.email);

    await setStep(1);
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

      <Button className="mt-10 md:mt-12 mb-4" type="submit" isLoading={isSubmitting}>
        Enviar
      </Button>
    </form>
  );
}
