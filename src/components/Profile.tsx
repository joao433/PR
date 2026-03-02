import { useState } from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { ProfileData } from '../types';

interface ProfileProps {
  data: ProfileData;
}

export default function Profile({ data }: ProfileProps) {
  const [imageError, setImageError] = useState(false);
  
  const initials = data.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <section className="flex flex-col items-center text-center py-20 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-8"
      >
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-card-bg shadow-2xl bg-card-bg flex items-center justify-center">
          {!imageError ? (
            <img
              src={data.photoUrl} 
              alt={data.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              loading="eager"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-[#1A1A1A] flex items-center justify-center text-3xl md:text-4xl font-bold text-text-secondary tracking-widest select-none">
              {initials}
            </div>
          )}
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-5xl md:text-7xl font-serif font-semibold mb-6 tracking-tight"
      >
        {data.name}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-text-secondary text-lg md:text-xl max-w-2xl mb-12 leading-relaxed font-light tracking-wide"
      >
        {data.description}
      </motion.p>

      {data.showWhatsapp && (
        <motion.a
          href={`https://wa.me/${data.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 bg-white text-black px-10 py-4 rounded-full font-semibold text-lg transition-all hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          <MessageCircle size={24} />
          Falar no WhatsApp
        </motion.a>
      )}
    </section>
  );
}
