import { getYoutubeId } from '@/utils/formatters/get-youtube-id';

export function VideoPlayer({ url, title = 'Vídeo do YouTube' }: { url?: string; title?: string }) {
  const videoId = getYoutubeId(url);

  if (!videoId) return null;

  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg border border-gray-200 bg-black">
      <iframe
        className="size-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
