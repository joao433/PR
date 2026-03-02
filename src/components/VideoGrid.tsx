import { useState } from 'react';
import { Video } from '../types';
import VideoCard from './VideoCard';
import VideoModal from './VideoModal';

interface VideoGridProps {
  videos: Video[];
}

export default function VideoGrid({ videos }: VideoGridProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  return (
    <section className="max-w-7xl mx-auto px-6 pb-24">
      <div className="flex items-center justify-between mb-16">
        <h2 className="text-4xl font-serif font-semibold tracking-tight">Trabalhos</h2>
        <div className="h-px flex-1 bg-white/5 ml-12 hidden md:block" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onClick={setSelectedVideo}
          />
        ))}
      </div>

      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </section>
  );
}
