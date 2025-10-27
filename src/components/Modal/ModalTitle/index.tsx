import { cn } from '@/utils/cn';
import { ElementType } from 'react';

interface ModalTitleProps {
  icon?: ElementType;
  title: string;
  id: string;
  color: string;
}

export function ModalTitle({ title, icon: Icon, id, color }: ModalTitleProps) {
  return (
    <div className="flex justify-between items-center py-3 px-4 border-b border-gray-200">
      <h3 id={`hs-${id}-label`} className="font-bold text-gray-800 flex items-center gap-5">
        {Icon && <Icon className={cn(`text-2xl text-${color}-400`)} />} {title}
      </h3>
    </div>
  );
}
