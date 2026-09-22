import { cn } from '@/utils/cn';
import { Check, X } from 'lucide-react';

type QuizOptionProps = {
  option: string;
  index: number;
  isSelected: boolean;
  isCorrect: boolean;
  isRevealed: boolean;
  onSelect: () => void;
};

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

export function QuizOption({
  option,
  index,
  isSelected,
  isCorrect,
  isRevealed,
  onSelect,
}: QuizOptionProps) {
  const showAsCorrect = isRevealed && isCorrect;
  const showAsWrong = isRevealed && isSelected && !isCorrect;

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={isRevealed}
      aria-pressed={isSelected}
      className={cn(
        'focus-ring flex w-full items-center gap-3 rounded-xl border p-4 text-left text-sm transition-all duration-200',
        !isRevealed && 'cursor-pointer hover:border-purple-400 hover:bg-purple-50',
        isSelected && !isRevealed && 'border-purple-500 bg-purple-50',
        !isSelected && !isRevealed && 'border-line bg-surface',
        showAsCorrect && 'border-mint-500 bg-mint-50',
        showAsWrong && 'border-coral-500 bg-coral-50',
        isRevealed && !showAsCorrect && !showAsWrong && 'border-line bg-surface opacity-55'
      )}
    >
      <span
        className={cn(
          'flex size-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors',
          isSelected && !isRevealed && 'bg-brand text-white',
          !isSelected && !isRevealed && 'bg-canvas text-subtle',
          showAsCorrect && 'bg-mint-500 text-white',
          showAsWrong && 'bg-coral-500 text-white',
          isRevealed && !showAsCorrect && !showAsWrong && 'bg-canvas text-faint'
        )}
      >
        {showAsCorrect ? (
          <Check size={13} strokeWidth={3} />
        ) : showAsWrong ? (
          <X size={13} strokeWidth={3} />
        ) : (
          LETTERS[index]
        )}
      </span>

      <span className="flex-1 leading-relaxed">{option}</span>
    </button>
  );
}
