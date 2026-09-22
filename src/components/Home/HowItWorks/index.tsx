import { HOME_STEPS } from '@/constants/home/steps';

export function HowItWorks() {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="font-display text-lg font-extrabold">Como funciona</h2>
        <p className="subtitle">Três passos, do link ao material pronto.</p>
      </div>

      <ol className="grid gap-3 sm:grid-cols-3">
        {HOME_STEPS.map((step, index) => (
          <li key={step.title} className="card relative space-y-2 p-5">
            <span className="flex size-8 items-center justify-center rounded-xl bg-brand font-display text-sm font-extrabold text-white">
              {index + 1}
            </span>

            <h3 className="text-sm font-bold">{step.title}</h3>
            <p className="text-xs leading-relaxed text-subtle">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
