import { cn } from '@/utils/cn';
import { Loading } from '../Loading';
import { ButtonProps } from './ButtonProps';

export function Button({ children, loading, className, ...props }: ButtonProps) {
  return (
    <button
      aria-busy={loading}
      disabled={loading || props.disabled}
      className={cn(
        'w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-white transition',
        loading || props.disabled
          ? 'bg-gray-400 focus:bg-gray-400 cursor-not-allowed opacity-70'
          : 'bg-rose-700 hover:brightness-95 focus:brightness-110 cursor-pointer focus:outline-hidden',
        className
      )}
      {...props}
    >
      {loading ? <Loading /> : children}
    </button>
  );
}
