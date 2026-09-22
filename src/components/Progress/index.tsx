import { cn } from '@/utils/cn';

type ProgressProps = {
  /** 0 a 100 */
  value: number;
  className?: string;
  strokeWidth?: number;
  /** Conteúdo do centro — por padrão, a porcentagem. */
  children?: React.ReactNode;
  showValue?: boolean;
};

export function Progress({
  value,
  className,
  strokeWidth = 3,
  children,
  showValue = true,
}: ProgressProps) {
  const safe = Math.min(Math.max(value, 0), 100);

  return (
    <div className={cn('relative size-28', className)}>
      <svg className="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-purple-100"
          strokeWidth={strokeWidth}
        />
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-purple-600 transition-[stroke-dashoffset] duration-700 ease-out"
          strokeWidth={strokeWidth}
          strokeDasharray="100 100"
          pathLength={100}
          strokeDashoffset={100 - safe}
          strokeLinecap="round"
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        {children ?? (
          showValue && (
            <span className="font-display text-lg font-extrabold text-purple-700">
              {Math.round(safe)}%
            </span>
          )
        )}
      </div>
    </div>
  );
}
