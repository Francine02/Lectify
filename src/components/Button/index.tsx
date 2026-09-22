import { cn } from '@/utils/cn';
import { Loading } from '../Loading';
import { ButtonProps } from './ButtonProps';

export function Button({ children, isLoading, className, ...props }: ButtonProps) {
  return (
    <button
      aria-busy={isLoading}
      disabled={isLoading || props.disabled}
      className={cn(
        'focus-ring inline-flex w-full items-center justify-center gap-x-2 rounded-xl px-4 py-3 text-sm font-bold text-white transition-colors',
        isLoading || props.disabled
          ? 'cursor-not-allowed bg-line-strong text-white/80'
          : 'cursor-pointer bg-brand hover:bg-brand-hover',
        className
      )}
      {...props}
    >
      {isLoading ? <Loading className="size-5 text-current" /> : children}
    </button>
  );
}
