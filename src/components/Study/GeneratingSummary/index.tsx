'use client';

import { Progress } from '@/components/Progress';
import { ArrowRight, Minimize2 } from 'lucide-react';
import Link from 'next/link';
import { VideoPlayer } from '../VideoPlayer';

type GeneratingSummaryProps = {
  progress: number;
  youtubeUrl?: string;
  isTakingLonger: boolean;
};

export function GeneratingSummary({
  progress,
  youtubeUrl,
  isTakingLonger,
}: GeneratingSummaryProps) {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-6 py-2">
      <div className="card flex flex-col items-center gap-5 p-6 shadow-soft sm:flex-row sm:items-center">
        <Progress value={progress} className="size-24 shrink-0" strokeWidth={4} />

        <div className="space-y-1.5 text-center sm:text-left">
          <h1 className="font-display text-lg font-extrabold">
            {isTakingLonger ? 'Ainda processando...' : 'Gerando seu resumo'}
          </h1>

          <p className="subtitle max-w-md">
            {isTakingLonger
              ? 'Vídeos sem legenda precisam ter o áudio baixado e transcrito, o que leva mais tempo — seguimos tentando. Você pode sair desta tela: o aviso aparece no canto quando ficar pronto.'
              : 'O processamento é um de cada vez, então o tempo depende da fila e do vídeo. Não precisa esperar aqui parado: navegue pelo app que o progresso continua no canto da tela.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 sm:justify-start">
            <Link
              href="/caderno"
              className="focus-ring inline-flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-hover"
            >
              <Minimize2 size={13} />
              Anotar enquanto espero
            </Link>

            <Link
              href="/meus-resumos"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-subtle transition-colors hover:text-purple-700"
            >
              Ver meus resumos
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      <VideoPlayer url={youtubeUrl} title="Vídeo sendo resumido" />

      <p className="text-center text-xs text-faint">
        O resumo aparece aqui automaticamente quando ficar pronto — e fica disponível por 7 dias.
      </p>
    </section>
  );
}
