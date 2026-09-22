'use client';

import { QuizListItem } from '@/types/QuizQuestion';
import { cn } from '@/utils/cn';
import { formatSummaryDate } from '@/utils/formatters/format-summary-date';
import { summaryExpiration } from '@/utils/summary/expiration';
import { BookOpen, Clock3, FileText, ListChecks, Upload } from 'lucide-react';
import Link from 'next/link';

const expirationStyles = {
  expired: 'bg-coral-50 text-coral-700',
  soon: 'bg-sun-50 text-sun-700',
  ok: 'bg-canvas text-subtle',
};

/**
 * Quiz salvo. Abrir usa `GET /questions/{id}`, que tem contador próprio e
 * folgado — nada aqui gasta cota de geração.
 */
export function QuizCard({ quiz }: { quiz: QuizListItem }) {
  const expiration = summaryExpiration(quiz.expires_at);
  const isStandalone = !quiz.file_id;

  return (
    <article className="card card-hover flex flex-col gap-3 p-4">
      <div className="flex items-start justify-between gap-2">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
          <ListChecks size={18} />
        </span>

        <span className={cn('chip', expirationStyles[expiration.state])}>
          <Clock3 size={11} />
          {expiration.label || 'Disponível por 7 dias'}
        </span>
      </div>

      <div className="space-y-1">
        <h2 className="line-clamp-2 text-sm font-bold leading-snug" title={quiz.title}>
          <Link
            href={`/meus-quizzes/${quiz.id}`}
            className="transition-colors hover:text-purple-700"
          >
            {quiz.title}
          </Link>
        </h2>

        <p className="text-xs text-faint">Gerado em {formatSummaryDate(quiz.created_at)}</p>
      </div>

      <p className="flex items-center gap-1.5 text-xs text-subtle">
        {isStandalone ? (
          <>
            <Upload size={12} className="shrink-0 text-faint" />
            Arquivo enviado por você
          </>
        ) : (
          <>
            <FileText size={12} className="shrink-0 text-purple-600" />
            Gerado de um resumo da biblioteca
          </>
        )}
      </p>

      <div className="mt-auto flex items-center gap-2 pt-1">
        <Link
          href={`/meus-quizzes/${quiz.id}`}
          className="focus-ring inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-brand px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-hover"
        >
          <ListChecks size={13} />
          Responder
        </Link>

        {quiz.file_id && (
          <Link
            href={`/meus-resumos/${quiz.file_id}`}
            className="focus-ring inline-flex items-center justify-center gap-1.5 rounded-xl border border-line px-3 py-2 text-xs font-semibold text-purple-700 transition-colors hover:bg-purple-50"
          >
            <BookOpen size={13} />
            Resumo
          </Link>
        )}
      </div>
    </article>
  );
}
