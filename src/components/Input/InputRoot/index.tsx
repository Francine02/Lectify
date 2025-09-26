import { errorColor, normalColor } from '@/constants/form/form-colors';
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
            errors ? errorColor : normalColor,
            className
          )}
        />
        {errors ? (
          <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
            <MdErrorOutline className="text-red-600" />
          </div>
        ) : (
          children
        )}
      </div>
      {(errors || helperText) && (
        <p
          className={cn(
            'text-xs md:text-sm mt-2 mb-2.5',
            errors ? 'text-red-600' : 'text-gray-500'
          )}
          id={id}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
