import { useState } from 'react';
import VideoModal from '../VideoModal';
import { Button } from '@/components/ui/button';

export default function VideoModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4">
      <Button onClick={() => setIsOpen(true)} data-testid="button-open-modal">
        Open Video Modal
      </Button>
      <VideoModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        youtubeId="dQw4w9WgXcQ"
        title="Demo Video"
      />
    </div>
  );
}
