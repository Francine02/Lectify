import { cn } from '@/utils/cn';

export function Loading({ className }: { className?: string }) {
  return (
    <span className="inline-flex" role="status" aria-label="carregando">
      <svg
        className={cn('size-6 shrink-0 animate-spin text-purple-700', className)}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2.5" />
        <path
          d="M21 12a9 9 0 0 0-9-9"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="sr-only">Carregando...</span>
    </span>
  );
}
