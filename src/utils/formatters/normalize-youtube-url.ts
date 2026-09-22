/**
 * A API prepende `https://` a uma URL sem esquema e guarda a versão normalizada.
 * Se o cliente não fizer o mesmo, a busca em `/summarize/files` — que casa por
 * `youtube_url` — não encontra o arquivo que acabou de ser gerado.
 */
export const normalizeYoutubeUrl = (url: string) => {
  const trimmed = (url ?? '').trim();

  if (!trimmed) return trimmed;

  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
};
