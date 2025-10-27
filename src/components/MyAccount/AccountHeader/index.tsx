'use client';
import { isAccountFree } from '@/utils/informations/get-account-plan';
import { Badge } from '../../Badge';
import { getFullName } from '@/utils/informations/get-account-full-name';
import { useEffect, useState } from 'react';

export function AccountHeader() {
  const [fullName, setFullName] = useState('');
  const [plan, setPlan] = useState<'premium' | 'normal'>();

  useEffect(() => {
    setFullName(getFullName());
    setPlan(isAccountFree());
  }, []);

  return (
    <>
      <h2 className="text-lg font-semibold">{fullName}</h2>
      {plan && <Badge text={plan} />}
    </>
  );
}
