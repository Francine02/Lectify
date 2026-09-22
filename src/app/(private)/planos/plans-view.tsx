'use client';

import { CurrentPlanBanner } from '@/components/Plans/CurrentPlanBanner';
import { PlanCard } from '@/components/Plans/PlanCard';
import { PLAN_FAQ } from '@/constants/plans/plan-faq';
import { PLANS } from '@/constants/plans/plans';
import { useAccountPlan } from '@/hooks/useAccountPlan';
import { createCheckout } from '@/service/checkout/create-checkout';
import { PlanId } from '@/types/Plan';
import { getInformationItem } from '@/utils/informations/get-informations';
import { planAvailability } from '@/utils/plans/plan-availability';
import { BadgeCheck, Clock3, ListChecks, ShieldCheck } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

const CHECKOUT_FEEDBACK: Record<string, () => void> = {
  sucesso: () => toast.success('Pagamento aprovado! Seu plano já está ativo.'),
  pendente: () => toast.info('Pagamento pendente. Assim que for aprovado, seu plano é liberado.'),
  falha: () => toast.error('O pagamento não foi concluído. Você pode tentar novamente.'),
};

const HIGHLIGHTS = [
  { icon: ListChecks, text: 'Resumo e questões na mesma geração' },
  { icon: Clock3, text: 'Material disponível por 7 dias, com download livre' },
  { icon: ShieldCheck, text: 'Pagamento único pelo Mercado Pago, sem recorrência' },
];

export function PlansView() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');

  const { isFree, plan: currentPlan } = useAccountPlan();
  const [subscriptionEnd, setSubscriptionEnd] = useState<string | null>(null);
  const [loadingPlan, setLoadingPlan] = useState<PlanId | null>(null);

  const feedbackShown = useRef(false);

  useEffect(() => {
    setSubscriptionEnd(String(getInformationItem('subscription_end')) || null);
  }, [currentPlan]);

  useEffect(() => {
    if (!status || feedbackShown.current) return;

    feedbackShown.current = true;
    CHECKOUT_FEEDBACK[status]?.();
  }, [status]);

  const handleSubscribe = async (planId: PlanId) => {
    setLoadingPlan(planId);

    const response = await createCheckout(planId);

    if (!response.success || !response.data?.checkout_url) {
      setLoadingPlan(null);
      toast.error(response.error?.message ?? 'Não foi possível abrir o checkout.');
      return;
    }

    window.location.href = response.data.checkout_url;
  };

  return (
    <section className="space-y-8">
      <header className="mx-auto max-w-2xl space-y-3 text-center">
        <span className="chip mx-auto bg-purple-50 text-purple-700">
          <BadgeCheck size={12} />
          Todos os recursos em todos os planos
        </span>

        <h1 className="text-title font-extrabold">Escolha o ritmo do seu estudo</h1>
        <p className="subtitle mx-auto max-w-xl">
          O que muda de um plano para o outro é quantas gerações você tem a cada 7 dias — e quanto
          você economiza por mês.
        </p>
      </header>

      {isFree === false && currentPlan && (
        <CurrentPlanBanner planId={currentPlan} subscriptionEnd={subscriptionEnd} />
      )}

      <div className="grid gap-5 lg:grid-cols-3">
        {PLANS.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            availability={planAvailability({
              plan,
              currentPlanId: currentPlan,
              subscriptionEnd,
              isFree: isFree !== false,
            })}
            isLoading={loadingPlan === plan.id}
            isBusy={loadingPlan !== null && loadingPlan !== plan.id}
            onSubscribe={() => handleSubscribe(plan.id)}
          />
        ))}
      </div>

      <ul className="grid gap-3 sm:grid-cols-3">
        {HIGHLIGHTS.map(({ icon: Icon, text }) => (
          <li key={text} className="card flex items-center gap-3 p-4 text-sm text-subtle">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
              <Icon size={16} />
            </span>
            {text}
          </li>
        ))}
      </ul>

      <section className="space-y-3">
        <h2 className="font-display text-lg font-extrabold">Perguntas frequentes</h2>

        <div className="grid gap-3 sm:grid-cols-2">
          {PLAN_FAQ.map((item) => (
            <article key={item.question} className="card space-y-1.5 p-5">
              <h3 className="text-sm font-bold">{item.question}</h3>
              <p className="text-xs leading-relaxed text-subtle">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
