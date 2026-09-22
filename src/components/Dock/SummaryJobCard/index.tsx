'use client';

import { Progress } from '@/components/Progress';
import { useSummaryJob } from '@/contexts/SummaryJob';
import { cn } from '@/utils/cn';
import { AlertTriangle, ArrowUpRight, ChevronDown, Sparkles, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * Popup de canto do resumo em andamento: o usuário dispara a geração e continua
 * navegando, acompanhando o progresso por aqui.
 */
export function SummaryJobCard() {
  const { status, origin, progress, youtubeUrl, isTakingLonger, error, reset, hasUnseenResult } =
    useSummaryJob();
  const path = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isOnSummaryScreen = path === '/gerar-resumo';

  useEffect(() => {
    if (status === 'done' || status === 'error') setIsCollapsed(false);
  }, [status]);

  if (status === 'idle') return null;
  // na própria tela de resumo o estado já aparece em tela cheia
  if (isOnSummaryScreen) return null;

  if (isCollapsed)
    return (
      <button
        type="button"
        onClick={() => setIsCollapsed(false)}
        className="focus-ring pointer-events-auto flex items-center gap-2 rounded-full bg-brand py-2 pl-2 pr-4 text-white shadow-float transition-transform hover:scale-[1.03]"
      >
        <Progress value={progress} className="size-8" strokeWidth={5} showValue={false}>
          <Sparkles size={13} className="animate-pulse" />
        </Progress>
        <span className="text-xs font-semibold">{Math.round(progress)}%</span>
      </button>
    );

  return (
    <article
      className={cn(
        'pointer-events-auto w-[300px] animate-pop-in overflow-hidden rounded-2xl border bg-surface shadow-float',
        status === 'error' ? 'border-coral-500/30' : 'border-line'
      )}
      role="status"
    >
      <header className="flex items-center justify-between gap-2 border-b border-line px-4 py-2.5">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-subtle">
          {status === 'error' ? (
            <AlertTriangle size={13} className="text-coral-500" />
          ) : (
            <Sparkles size={13} className="text-purple-600" />
          )}
          {status === 'running'
            ? origin === 'queue'
              ? 'Fila de vídeos'
              : 'Gerando resumo'
            : status === 'done'
              ? 'Resumo pronto'
              : 'Falhou'}
        </p>

        <div className="flex items-center gap-1">
          {status === 'running' && (
            <button
              type="button"
              onClick={() => setIsCollapsed(true)}
              aria-label="Minimizar"
              className="focus-ring rounded-lg p-1 text-faint transition-colors hover:bg-canvas hover:text-ink"
            >
              <ChevronDown size={15} />
            </button>
          )}

          {status !== 'running' && (
            <button
              type="button"
              onClick={reset}
              aria-label="Fechar"
              className="focus-ring rounded-lg p-1 text-faint transition-colors hover:bg-canvas hover:text-ink"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </header>

      <div className="flex items-center gap-3 p-4">
        {status === 'running' ? (
          <Progress value={progress} className="size-14 shrink-0" strokeWidth={4} />
        ) : (
          <span
            className={cn(
              'flex size-12 shrink-0 items-center justify-center rounded-2xl',
              status === 'done' ? 'bg-mint-50 text-mint-700' : 'bg-coral-50 text-coral-700'
            )}
          >
            {status === 'done' ? <Sparkles size={20} /> : <AlertTriangle size={20} />}
          </span>
        )}

        <div className="min-w-0 flex-1 space-y-1">
          {status === 'running' && (
            <>
              <p className="text-sm font-semibold leading-tight">
                {isTakingLonger ? 'Quase lá, vídeo longo...' : 'Pode continuar navegando'}
              </p>
              <p className="truncate text-xs text-subtle">{youtubeUrl}</p>
            </>
          )}

          {status === 'done' && (
            <>
              <p className="text-sm font-semibold leading-tight">Seu material está pronto</p>
              <Link
                href="/gerar-resumo"
                className="inline-flex items-center gap-1 text-xs font-semibold text-purple-700 hover:underline"
              >
                Abrir resumo e questões
                <ArrowUpRight size={12} />
              </Link>
            </>
          )}

          {status === 'error' && (
            <>
              <p className="text-sm font-semibold leading-tight">Não deu certo</p>
              <p className="line-clamp-2 text-xs text-subtle">{error}</p>
            </>
          )}
        </div>
      </div>

      {status === 'done' && hasUnseenResult && (
        <div className="h-1 w-full bg-mint-500/70" aria-hidden />
      )}
    </article>
  );
}
