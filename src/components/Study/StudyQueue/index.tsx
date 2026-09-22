'use client';

import { summarySchema } from '@/app/(private)/gerar-resumo/summary-schema';
import { CACHE_KEYS } from '@/constants/cache/cache-keys';
import { SUMMARY_OUTPUT_FORMATS } from '@/constants/form/summary-output-formats';
import { SummaryFormat } from '@/contexts/SummaryJob';
import { QUEUE_MAX_ITEMS, QUEUE_SPACING_SECONDS, useStudyQueue } from '@/contexts/StudyQueue';
import { useCachedQuery } from '@/hooks/useCachedQuery';
import { getUsage } from '@/service/my-account/get-usage';
import { UsageData } from '@/types/UsageData';
import { cn } from '@/utils/cn';
import {
  AlertTriangle,
  BookOpen,
  Check,
  ListVideo,
  Loader2,
  Pause,
  Play,
  Plus,
  Timer,
  Trash2,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const STATUS_STYLES = {
  pending: 'bg-canvas text-subtle',
  running: 'bg-purple-50 text-purple-700',
  done: 'bg-mint-50 text-mint-700',
  error: 'bg-coral-50 text-coral-700',
};

const STATUS_LABEL = {
  pending: 'Na fila',
  running: 'Gerando',
  done: 'Pronto',
  error: 'Falhou',
};

const formatCountdown = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

/**
 * Fila de vídeos: cole vários links de uma vez e a geração acontece uma por vez,
 * bem espaçada, enquanto o usuário faz outra coisa.
 */
export function StudyQueue() {
  const { items, isPaused, waiting, isBlockedByResult, pending, add, remove, retry, clearFinished, setPaused } =
    useStudyQueue();

  const { data: usage } = useCachedQuery<UsageData>(CACHE_KEYS.usage, getUsage, {
    staleTime: 120_000,
  });

  const [draft, setDraft] = useState('');
  const [format, setFormat] = useState<SummaryFormat>(SUMMARY_OUTPUT_FORMATS[0]);
  const [feedback, setFeedback] = useState<string>();

  const remaining = usage?.features?.summarize?.find((entry) => entry.period === 'week')?.remaining;

  const handleAdd = () => {
    const urls = draft
      .split(/[\n,\s]+/)
      .map((url) => url.trim())
      .filter(Boolean);

    const valid = urls.filter(
      (url) => summarySchema.shape.youtube_url.safeParse(url).success
    );

    if (valid.length === 0) {
      setFeedback('Nenhum link válido do YouTube encontrado.');
      return;
    }

    const added = add(valid, format);

    setDraft('');
    setFeedback(
      added === 0
        ? `A fila está cheia (máximo de ${QUEUE_MAX_ITEMS}) ou os links já estão nela.`
        : `${added} ${added === 1 ? 'vídeo adicionado' : 'vídeos adicionados'} à fila.${
            urls.length > valid.length ? ` ${urls.length - valid.length} link(s) ignorado(s).` : ''
          }`
    );
  };

  const finished = items.filter((item) => item.status === 'done' || item.status === 'error').length;

  return (
    <section className="card space-y-4 p-5">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
            <ListVideo size={18} />
          </span>

          <div className="space-y-0.5">
            <h2 className="font-display text-base font-extrabold">Fila de vídeos</h2>
            <p className="text-sm text-subtle">
              Cole vários links e deixe rodando: um resumo por vez, a cada{' '}
              {QUEUE_SPACING_SECONDS / 60} minutos.
            </p>
          </div>
        </div>

        {items.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPaused(!isPaused)}
              className="focus-ring inline-flex items-center gap-1.5 rounded-xl border border-line px-3 py-2 text-xs font-semibold transition-colors hover:bg-canvas"
            >
              {isPaused ? <Play size={12} /> : <Pause size={12} />}
              {isPaused ? 'Retomar' : 'Pausar'}
            </button>

            {finished > 0 && (
              <button
                type="button"
                onClick={clearFinished}
                className="focus-ring inline-flex items-center gap-1.5 rounded-xl border border-line px-3 py-2 text-xs font-semibold text-subtle transition-colors hover:bg-canvas"
              >
                <Trash2 size={12} />
                Limpar prontos
              </button>
            )}
          </div>
        )}
      </header>

      <div className="space-y-2">
        <textarea
          value={draft}
          onChange={(event) => {
            setDraft(event.target.value);
            setFeedback(undefined);
          }}
          rows={2}
          placeholder="Cole um link por linha (ou vários de uma vez)"
          className="w-full resize-y rounded-xl border border-line bg-canvas p-3 text-sm outline-none transition-colors placeholder:text-faint focus:border-purple-400 focus:bg-surface"
        />

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex gap-1 rounded-xl bg-canvas p-1">
            {SUMMARY_OUTPUT_FORMATS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFormat(option)}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-xs font-semibold uppercase transition-colors',
                  format === option ? 'bg-surface text-purple-700 shadow-soft' : 'text-subtle'
                )}
              >
                {option}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={!draft.trim()}
            className="focus-ring inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:bg-line-strong"
          >
            <Plus size={13} />
            Adicionar à fila
          </button>
        </div>

        {feedback && <p className="text-xs text-subtle">{feedback}</p>}
      </div>

      {pending > 0 && typeof remaining === 'number' && remaining < pending && (
        <p className="flex items-start gap-2 rounded-xl bg-sun-50 px-4 py-3 text-xs text-sun-700">
          <AlertTriangle size={14} className="mt-0.5 shrink-0" />
          Você tem {remaining} {remaining === 1 ? 'geração restante' : 'gerações restantes'} nesta
          semana e {pending} na fila. O excedente vai falhar até o limite renovar.
        </p>
      )}

      {items.length > 0 && (
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-3 rounded-xl border border-line px-3 py-2.5"
            >
              <span className={cn('chip shrink-0', STATUS_STYLES[item.status])}>
                {item.status === 'running' && <Loader2 size={11} className="animate-spin" />}
                {item.status === 'done' && <Check size={11} />}
                {item.status === 'error' && <AlertTriangle size={11} />}
                {STATUS_LABEL[item.status]}
              </span>

              <span className="min-w-0 flex-1">
                <span className="block truncate text-xs font-medium">{item.url}</span>
                {item.error && (
                  <span className="block truncate text-[11px] text-coral-700">{item.error}</span>
                )}
              </span>

              <span className="flex shrink-0 items-center gap-1">
                {item.status === 'done' && item.fileId && (
                  <Link
                    href={`/meus-resumos/${item.fileId}`}
                    className="focus-ring inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-bold text-purple-700 transition-colors hover:bg-purple-50"
                  >
                    <BookOpen size={12} />
                    Ler
                  </Link>
                )}

                {item.status === 'error' && (
                  <button
                    type="button"
                    onClick={() => retry(item.id)}
                    className="focus-ring rounded-lg px-2 py-1 text-[11px] font-bold text-purple-700 transition-colors hover:bg-purple-50"
                  >
                    Tentar de novo
                  </button>
                )}

                {item.status !== 'running' && (
                  <button
                    type="button"
                    onClick={() => remove(item.id)}
                    aria-label="Remover da fila"
                    className="focus-ring rounded-lg p-1 text-faint transition-colors hover:text-coral-700"
                  >
                    <X size={13} />
                  </button>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}

      {items.length > 0 && (
        <p className="flex items-center gap-1.5 text-[11px] text-faint">
          <Timer size={12} />
          {isPaused
            ? 'Fila pausada.'
            : isBlockedByResult
              ? 'Feche o resumo aberto para a fila continuar.'
              : waiting > 0
              ? `Próximo vídeo em ${formatCountdown(waiting)} — o intervalo evita esbarrar no limite do plano.`
              : pending > 0
                ? 'Processando a fila em segundo plano.'
                : 'Fila concluída.'}{' '}
          As questões não são geradas automaticamente aqui, para poupar sua cota.
        </p>
      )}
    </section>
  );
}
