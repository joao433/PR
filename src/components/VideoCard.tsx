import { motion } from 'motion/react';
import { Video } from '../types';

interface VideoCardProps {
  video: Video;
  onClick: (video: Video) => void;
  key?: string | number;
}

export default function VideoCard({ video, onClick }: VideoCardProps) {
  const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      onClick={() => onClick(video)}
      className="group cursor-pointer bg-card-bg rounded-2xl overflow-hidden shadow-xl transition-all duration-300 border border-white/5"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
            <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1" />
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-serif font-semibold mb-2 transition-colors duration-300">
          {video.title}
        </h3>
        <p className="text-text-secondary text-sm line-clamp-2 font-light tracking-wide">
          {video.description}
        </p>
      </div>
    </motion.div>
  );
}
