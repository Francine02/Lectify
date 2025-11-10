import z from 'zod';

export const urlSchema = z.object({
  youtube_url: z
    .string()
    .trim()
    .min(34, 'URL inválida')
    .max(200, 'URL excede o comprimento máximo')
    .regex(
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|.+\?v=)?([^&]+)/,
      'URL inválida!'
    ),
  output_format: z.string(),
});

export type UrlData = z.infer<typeof urlSchema>;
