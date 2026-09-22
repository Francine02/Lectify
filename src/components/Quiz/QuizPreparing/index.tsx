import { ListChecks } from 'lucide-react';

export function QuizPreparing({ source }: { source?: string }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <div className="relative">
        <span className="absolute inset-0 animate-ping rounded-2xl bg-sky-100" />
        <span className="relative flex size-16 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
          <ListChecks size={28} />
        </span>
      </div>

      <div className="space-y-1">
        <h2 className="font-display text-lg font-extrabold">Preparando suas questões</h2>
        <p className="subtitle mx-auto max-w-sm">
          Estamos lendo o conteúdo e montando as alternativas. Leva alguns segundos.
        </p>
        {source && <p className="truncate text-xs text-faint">{source}</p>}
      </div>
    </div>
  );
}
