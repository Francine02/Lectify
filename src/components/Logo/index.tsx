import { cn } from '@/utils/cn';

export function Logo({ className }: { className?: string }) {
  return (
    <>
      <img className={cn('w-8 sm:w-10 ', className)} src="/assets/logo.png" alt="Logo" />
    </>
  );
}
