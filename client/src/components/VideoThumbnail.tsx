import { Play } from "lucide-react";

interface VideoThumbnailProps {
  youtubeId: string;
  title: string;
  onClick: () => void;
}

export default function VideoThumbnail({ youtubeId, title, onClick }: VideoThumbnailProps) {
  return (
    <div
      className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group hover-elevate active-elevate-2"
      onClick={onClick}
      data-testid={`thumbnail-video-${youtubeId}`}
    >
      <img
        src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
        alt={title}
        className="w-full h-full object-cover transition-transform group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
          <Play className="h-8 w-8 text-primary ml-1" fill="currentColor" />
        </div>
      </div>
      {title && (
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
          <p className="text-white text-sm font-medium line-clamp-1" data-testid="text-video-title">{title}</p>
        </div>
      )}
    </div>
  );
}
