import VideoThumbnail from '../VideoThumbnail';

export default function VideoThumbnailExample() {
  return (
    <div className="p-4 max-w-md">
      <VideoThumbnail
        youtubeId="dQw4w9WgXcQ"
        title="Recorrido Virtual - Nave Industrial 2,500 m²"
        onClick={() => console.log('Video thumbnail clicked')}
      />
    </div>
  );
}
