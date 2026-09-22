'use client';

import { Button } from '@/components/Button';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { Input } from '@/components/Input';
import { patchPersonalInformations } from '@/service/my-account/patch-personal-informations';
import { filterDirtyData } from '@/utils/form/filter-data-dirty';
import { handleDeleteAccount } from '@/utils/handlers/handle-delete-account';
import { getInformationsSaveInStorage } from '@/utils/informations/get-informations';
import { saveInformationsInStorage } from '@/utils/storage/save-informations-storage';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyRound, Trash2, UserRound } from 'lucide-react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { PersonalInformationData, personalInformationSchema } from './personal-information-schema';

export function MyAccountForm() {
  const info = getInformationsSaveInStorage();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm<PersonalInformationData>({
    resolver: zodResolver(personalInformationSchema),
    defaultValues: info ?? {},
  });

  const onSubmit: SubmitHandler<PersonalInformationData> = async (data) => {
    const filteredData = filterDirtyData(data, dirtyFields);

    if (Object.keys(filteredData).length === 0) {
      toast.info('Nenhuma alteração detectada.');
      return;
    }

    const result = await patchPersonalInformations(filteredData);

    if (!result.success) {
      toast.error(result.error?.message);
      return;
    }

    saveInformationsInStorage(data);
    toast.success('Informações alteradas!');
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    await handleDeleteAccount();
    setIsDeleting(false);
    setIsConfirmOpen(false);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <section className="card space-y-4 p-5">
        <header className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
            <UserRound size={16} />
          </span>
          <h2 className="font-display text-base font-extrabold">Dados pessoais</h2>
        </header>

        <div className="grid gap-4 sm:grid-cols-2">
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
      </section>

      <section className="card space-y-4 p-5">
        <header className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
            <KeyRound size={16} />
          </span>
          <h2 className="font-display text-base font-extrabold">Segurança</h2>
        </header>

        <Input.Password
          {...register('password')}
          errors={!!errors.password}
          helperText={errors.password?.message}
          label="Nova senha"
          placeholder="*****"
        />
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setIsConfirmOpen(true)}
          className="focus-ring inline-flex items-center gap-2 rounded-xl border border-line px-4 py-2.5 text-sm font-semibold text-subtle transition-colors hover:border-coral-500/40 hover:bg-coral-50 hover:text-coral-700"
        >
          <Trash2 size={14} />
          Excluir conta
        </button>

        <Button className="w-auto px-8" isLoading={isSubmitting} type="submit">
          Salvar alterações
        </Button>
      </div>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        isLoading={isDeleting}
        title="Excluir sua conta?"
        confirmLabel="Enviar e-mail"
        description={
          <>
            Vamos enviar um e-mail de confirmação. Ao concluir, sua conta, seus resumos e as
            questões geradas são apagados em definitivo.
          </>
        }
        onConfirm={confirmDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </form>
  );
}
