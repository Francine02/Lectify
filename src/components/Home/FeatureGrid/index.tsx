'use client';

import { HOME_FEATURES } from '@/constants/home/features';
import { useTour } from '@/contexts/Tour';
import { cn } from '@/utils/cn';
import { HelpCircle } from 'lucide-react';
import Link from 'next/link';

const ACCENTS = {
  purple: 'bg-purple-50 text-purple-700',
  sky: 'bg-sky-50 text-sky-700',
  mint: 'bg-mint-50 text-mint-700',
  sun: 'bg-sun-50 text-sun-700',
};

export function FeatureGrid() {
  const { open } = useTour();

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="font-display text-lg font-extrabold">O que dá para fazer aqui</h2>
        <p className="subtitle">
          Clique no <HelpCircle size={13} className="inline align-[-2px]" /> de cada card para ver o
          recurso funcionando.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {HOME_FEATURES.map(({ icon: Icon, ...feature }) => {
          const content = (
            <>
              <span
                className={cn(
                  'flex size-10 shrink-0 items-center justify-center rounded-xl',
                  ACCENTS[feature.accent]
                )}
              >
                <Icon size={18} />
              </span>

              <span className="space-y-1 pr-6">
                <span className="block text-sm font-bold">{feature.title}</span>
                <span className="block text-xs leading-relaxed text-subtle">
                  {feature.description}
                </span>
              </span>
            </>
          );

          return (
            <div key={feature.title} className="relative">
              {feature.link ? (
                <Link href={feature.link} className="card card-hover flex h-full gap-3 p-5">
                  {content}
                </Link>
              ) : (
                <article className="card flex h-full gap-3 p-5">{content}</article>
              )}

              <button
                type="button"
                onClick={() => open(feature.tourId)}
                aria-label={`Como funciona: ${feature.title}`}
                className="focus-ring absolute right-3 top-3 rounded-lg p-1.5 text-faint transition-colors hover:bg-purple-50 hover:text-purple-700"
              >
                <HelpCircle size={15} />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
