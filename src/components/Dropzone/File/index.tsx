import { FileText, X } from 'lucide-react';
import { FileProps } from './FileProps';

export function File({ text, onDelete }: FileProps) {
  return (
    <div className="flex w-full items-center gap-3 rounded-2xl border border-line bg-canvas p-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
        <FileText size={18} />
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{text}</p>
        <p className="text-xs text-subtle">Pronto para gerar as questões</p>
      </div>

      <button
        type="button"
        onClick={onDelete}
        className="focus-ring cursor-pointer rounded-lg p-1.5 text-faint transition-colors hover:bg-coral-50 hover:text-coral-700"
        aria-label="Remover arquivo"
      >
        <X size={16} />
      </button>
    </div>
  );
}
