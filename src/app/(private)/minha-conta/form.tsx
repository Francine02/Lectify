'use client';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { patchPersonalInformations } from '@/service/my-account/patch-personal-informations';

import { Modal } from '@/components/Modal';
import { AccountInfos } from '@/components/MyAccount/AccountInfos';
import { DELETE_ACCOUNT } from '@/constants/modals/delete-account';
import { filterDirtyData } from '@/utils/form/filter-data-dirty';
import { handleDeleteAccount } from '@/utils/handlers/handle-delete-account';
import { getInformationsSaveInStorage } from '@/utils/informations/get-informations';
import { saveInformationsInStorage } from '@/utils/storage/save-informations-storage';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { PersonalInformationData, personalInformationSchema } from './personal-information-schema';

export function MyAccountForm() {
  const info = getInformationsSaveInStorage();
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

  return (
    <form className="space-y-7 flex flex-col h-full" onSubmit={handleSubmit(onSubmit)}>
      <AccountInfos />

      <div className="space-y-2 ">
        <h2 className="text-lg font-semibold">Alterar informações</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Alterar senha</h2>
        <Input.Password
          {...register('password')}
          errors={!!errors.password}
          helperText={errors.password?.message}
          label="Nova senha"
          placeholder="*****"
        />
      </div>

      <Modal
        color={DELETE_ACCOUNT.color}
        id={DELETE_ACCOUNT.id}
        icon={DELETE_ACCOUNT.icon}
        title={DELETE_ACCOUNT.title}
        message={DELETE_ACCOUNT.mesage}
        handleConfirm={handleDeleteAccount}
      />

      <Button
        type="button"
        className="w-fit py-1.5 text-xs bg-red-400 border-red-500 "
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls={`hs-${DELETE_ACCOUNT.id}`}
        data-hs-overlay={`#hs-${DELETE_ACCOUNT.id}`}
      >
        Deletar conta
      </Button>

      <Button className="mt-auto" isLoading={isSubmitting} type="submit">
        Salvar
      </Button>
    </form>
  );
}
