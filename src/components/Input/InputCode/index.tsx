import { cn } from '@/utils/cn';
import { InputProps } from '../InputRoot/InputProps';
import { errorColor, normalColor } from '@/constants/form/form-colors';

export function InputCode({ label, id, errors, className, helperText, ...props }: InputProps) {
  const length = 6;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-2 ">
        {label}
      </label>
      <div className="flex justify-around" data-hs-pin-input="">
        {Array.from({ length }).map((_, i) => (
          <input
            key={i}
            id={`${id}-${i}`}
            {...props}
            maxLength={1}
            type="tel"
            autoComplete="one-time-code"
            className={cn(
              'block size-12 text-center rounded-md sm:text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none',
              errors ? errorColor : normalColor,
              className
            )}
            placeholder="⚬"
            data-hs-pin-input-item=""
          />
        ))}
      </div>
      {(errors || helperText) && (
        <p className={cn('text-sm mt-2', errors ? 'text-red-600' : 'text-gray-500')} id={id}>
          {helperText}
        </p>
      )}
    </div>
  );
}
