import { cn } from '@/utils/cn';
import { ErrorProps } from './ErrorProps';
import { MdErrorOutline } from 'react-icons/md';

export function Error({ text, className }: ErrorProps) {
  return (
    <div className={cn('text-xs md:text-sm mt-2 mb-2.5 flex items-center gap-2', className)}>
      <MdErrorOutline className="text-red-600" />
      <p className="text-red-600">{text}</p>
    </div>
  );
}
