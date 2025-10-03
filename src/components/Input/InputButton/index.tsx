import { InputButtonProps } from './InputButtonProps';

export function InputButton({ children, ...props }: InputButtonProps) {
  return (
    <button
      {...props}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer"
    >
      {children}
    </button>
  );
}
