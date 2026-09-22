'use client';

import { CACHE_KEYS } from '@/constants/cache/cache-keys';
import { PROFILE_UPDATED_EVENT } from '@/constants/storage/storage-keys';
import { prefetchQuery } from '@/hooks/useCachedQuery';
import { getProfile } from '@/service/my-account/get-profile';
import { getQuizzes } from '@/service/quiz/get-quizzes';
import { getUsage } from '@/service/my-account/get-usage';
import { getSummaryFiles } from '@/service/summary/get-summary-files';
import { saveInformationsInStorage } from '@/utils/storage/save-informations-storage';
import { useEffect } from 'react';

/**
 * Mantém os dados de perfil do cookie em dia com o backend (plano, validade,
 * imagem) e, quando o navegador fica ocioso, adianta as listas que o usuário
 * costuma abrir em seguida — assim a biblioteca já nasce pintada.
 */
export function ProfileSync() {
  useEffect(() => {
    let active = true;

    getProfile().then((response) => {
      if (!active || !response.success || !response.data) return;

      saveInformationsInStorage({
        ...response.data,
        plan: response.data.plan ?? null,
        subscription_end: response.data.subscription_end ?? null,
      });

      window.dispatchEvent(new Event(PROFILE_UPDATED_EVENT));
    });

    const warmUp = () => {
      if (!active) return;

      prefetchQuery(CACHE_KEYS.summaryFiles, getSummaryFiles);
      prefetchQuery(CACHE_KEYS.quizzes, getQuizzes);
      // além de pintar o painel, é a leitura que realimenta os limites por
      // minuto do guarda de ritmo
      prefetchQuery(CACHE_KEYS.usage, getUsage);
    };

    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(warmUp, { timeout: 2500 })
      : window.setTimeout(warmUp, 1200);

    return () => {
      active = false;

      if (window.cancelIdleCallback) window.cancelIdleCallback(idle as number);
      else window.clearTimeout(idle as number);
    };
  }, []);

  return null;
}
