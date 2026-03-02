import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Video } from '../types';

interface VideoModalProps {
  video: Video | null;
  onClose: () => void;
}

export default function VideoModal({ video, onClose }: VideoModalProps) {
  return (
    <AnimatePresence>
      {video && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-5xl bg-card-bg rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=0&rel=0&modestbranding=1`}
                title={video.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>

            <div className="p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">{video.title}</h2>
              <p className="text-text-secondary text-lg leading-relaxed font-light tracking-wide">
                {video.description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
