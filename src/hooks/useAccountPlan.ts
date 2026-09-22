'use client';

import { PROFILE_UPDATED_EVENT } from '@/constants/storage/storage-keys';
import { PlanId } from '@/types/Plan';
import { getInformationItem } from '@/utils/informations/get-informations';
import { useCallback, useEffect, useState } from 'react';

/**
 * Lê o plano do cookie e se atualiza quando o ProfileSync termina de conversar
 * com o backend — evita decidir com dado velho logo após o login.
 */
export function useAccountPlan() {
  const [isFree, setIsFree] = useState<boolean | null>(null);
  const [plan, setPlan] = useState<PlanId | null>(null);

  const read = useCallback(() => {
    setIsFree(getInformationItem('is_free') === true);
    setPlan((String(getInformationItem('plan')) || null) as PlanId | null);
  }, []);

  useEffect(() => {
    read();

    window.addEventListener(PROFILE_UPDATED_EVENT, read);
    return () => window.removeEventListener(PROFILE_UPDATED_EVENT, read);
  }, [read]);

  return { isFree, plan, isLoading: isFree === null };
}
