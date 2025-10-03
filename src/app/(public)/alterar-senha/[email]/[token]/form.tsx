'use client';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { changePasswordRequest } from '@/service/auth/change-password';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaCheck } from 'react-icons/fa6';
import { CreatePasswordData, createPasswordSchema } from 'schemas/create-password';

export function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<CreatePasswordData>({
    resolver: zodResolver(createPasswordSchema),
  });
  const router = useRouter();
  const params = useParams();

  const email = decodeURIComponent(params.email as string);
  const token = params.token as string;

  const onSubmit: SubmitHandler<CreatePasswordData> = async ({ password }) => {
    const payload = {
      email,
      token,
      new_password: password,
    };
    const result = await changePasswordRequest(payload);
    if (!result.success) {
      setError('password', {
        type: 'manual',
        message: result.error?.message,
      });
      return;
    }
  };

  return (
    <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-title font-black text-center">Redefinir a senha</h1>

      <p className="text-sm text-center text-gray-500 mb-10">Por favor, insira uma nova senha.</p>

      <Input.Password
        {...register('password')}
        errors={!!errors.password}
        helperText={errors.password?.message}
        label="Senha"
        placeholder="*****"
      />
      <Input.Password
        {...register('confirmPassword')}
        errors={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        label="Confirmar a senha"
        placeholder="*****"
      />

      {isSubmitSuccessful && !errors.password ? (
        <>
          <p className="text-green-500 flex items-center gap-2 text-xs md:text-sm">
            <FaCheck />
            Senha alterada com sucesso!
          </p>

          <Button className="mt-10 md:mt-12 mb-4" onClick={() => router.push('/')} type="button">
            Voltar
          </Button>
        </>
      ) : (
        <Button className="mt-10 md:mt-12 mb-4" type="submit" isLoading={isSubmitting}>
          Confirmar
        </Button>
      )}
    </form>
  );
}
