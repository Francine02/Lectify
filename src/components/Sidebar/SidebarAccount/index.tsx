'use client';

import { PROFILE_UPDATED_EVENT } from '@/constants/storage/storage-keys';
import { cn } from '@/utils/cn';
import { getFullName } from '@/utils/informations/get-account-full-name';
import { getInformationItem } from '@/utils/informations/get-informations';
import { useEffect, useState } from 'react';

const DEFAULT_AVATAR = '/assets/avatar.png';

export function SidebarAccount({ isExpanded }: { isExpanded: boolean }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState(DEFAULT_AVATAR);
  const [isFree, setIsFree] = useState(true);

  useEffect(() => {
    const read = () => {
      setName(getFullName());
      setImage(String(getInformationItem('image_profile')) || DEFAULT_AVATAR);
      setIsFree(getInformationItem('is_free') === true);
    };

    read();

    window.addEventListener(PROFILE_UPDATED_EVENT, read);
    return () => window.removeEventListener(PROFILE_UPDATED_EVENT, read);
  }, []);

  return (
    <div className="flex items-center gap-3 px-1.5 py-1.5">
      <img
        src={image}
        alt=""
        className="size-9 shrink-0 rounded-full border border-white/25 object-cover"
      />

      <div
        className={cn(
          'min-w-0 flex-1 transition-opacity duration-200',
          isExpanded ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        aria-hidden={!isExpanded}
      >
        <p className="truncate text-sm font-semibold text-white">{name || 'Minha conta'}</p>
        <p className="truncate text-[11px] text-white/50">
          {isFree ? 'Plano gratuito' : 'Plano ativo'}
        </p>
      </div>
    </div>
  );
}
