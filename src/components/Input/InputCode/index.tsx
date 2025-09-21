import { InputProps } from '../InputRoot/InputProps';

export function InputCode({ label, id, ...props }: InputProps) {
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
            className="block size-12 text-center border-gray-200 rounded-md sm:text-sm
                       [&::-webkit-outer-spin-button]:appearance-none 
                       [&::-webkit-inner-spin-button]:appearance-none
                       focus:border-rose-600 focus:ring-rose-600
                       disabled:opacity-50 disabled:pointer-events-none"
            placeholder="⚬"
            data-hs-pin-input-item=""
          />
        ))}
      </div>
    </div>
  );
}
