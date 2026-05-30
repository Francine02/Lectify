'use client';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ResendCode } from '@/components/ResendCode';
import { useResendCode } from '@/hooks/useResendCode';
import { CheckCodeFormInputs, checkCodeSchema } from '@/schemas/code-schema';
import { checkCodeRequest } from '@/service/auth/check-code-request';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { setStep } from '../auth-step';

export function CheckCodeForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CheckCodeFormInputs>({
    resolver: zodResolver(checkCodeSchema),
  });
  const router = useRouter();
  const email = sessionStorage.getItem('email') ?? '';

  const { timer, handleResend } = useResendCode({ email, isSubmitting });

  const onSubmit: SubmitHandler<CheckCodeFormInputs> = async (data) => {
    const code = `${data.input1}${data.input2}${data.input3}${data.input4}${data.input5}${data.input6}`;

    const payload = {
      email,
      code,
    };

    const result = await checkCodeRequest(payload);

    if (!result.success) {
      setError('root', {
        type: 'manual',
        message: result.error?.message,
      });
      return;
    }

    await setStep(2);
    router.push('/cadastro/informacoes-pessoais');
  };

  return (
    <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
      <p className="mb-10 text-sm text-center text-gray-500">
        Insira seu código de verificação para continuar o cadastro.
      </p>

      <Input.Code
        register={register}
        errors={!!errors.input1}
        helperText={errors.input1?.message}
        label="Código de verificação"
      />
      <ResendCode timer={timer} onResend={handleResend} />

      <Button className="mt-10 md:mt-12 mb-4" type="submit" isLoading={isSubmitting}>
        Avançar
      </Button>
    </form>
  );
}
