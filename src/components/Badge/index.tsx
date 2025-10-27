import { cn } from '@/utils/cn';

type BadgeProps = {
  text: 'premium' | 'normal';
};

export function Badge({ text }: BadgeProps) {
  const planColors: { [key: string]: string } = {
    premium: 'bg-purple-200 text-purple-700',
    normal: 'bg-blue-200 text-blue-700',
  };

  const planText = text === 'premium' ? 'premium' : 'gratuito';
  return (
    <p
      className={cn(
        'w-fit mx-auto px-2.5 rounded-lg py-1.5 text-xs font-semibold mb-5',
        planColors[text]
      )}
    >
      {planText.toUpperCase()}
    </p>
  );
}
