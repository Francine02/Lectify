import { cn } from '@/utils/cn';
import { InputProps } from './InputProps';

export function InputRoot({ label, id, children, className, ...props }: InputProps) {
  return (
    <div className="w-auto">
      <label htmlFor={id} className="block text-sm font-medium mb-2 ">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          {...props}
          className={cn(
            'py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-rose-600 focus:ring-rose-600 disabled:opacity-50 disabled:pointer-events-none ',
            className
          )}
        />
        {children}
      </div>
    </div>
  );
}
