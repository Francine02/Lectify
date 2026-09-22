import { PLANS } from '@/constants/plans/plans';
import { formatPrice } from '@/utils/formatters/format-price';
import { ArrowRight, Check, Lock } from 'lucide-react';
import Link from 'next/link';

type UpgradeNoticeProps = {
  title?: string;
  description?: string;
};

export function UpgradeNotice({
  title = 'Esse recurso é dos planos pagos',
  description = 'Escolha um plano para gerar resumos e questões. Você continua com acesso à sua conta e aos resumos já criados.',
}: UpgradeNoticeProps) {
  const cheapest = PLANS.reduce((lowest, plan) => (plan.price < lowest.price ? plan : lowest));

  return (
    <section className="mx-auto flex w-full max-w-lg flex-col items-center gap-5 py-10 text-center">
      <span className="flex size-16 items-center justify-center rounded-2xl bg-purple-50 text-purple-700">
        <Lock size={24} />
      </span>

      <div className="space-y-2">
        <h1 className="text-title font-extrabold">{title}</h1>
        <p className="subtitle">{description}</p>
      </div>

      <ul className="card w-full divide-y divide-line p-0 text-sm">
        {PLANS.map((plan) => (
          <li key={plan.id} className="flex items-center justify-between gap-3 px-5 py-3">
            <span className="flex items-center gap-2 font-semibold">
              <Check size={14} className="text-mint-500" strokeWidth={3} />
              {plan.name}
            </span>
            <span className="text-subtle">
              {plan.weeklyLimit} gerações / 7 dias · {formatPrice(plan.price)}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href="/planos"
        className="focus-ring inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-hover"
      >
        Ver planos
        <ArrowRight size={15} />
      </Link>
    </section>
  );
}
