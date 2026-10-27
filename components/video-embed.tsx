import { parseVideoUrl } from "@/lib/video";

export function VideoEmbed({ url, title }: { url: string; title: string }) {
  const video = parseVideoUrl(url);
  if (!video) {
    return (
      <p className="rounded-2xl bg-white p-4 text-sm text-[#1e2a36]">
        Videon osoite ei kelpaa.
      </p>
    );
  }

  return (
    <div className="aspect-video overflow-hidden rounded-2xl bg-black shadow-md">
      <iframe
        src={video.embedUrl}
        title={title}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
