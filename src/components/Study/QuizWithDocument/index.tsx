'use client';

import { QuizPlayer } from '@/components/Quiz/QuizPlayer';
import { QuizQuestion } from '@/types/QuizQuestion';
import { cn } from '@/utils/cn';
import { BookOpen, X, Zap } from 'lucide-react';
import { useState } from 'react';
import { SummaryPanel } from '../SummaryPanel';

type QuizWithDocumentProps = {
  questions: QuizQuestion[];
  source?: string;
  document?: {
    url: string;
    blob: Blob;
    format: 'pdf' | 'md';
  };
  /** Questões vindas do cache do backend: reabrir não custou cota. */
  fromCache?: boolean;
  onNewQuiz: () => void;
  extraAction?: React.ReactNode;
};

/**
 * Quiz com o material de origem ao lado, para consultar sem perder as respostas.
 * Em telas menores o documento abre acima das questões.
 */
export function QuizWithDocument({
  questions,
  source,
  document,
  fromCache,
  onNewQuiz,
  extraAction,
}: QuizWithDocumentProps) {
  const [isDocumentOpen, setIsDocumentOpen] = useState(false);

  const canShowDocument = !!document;
  const showDocument = canShowDocument && isDocumentOpen;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {canShowDocument && (
            <button
              type="button"
              onClick={() => setIsDocumentOpen((previous) => !previous)}
              className={cn(
                'focus-ring inline-flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors',
                showDocument
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-line bg-surface text-subtle hover:bg-canvas'
              )}
            >
              {showDocument ? <X size={12} /> : <BookOpen size={13} />}
              {showDocument ? 'Ocultar material' : 'Consultar material'}
            </button>
          )}

          {fromCache && (
            <span className="chip bg-mint-50 text-mint-700" title="Sem consumo de cota">
              <Zap size={11} />
              Sem gastar cota
            </span>
          )}
        </div>

        {extraAction}
      </div>

      <div className={cn('grid gap-6', showDocument && 'lg:grid-cols-2')}>
        {showDocument && document && (
          <aside className="order-first lg:sticky lg:top-20 lg:self-start">
            <p className="mb-2 text-xs font-semibold text-subtle">
              Material de origem{source ? ` · ${source}` : ''}
            </p>
            <SummaryPanel url={document.url} blob={document.blob} format={document.format} />
          </aside>
        )}

        <div className="min-w-0">
          <QuizPlayer
            questions={questions}
            source={showDocument ? undefined : source}
            onNewQuiz={onNewQuiz}
          />
        </div>
      </div>
    </div>
  );
}
