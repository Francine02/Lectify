'use client';
import { Loading } from '@/components/Loading';
import { FIELDS_ACCOUNT } from '@/constants/form/fields-account';
import { InformationsAccountType } from '@/types/InformationsAccountType';
import { getInformationItem } from '@/utils/informations/get-informations';
import { useEffect, useState } from 'react';

export function AccountInfos() {
  const [info, setInfo] = useState<InformationsAccountType | null>(null);

  useEffect(() => {
    setInfo({
      username: String(getInformationItem('username') ?? '-'),
      created: String(getInformationItem('created_at') ?? '-'),
      email: String(getInformationItem('email') ?? '-'),
    });
  }, []);

  if (!info) return <Loading />;

  return (
    <div className="flex flex-wrap justify-between items-center gap-5 text-sm border-t sm:border-t-0 border-b border-gray-200 py-5 sm:pt-0">
      {FIELDS_ACCOUNT(info).map((field) => (
        <div key={field.label}>
          <p className="font-semibold">{field.label}:</p>
          <p className="font-normal">{field.value}</p>
        </div>
      ))}
    </div>
  );
}
