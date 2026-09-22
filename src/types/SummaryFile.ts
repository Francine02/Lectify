import { SummaryLanguage } from '@/constants/form/summary-languages';
import { SummarySource } from '@/constants/summary/summary-source';

export interface SummaryFile {
  id: string;
  filename: string;
  youtube_url: string;
  filetype: 'pdf' | 'md';
  /** O mesmo vídeo pode ter resumo em mais de um formato e idioma. */
  language: SummaryLanguage | string;
  /** 'captions' | 'audio' | null — null é resumo anterior ao campo. */
  source?: SummarySource;
  username: string;
  summary_at: string;
  /** Resumos são apagados 7 dias depois de gerados — igual para todos os planos. */
  expires_at: string;
}
