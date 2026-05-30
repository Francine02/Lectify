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
});

export type SummaryData = z.infer<typeof summarySchema>;
