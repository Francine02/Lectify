import { SUMMARY_LANGUAGES } from '@/constants/form/summary-languages';
import { SUMMARY_OUTPUT_FORMATS } from '@/constants/form/summary-output-formats';
import z from 'zod';

export const summarySchema = z.object({
  youtube_url: z
    .string()
    .trim()
    .min(34, 'URL inválida')
    .max(200, 'URL excede o comprimento máximo')
    .regex(
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|.+\?v=)?([^&]+)/,
      'URL inválida!'
    ),
  output_format: z.enum(SUMMARY_OUTPUT_FORMATS),
  /**
   * A URL vai normalizada para a API (`normalizeYoutubeUrl`), que prepende
   * `https://` e grava assim — sem isso a busca na biblioteca não acha o arquivo.
   */
  language_select: z.enum(SUMMARY_LANGUAGES),
});

export type SummaryData = z.infer<typeof summarySchema>;
