import { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  children?: React.ReactNode;
  className?: string;
  errors?: boolean;
  helperText?: string;
}
