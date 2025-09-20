import { cn } from '@/utils/cn';
import { Loading } from '../Loading';
import { ButtonProps } from './ButtonProps';

export function Button({ children, loading, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-vine-600 text-white hover:brightness-70 focus:outline-hidden focus:bg-gray-400 disabled:bg-gray-400 disabled:pointer-events-none cursor-pointer',
        className
      )}
      {...props}
    >
      {loading ? <Loading /> : children}
    </button>
  );
}
