import { SUMMARY_SOURCE_INFO, SummarySource } from '@/constants/summary/summary-source';
import { cn } from '@/utils/cn';
import { Captions, Mic } from 'lucide-react';

const ICONS = { captions: Captions, audio: Mic };

type SourceBadgeProps = {
  source?: SummarySource;
  className?: string;
};

/**
 * Selo de origem do resumo. Origem desconhecida (`null`, de resumos anteriores
 * ao campo) não ganha selo — chutar entre legenda e áudio criaria a expectativa
 * errada, que é justamente o que este selo existe para evitar.
 */
export function SourceBadge({ source, className }: SourceBadgeProps) {
  if (!source || !(source in SUMMARY_SOURCE_INFO)) return null;

  const info = SUMMARY_SOURCE_INFO[source];
  const Icon = ICONS[source];

  return (
    <span className={cn('chip', info.className, className)} title={info.detail}>
      <Icon size={11} />
      {info.label}
    </span>
  );
}
