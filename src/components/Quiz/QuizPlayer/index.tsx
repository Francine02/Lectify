'use client';

import { QuizAnswer, QuizQuestion } from '@/types/QuizQuestion';
import { cn } from '@/utils/cn';
import { Lightbulb } from 'lucide-react';
import { useState } from 'react';
import { QuizOption } from '../QuizOption';
import { QuizProgress } from '../QuizProgress';
import { QuizResult } from '../QuizResult';

type QuizPlayerProps = {
  questions: QuizQuestion[];
  source?: string;
  onNewQuiz: () => void;
};

const difficultyColors: Record<string, string> = {
  fácil: 'bg-mint-50 text-mint-700',
  facil: 'bg-mint-50 text-mint-700',
  média: 'bg-sun-50 text-sun-700',
  media: 'bg-sun-50 text-sun-700',
  difícil: 'bg-coral-50 text-coral-700',
  dificil: 'bg-coral-50 text-coral-700',
};

export function QuizPlayer({ questions, source, onNewQuiz }: QuizPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const question = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  /** Se a API mandar uma resposta que não bate com nenhuma alternativa, não
   *  acusamos erro — mostramos a justificativa e deixamos o usuário julgar. */
  const isVerifiable = question.options.includes(question.correctAnswer);
  const isRight = isVerifiable && selected === question.correctAnswer;

  const restart = () => {
    setCurrentIndex(0);
    setSelected(null);
    setIsRevealed(false);
    setShowHint(false);
    setAnswers([]);
    setIsFinished(false);
  };

  const confirm = () => {
    if (!selected) return;

    setAnswers((previous) => [
      ...previous,
      {
        questionId: question.id,
        selected,
        isCorrect: isRight,
      },
    ]);
    setIsRevealed(true);
  };

  const next = () => {
    if (isLast) {
      setIsFinished(true);
      return;
    }

    setCurrentIndex((previous) => previous + 1);
    setSelected(null);
    setIsRevealed(false);
    setShowHint(false);
  };

  if (isFinished)
    return (
      <QuizResult
        questions={questions}
        answers={answers}
        onRestart={restart}
        onNewQuiz={onNewQuiz}
      />
    );

  const difficultyStyle =
    difficultyColors[question.difficulty?.toLowerCase()] ?? 'bg-canvas text-subtle';

  return (
    <section className="card w-full space-y-5 p-5 sm:p-6">
      <QuizProgress current={currentIndex + 1} total={questions.length} />

      {source && (
        <p className="truncate text-xs text-faint">
          Questões geradas a partir de <span className="font-semibold">{source}</span>
        </p>
      )}

      <div className="space-y-3">
        {question.difficulty && (
          <span className={cn('chip uppercase tracking-wide', difficultyStyle)}>
            {question.difficulty}
          </span>
        )}

        <h2 className="font-display text-lg font-extrabold leading-snug">{question.question}</h2>
      </div>

      <div className="space-y-2.5">
        {question.options.map((option, index) => (
          <QuizOption
            key={`${question.id}-${index}`}
            option={option}
            index={index}
            isSelected={selected === option}
            isCorrect={option === question.correctAnswer}
            isRevealed={isRevealed}
            onSelect={() => setSelected(option)}
          />
        ))}
      </div>

      {question.hint && !isRevealed && (
        <div>
          {showHint ? (
            <p className="flex items-start gap-2 rounded-xl bg-sun-50 p-4 text-sm text-sun-700">
              <Lightbulb size={15} className="mt-0.5 shrink-0" />
              {question.hint}
            </p>
          ) : (
            <button
              type="button"
              onClick={() => setShowHint(true)}
              className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-subtle transition-colors hover:text-purple-700"
            >
              <Lightbulb size={14} />
              Ver dica
            </button>
          )}
        </div>
      )}

      {isRevealed && (question.explanation || !isVerifiable) && (
        <div
          className={cn(
            'space-y-1 rounded-xl p-4 text-sm',
            !isVerifiable
              ? 'bg-sun-50 text-sun-700'
              : isRight
                ? 'bg-mint-50 text-mint-700'
                : 'bg-coral-50 text-coral-700'
          )}
        >
          <p className="font-bold">
            {!isVerifiable
              ? 'Confira pela justificativa'
              : isRight
                ? 'Resposta correta!'
                : 'Resposta incorreta'}
          </p>
          <p className="opacity-90">
            {question.explanation ||
              'Não conseguimos identificar automaticamente qual alternativa a API marcou como correta.'}
          </p>
        </div>
      )}

      {isRevealed ? (
        <button
          type="button"
          onClick={next}
          className="focus-ring w-full rounded-xl bg-brand px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-hover"
        >
          {isLast ? 'Ver resultado' : 'Próxima questão'}
        </button>
      ) : (
        <button
          type="button"
          onClick={confirm}
          disabled={!selected}
          className={cn(
            'focus-ring w-full rounded-xl px-4 py-3 text-sm font-bold transition-colors',
            selected
              ? 'bg-brand text-white hover:bg-brand-hover'
              : 'cursor-not-allowed bg-canvas text-faint'
          )}
        >
          Confirmar resposta
        </button>
      )}
    </section>
  );
}
