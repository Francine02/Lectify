'use client';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { PersonalInformationData, personalInformationSchema } from './personal-information-schema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StrongPassword } from '@/components/StrongPassword';
import { registerRequest } from '@/service/auth/register-request';
import { useState } from 'react';
import { Error } from '@/components/Error';
import { setStep } from '../auth-step';
import { useRouter } from 'next/navigation';

export function PersonalInformationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PersonalInformationData>({
    resolver: zodResolver(personalInformationSchema),
  });
  const [error, setError] = useState<string>();
  const router = useRouter();

  const onSubmit: SubmitHandler<PersonalInformationData> = async (data) => {
    const email = sessionStorage.getItem('email') ?? '';

    const payload = {
      email,
      ...data,
    };

    setError('');
    const result = await registerRequest(payload);

    if (!result.success) {
      setError(result.error?.message);
      return;
    }
    await setStep();
    sessionStorage.removeItem('email');
    router.push('/');
  };

  return (
    <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
      <p className="mb-10 text-sm text-center text-gray-500">
        Insira suas informações para terminar o cadastro.
      </p>

      <Input.Root
        {...register('username')}
        errors={!!errors.username}
        helperText={errors.username?.message}
        label="Nome de usuário"
        placeholder="marianaOl1"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-5">
        <Input.Root
          {...register('firstname')}
          errors={!!errors.firstname}
          helperText={errors.firstname?.message}
          label="Nome"
          placeholder="Mariana"
        />
        <Input.Root
          {...register('lastname')}
          errors={!!errors.lastname}
          helperText={errors.lastname?.message}
          label="Sobrenome"
          placeholder="Oliveira"
        />
      </div>

      <Input.Password
        {...register('password')}
        id="hs-strong-password-with-indicator-and-hint"
        data-hs-strong-password=""
        errors={!!errors.password}
        label="Senha"
        placeholder="*****"
      />
      <StrongPassword />
      {error && <Error text={error} />}

      <Button className="mt-10 md:mt-12 mb-4" type="submit" isLoading={isSubmitting}>
        Cadastrar
      </Button>
    </form>
  );
}
