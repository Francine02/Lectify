import { ERROR_COLOR, NORMAL_COLOR } from '@/constants/form/form-colors';
import { cn } from '@/utils/cn';
import { MdErrorOutline } from 'react-icons/md';
import { InputProps } from './InputProps';

export function InputRoot({
  label,
  id,
  children,
  className,
  errors,
  helperText,
  ...props
}: InputProps) {
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
            'py-2.5 sm:py-3 px-4 pr-8 block w-full rounded-lg sm:text-sm disabled:opacity-50 disabled:pointer-events-none',
            errors ? ERROR_COLOR : NORMAL_COLOR,
            className
          )}
        />
        {children}
      </div>
      {(errors || helperText) && (
        <p
          className={cn(
            'text-xs md:text-sm mt-2 mb-2.5 flex items-center gap-1',
            errors ? 'text-red-600' : 'text-gray-500'
          )}
          id={id}
        >
          {errors && <MdErrorOutline className={cn(errors ? 'text-red-600' : 'text-gray-500')} />}
          {helperText}
        </p>
      )}
    </div>
  );
}
