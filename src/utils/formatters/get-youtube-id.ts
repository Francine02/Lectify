/** Extrai o id do vídeo de uma URL do YouTube (watch, youtu.be, embed, shorts). */
export const getYoutubeId = (url?: string) => {
  if (!url) return null;

  const patterns = [
    /[?&]v=([\w-]{11})/,
    /youtu\.be\/([\w-]{11})/,
    /\/embed\/([\w-]{11})/,
    /\/shorts\/([\w-]{11})/,
  ];

  for (const pattern of patterns) {
    const found = url.match(pattern);
    if (found) return found[1];
  }

  return null;
};
