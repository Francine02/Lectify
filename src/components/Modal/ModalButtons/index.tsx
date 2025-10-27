'use client';
import { cn } from '@/utils/cn';

interface ModalButtonsProps {
  id: string;
  color: string;
  handleConfirm: () => void;
}

export function ModalButtons({ id, color, handleConfirm }: ModalButtonsProps) {
  return (
    <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-gray-200">
      <button
        type="button"
        className="cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
        data-hs-overlay={`#hs-${id}`}
      >
        Cancelar
      </button>
      <button
        type="button"
        onClick={handleConfirm}
        data-hs-overlay={`#hs-${id}`}
        className={cn(
          `cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-${color}-400 text-white hover:bg-${color}-700 focus:outline-hidden focus:bg-${color}-700 disabled:opacity-50 disabled:pointer-events-none`
        )}
      >
        Confirmar
      </button>
    </div>
  );
}
