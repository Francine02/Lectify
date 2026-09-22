import { QuizAnswer, QuizQuestion } from '@/types/QuizQuestion';
import { cn } from '@/utils/cn';
import { Check, RotateCcw, Sparkles, X } from 'lucide-react';

type QuizResultProps = {
  questions: QuizQuestion[];
  answers: QuizAnswer[];
  onRestart: () => void;
  onNewQuiz: () => void;
};

const feedback = (percentage: number) => {
  if (percentage === 100) return 'Gabaritou! Conteúdo dominado. 🎉';
  if (percentage >= 60) return 'Bom resultado — revise os pontos que escaparam.';
  return 'Vale reler o material e tentar de novo.';
};

export function QuizResult({ questions, answers, onRestart, onNewQuiz }: QuizResultProps) {
  const correct = answers.filter((answer) => answer.isCorrect).length;
  // questões cuja resposta correta não bate com nenhuma alternativa ficam fora
  // da nota — não dá para dizer se o usuário acertou
  const total = questions.filter((question) =>
    question.options.includes(question.correctAnswer)
  ).length;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <section className="w-full space-y-6">
      <div className="flex flex-col items-center gap-1.5 rounded-2xl bg-purple-900 p-8 text-center text-white">
        <p className="text-xs font-bold uppercase tracking-wide text-white/60">Você acertou</p>

        <p className="font-display text-5xl font-extrabold">
          {correct}
          <span className="text-2xl font-bold text-white/50">/{total}</span>
        </p>

        <p className="text-sm text-white/75">{feedback(percentage)}</p>
      </div>

      <div className="space-y-3">
        <h2 className="font-display text-lg font-extrabold">Revisão</h2>

        {questions.map((question) => {
          const answer = answers.find((item) => item.questionId === question.id);
          const isCorrect = !!answer?.isCorrect;

          return (
            <article
              key={question.id}
              className={cn(
                'space-y-2 rounded-2xl border p-4',
                isCorrect ? 'border-mint-100 bg-mint-50/50' : 'border-coral-100 bg-coral-50/50'
              )}
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md text-white',
                    isCorrect ? 'bg-mint-500' : 'bg-coral-500'
                  )}
                >
                  {isCorrect ? <Check size={11} strokeWidth={3} /> : <X size={11} strokeWidth={3} />}
                </span>
                <p className="text-sm font-semibold">{question.question}</p>
              </div>

              {!isCorrect && (
                <p className="pl-8 text-xs text-subtle">
                  Sua resposta: <span className="font-semibold">{answer?.selected ?? '-'}</span>
                </p>
              )}

              <p className="pl-8 text-xs text-subtle">
                Resposta correta: <span className="font-semibold">{question.correctAnswer}</span>
              </p>

              {question.explanation && (
                <p className="pl-8 text-xs italic text-faint">{question.explanation}</p>
              )}
            </article>
          );
        })}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={onRestart}
          className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-hover"
        >
          <RotateCcw size={14} />
          Refazer questões
        </button>

        <button
          type="button"
          onClick={onNewQuiz}
          className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl border border-line px-6 py-3 text-sm font-bold text-purple-700 transition-colors hover:bg-purple-50"
        >
          <Sparkles size={14} />
          Gerar novas questões
        </button>
      </div>
    </section>
  );
}
