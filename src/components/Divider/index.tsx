import { cn } from '@/utils/cn';

export function Divider({ text, className }: { className?: string; text: string }) {
  return (
    <div
      className={cn(
        'py-4 flex items-center text-sm text-gray-800 before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6',
        className
      )}
    >
      {text}
    </div>
  );
}
