import { cn } from '@/utils/cn';
import { AlertCircle } from 'lucide-react';
import { ErrorProps } from './ErrorProps';

export function Error({ text, className }: ErrorProps) {
  return (
    <p className={cn('flex items-center gap-1.5 text-xs text-coral-700', className)}>
      <AlertCircle size={13} className="shrink-0" />
      {text}
    </p>
  );
}
