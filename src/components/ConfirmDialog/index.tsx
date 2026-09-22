'use client';

import { Loading } from '@/components/Loading';
import { cn } from '@/utils/cn';
import { AlertTriangle, X } from 'lucide-react';
import { useEffect } from 'react';

type ConfirmDialogProps = {
  isOpen: boolean;
  title: string;
  description: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: 'danger' | 'default';
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

/** Diálogo de confirmação próprio — sem depender do JS do Preline. */
export function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  tone = 'danger',
  isLoading,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCancel();
    };

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[90] flex items-end justify-center p-4 sm:items-center"
    >
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
        onClick={onCancel}
        aria-hidden
      />

      <div className="relative w-full max-w-md animate-pop-in rounded-2xl border border-line bg-surface p-5 shadow-float">
        <div className="mb-3 flex items-start gap-3">
          <span
            className={cn(
              'flex size-10 shrink-0 items-center justify-center rounded-xl',
              tone === 'danger' ? 'bg-coral-50 text-coral-700' : 'bg-purple-50 text-purple-700'
            )}
          >
            <AlertTriangle size={18} />
          </span>

          <div className="min-w-0 flex-1">
            <h2 className="font-display text-base font-extrabold">{title}</h2>
            <div className="mt-1 text-sm text-subtle">{description}</div>
          </div>

          <button
            type="button"
            onClick={onCancel}
            aria-label="Fechar"
            className="focus-ring rounded-lg p-1 text-faint transition-colors hover:bg-canvas hover:text-ink"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mt-5 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="focus-ring rounded-xl border border-line px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-canvas"
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={cn(
              'focus-ring inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-colors disabled:opacity-70',
              tone === 'danger'
                ? 'bg-coral-500 hover:bg-coral-700'
                : 'bg-brand hover:bg-brand-hover'
            )}
          >
            {isLoading && <Loading className="size-4" />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
