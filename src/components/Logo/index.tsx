import { cn } from '@/utils/cn';
import Link from 'next/link';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/">
      <img
        className={cn('w-10 hover:brightness-95', className)}
        src="/assets/logo.png"
        alt="Logo"
      />
    </Link>
  );
}
