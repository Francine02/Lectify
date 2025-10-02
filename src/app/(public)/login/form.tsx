'use client';
import { Input } from '@/components/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginData, loginSchema } from './login-schema';
import { Button } from '@/components/Button';
import { useState } from 'react';
import { loginRequest } from '@/service/auth/login-request';
import { Error } from '@/components/Error';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });
  const [error, setError] = useState<string>();

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    setError('');
    const result = await loginRequest(data);

    if (!result.success) {
      setError(result.error?.message);
      return;
    }
    alert('LOGADOOOO');
  };

  return (
    <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-title font-black text-center mb-10 ">Login</h1>
      <Input.Root
        {...register('email')}
        errors={!!errors.email}
        helperText={errors.email?.message}
        label="Email"
        placeholder="exemplo@gmail.com"
      />
      <Input.Password
        {...register('password')}
        errors={!!errors.password}
        helperText={errors.password?.message}
        label="Senha"
        placeholder="*****"
      />
      {error && <Error text={error} />}

      <Link
        href="/esqueci-senha"
        className="text-gray-600 hover:underline cursor-pointer text-sm mt-1"
      >
        Esqueceu a senha?
      </Link>

      <Button isLoading={isSubmitting} className="mt-10 md:mt-12 mb-4" type="submit">
        Entrar
      </Button>

      <p className="text-gray-600 text-sm">
        Não possui uma conta?
        <Link
          href="/cadastro"
          className="text-black font-semibold hover:underline cursor-pointer ml-1"
        >
          Cadastre-se
        </Link>
      </p>
    </form>
  );
}
