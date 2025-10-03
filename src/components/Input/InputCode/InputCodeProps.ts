import { InputHTMLAttributes } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { CheckCodeFormInputs } from 'schemas/code-schema';

export interface InputCodeProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  children?: React.ReactNode;
  className?: string;
  errors?: boolean;
  helperText?: string;
  register: UseFormRegister<CheckCodeFormInputs>;
}
