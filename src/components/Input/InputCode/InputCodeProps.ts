import { CheckCodeData } from 'app/(public)/cadastro/verificar-codigo/check-code-schema';
import { InputHTMLAttributes } from 'react';
import { UseFormRegister } from 'react-hook-form';

export interface InputCodeProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  children?: React.ReactNode;
  className?: string;
  errors?: boolean;
  helperText?: string;
  register: UseFormRegister<CheckCodeData>;
}
