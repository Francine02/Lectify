import { Error } from '@/components/Error';
import { ERROR_COLOR, NORMAL_COLOR } from '@/constants/form/form-colors';
import { CheckCodeFormInputs } from '@/schemas/code-schema';
import { cn } from '@/utils/cn';
import { InputCodeProps } from './InputCodeProps';

export function InputCode({
  label,
  id,
  errors,
  className,
  helperText,
  register,
  ...props
}: InputCodeProps) {
  const length = 6;
  type InputKey = keyof CheckCodeFormInputs;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-2 ">
        {label}
      </label>
      <div className="flex justify-around" data-hs-pin-input="">
        {Array.from({ length }).map((_, i) => {
          const fieldName = `input${i + 1}` as InputKey;
          return (
            <input
              key={i}
              id={`${id}-${i}`}
              {...register(fieldName)}
              defaultValue=""
              {...props}
              maxLength={1}
              type="tel"
              autoComplete="one-time-code"
              className={cn(
                'block size-12 text-center rounded-md sm:text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none',
                errors ? ERROR_COLOR : NORMAL_COLOR,
                className
              )}
              placeholder="⚬"
              data-hs-pin-input-item=""
            />
          );
        })}
      </div>
      {(errors || helperText) && (
        <Error text={helperText} className={errors ? 'text-red-600' : 'text-gray-500'} />
      )}
    </div>
  );
}
