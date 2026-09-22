'use client';

import { Loading } from '@/components/Loading';
import { useAccountPlan } from '@/hooks/useAccountPlan';
import { useImageUpload } from '@/hooks/useImageUpload';
import { formatDatePt } from '@/utils/formatters/formatDatePt';
import { getFullName } from '@/utils/informations/get-account-full-name';
import { getInformationItem } from '@/utils/informations/get-informations';
import { AtSign, CalendarDays, Camera, Crown, Trash2, UserRound } from 'lucide-react';
import { useEffect, useState } from 'react';

/** Cabeçalho do perfil: identidade e plano de relance, sem formulário no meio. */
export function ProfileHeader() {
  const { preview, inputRef, handleFileChange, handleRemove, loadingAction } = useImageUpload();
  const { isFree } = useAccountPlan();

  const [info, setInfo] = useState({ name: '', username: '', email: '', created: '' });

  useEffect(() => {
    setInfo({
      name: getFullName(),
      username: String(getInformationItem('username') ?? ''),
      email: String(getInformationItem('email') ?? ''),
      created: String(getInformationItem('created_at') ?? ''),
    });
  }, []);

  const isDefaultImage = preview === '/assets/avatar.png';

  return (
    <section className="card flex flex-col items-center gap-5 p-6 sm:flex-row sm:items-start">
      <div className="relative shrink-0">
        <img
          src={preview}
          alt=""
          className="size-24 rounded-2xl border border-line object-cover sm:size-28"
        />

        <input
          accept="image/*"
          className="hidden"
          type="file"
          ref={inputRef}
          onChange={handleFileChange}
        />

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={loadingAction !== null}
          aria-label="Alterar foto"
          className="focus-ring absolute -bottom-2 -right-2 rounded-xl border border-line bg-surface p-2 text-subtle shadow-soft transition-colors hover:text-purple-700 disabled:opacity-60"
        >
          {loadingAction === 'upload' ? <Loading className="size-4" /> : <Camera size={15} />}
        </button>
      </div>

      <div className="min-w-0 flex-1 space-y-3 text-center sm:text-left">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <h1 className="font-display text-xl font-extrabold">{info.name || 'Sua conta'}</h1>

            <span
              className={
                isFree === false ? 'chip bg-purple-50 text-purple-700' : 'chip bg-canvas text-subtle'
              }
            >
              <Crown size={11} />
              {isFree === false ? 'Plano ativo' : 'Gratuito'}
            </span>
          </div>

          {info.username && (
            <p className="flex items-center justify-center gap-1.5 text-sm text-subtle sm:justify-start">
              <UserRound size={13} />@{info.username}
            </p>
          )}
        </div>

        <dl className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm sm:justify-start">
          <div className="flex items-center gap-2">
            <AtSign size={14} className="text-faint" />
            <dt className="sr-only">E-mail</dt>
            <dd className="truncate">{info.email || '-'}</dd>
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays size={14} className="text-faint" />
            <dt className="sr-only">Membro desde</dt>
            <dd>{info.created ? `Desde ${formatDatePt(info.created)}` : '-'}</dd>
          </div>
        </dl>

        {!isDefaultImage && (
          <button
            type="button"
            onClick={handleRemove}
            disabled={loadingAction !== null}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-subtle transition-colors hover:text-coral-700 disabled:opacity-60"
          >
            {loadingAction === 'remove' ? <Loading className="size-3" /> : <Trash2 size={12} />}
            Remover foto
          </button>
        )}
      </div>
    </section>
  );
}
