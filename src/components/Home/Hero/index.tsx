'use client';

import { CACHE_KEYS } from '@/constants/cache/cache-keys';
import { usePomodoro } from '@/contexts/Pomodoro';
import { useCachedQuery } from '@/hooks/useCachedQuery';
import { getSummaryFiles } from '@/service/summary/get-summary-files';
import { SummaryFile } from '@/types/SummaryFile';
import { getInformationItem } from '@/utils/informations/get-informations';
import { ArrowRight, BookMarked, Sparkles, Timer } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function HomeHero() {
  const [firstName, setFirstName] = useState('');
  const { completedFocus } = usePomodoro();
  const { data } = useCachedQuery<SummaryFile[]>(CACHE_KEYS.summaryFiles, getSummaryFiles, {
    staleTime: 60_000,
  });

  useEffect(() => {
    setFirstName(String(getInformationItem('firstname') || ''));
  }, []);

  const saved = data?.length ?? 0;

  return (
    <section className="relative overflow-hidden rounded-3xl bg-purple-900 px-6 py-10 text-white sm:px-10 sm:py-12">
      {/* brilho suave de fundo, sem roubar atenção do CTA */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-purple-500/40 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-10 size-64 rounded-full bg-sky-500/20 blur-3xl"
        aria-hidden
      />

      <div className="relative max-w-2xl space-y-4">
        <span className="chip bg-white/10 text-white/80">
          <Sparkles size={12} />
          {firstName ? `Olá, ${firstName}` : 'Bem-vindo ao Lectify'}
        </span>

        <h1 className="font-display text-display font-extrabold leading-[1.1]">
          Assista menos.
          <br />
          Aprenda mais.
        </h1>

        <p className="max-w-lg text-sm text-white/70 sm:text-base">
          Transforme uma aula inteira do YouTube em um resumo objetivo e em questões para testar o
          que você aprendeu — tudo na mesma tela, enquanto você continua estudando.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            href="/gerar-resumo"
            className="focus-ring inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-purple-800 transition-transform hover:-translate-y-0.5"
          >
            <Sparkles size={16} />
            Gerar um resumo
          </Link>

          <Link
            href="/meus-resumos"
            className="focus-ring inline-flex items-center gap-2 rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Ver minha biblioteca
            <ArrowRight size={15} />
          </Link>
        </div>

        <dl className="flex flex-wrap gap-6 pt-6">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-white/10">
              <BookMarked size={16} />
            </span>
            <div>
              <dt className="text-[11px] uppercase tracking-wide text-white/50">Na biblioteca</dt>
              <dd className="font-display text-lg font-extrabold leading-tight">{saved}</dd>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-white/10">
              <Timer size={16} />
            </span>
            <div>
              <dt className="text-[11px] uppercase tracking-wide text-white/50">Ciclos de foco</dt>
              <dd className="font-display text-lg font-extrabold leading-tight">{completedFocus}</dd>
            </div>
          </div>
        </dl>
      </div>
    </section>
  );
}
