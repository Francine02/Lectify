'use client';

import { useAccountPlan } from '@/hooks/useAccountPlan';
import { cn } from '@/utils/cn';
import { getInformationItem } from '@/utils/informations/get-informations';
import { daysUntil } from '@/utils/plans/days-until';
import { subscriptionAlert } from '@/utils/plans/renewal';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const DISMISS_KEY = 'lectify:renewal-reminder-dismissed';

/** Lembrete de renovação: aparece perto do vencimento e some ao ser fechado. */
export function RenewalReminder() {
  const { isFree, plan } = useAccountPlan();
  const [subscriptionEnd, setSubscriptionEnd] = useState<string | null>(null);
  const [isDismissed, setIsDismissed] = useState(true);

  useEffect(() => {
    setSubscriptionEnd(String(getInformationItem('subscription_end')) || null);

    try {
      setIsDismissed(sessionStorage.getItem(DISMISS_KEY) === 'true');
    } catch {
      setIsDismissed(false);
    }
  }, [plan, isFree]);

  const alert = subscriptionAlert(subscriptionEnd);
  const remaining = daysUntil(subscriptionEnd);

  if (isFree !== false || isDismissed) return null;
  if (alert !== 'expiring' && alert !== 'expired') return null;

  const dismiss = () => {
    setIsDismissed(true);

    try {
      sessionStorage.setItem(DISMISS_KEY, 'true');
    } catch {
      // sem sessionStorage o lembrete simplesmente volta no próximo carregamento
    }
  };

  return (
    <div
      className={cn(
        'mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm',
        alert === 'expired' ? 'bg-coral-50 text-coral-700' : 'bg-sun-50 text-sun-700'
      )}
      role="status"
    >
      <p>
        {alert === 'expired'
          ? 'Sua assinatura venceu — renove para voltar a gerar resumos e questões.'
          : `Sua assinatura vence em ${remaining} dia${remaining === 1 ? '' : 's'}.`}
      </p>

      <div className="flex items-center gap-3">
        <Link href="/planos" className="font-bold underline underline-offset-2">
          Renovar
        </Link>

        <button
          type="button"
          onClick={dismiss}
          aria-label="Fechar lembrete"
          className="cursor-pointer opacity-60 transition-opacity hover:opacity-100"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
