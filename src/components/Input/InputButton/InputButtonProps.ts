import { ButtonHTMLAttributes } from 'react';

export interface InputButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
