'use client';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { checkEmailForgotPasswordRequest } from '@/service/auth/check-email-forgot-password-request';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaCheck } from 'react-icons/fa6';
import { EmailData, emailSchema } from 'schemas/email-schema';

export function CheckEmailForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<EmailData>({
    resolver: zodResolver(emailSchema),
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<EmailData> = async ({ email }) => {
    const result = await checkEmailForgotPasswordRequest(email);

    if (!result.success) {
      setError('email', {
        type: 'manual',
        message: result.error?.message,
      });
      return;
    }
  };

  return (
    <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-title font-black text-center">Esqueci minha senha</h1>

      <p className="text-sm text-center text-gray-500 mb-10">
        Informe seu email para o qual deseja redefir a senha e lhe enviaremos um link com as
        instruções.
      </p>

      <Input.Root
        {...register('email')}
        errors={!!errors.email}
        helperText={errors.email?.message}
        label="Email"
        placeholder="exemplo@gmail.com"
      />

      {isSubmitSuccessful && !errors.email ? (
        <>
          <p className="text-green-500 flex items-center gap-2 text-xs md:text-sm">
            <FaCheck />
            Sucesso! Verifique o seu email, por favor.
          </p>

          <Button className="mt-10 md:mt-12 mb-4" onClick={() => router.push('/')} type="button">
            Voltar
          </Button>
        </>
      ) : (
        <Button className="mt-10 md:mt-12 mb-4" type="submit" isLoading={isSubmitting}>
          Enviar
        </Button>
      )}
    </form>
  );
}
