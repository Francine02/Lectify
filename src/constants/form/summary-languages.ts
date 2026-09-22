/** Idiomas aceitos por `language_select` em /summarize e /check_summarize. */
export const SUMMARY_LANGUAGES = ['pt-BR', 'en-US'] as const;

export type SummaryLanguage = (typeof SUMMARY_LANGUAGES)[number];

export const SUMMARY_LANGUAGE_LABELS: Record<SummaryLanguage, string> = {
  'pt-BR': 'Português',
  'en-US': 'Inglês',
};

export const DEFAULT_SUMMARY_LANGUAGE: SummaryLanguage = 'pt-BR';
