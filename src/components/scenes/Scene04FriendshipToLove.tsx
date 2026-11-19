import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ArrowLeft, Train, X, Heart, ZoomIn } from 'lucide-react';
import { PERSONALIZATION } from '../../config/personalization';
import { romanticAudio } from '../../utils/audioManager';

interface Scene04FriendshipToLoveProps {
  onNext: () => void;
  onPrev: () => void;
}

export const Scene04FriendshipToLove: React.FC<Scene04FriendshipToLoveProps> = ({ onNext, onPrev }) => {
  const { friendshipToLove } = PERSONALIZATION;
  const [activePhoto, setActivePhoto] = useState<{
    url: string;
    title: string;
    quote: string;
    badge: string;
  } | null>(null);

  return (
    <div className="relative min-h-[82vh] flex flex-col items-center justify-center px-3 py-6 select-none w-full max-w-[430px] mx-auto">
      {/* Header */}
      <div className="text-center w-full space-y-2 mb-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-romantic border border-amber-400/30 text-amber-200 text-[11px] font-serif tracking-widest uppercase"
        >
          <Train className="w-3.5 h-3.5 text-amber-300" />
          <span>Chapter 03 • From Friends to Forever</span>
          <Sparkles className="w-3 h-3 text-amber-300" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-serif text-2xl font-bold bg-gradient-to-r from-rose-200 via-rose-100 to-amber-200 bg-clip-text text-transparent text-glow-rose"
        >
          {friendshipToLove.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-cormorant italic text-sm text-rose-200/80 px-2"
        >
          "{friendshipToLove.subtitle}"
        </motion.p>
      </div>

      {/* The 5 Sequential Love Story Chapters */}
      <div className="w-full space-y-7">
        {friendshipToLove.chapters.map((ch, idx) => (
          <motion.div
            key={ch.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="glass-burgundy border border-rose-500/30 rounded-3xl p-4 shadow-xl space-y-3 relative overflow-hidden"
          >
            {/* Chapter Badge */}
            <div className="flex items-center justify-between border-b border-rose-500/20 pb-2">
              <span className="text-[11px] font-mono text-amber-300 uppercase tracking-wider flex items-center gap-1">
                <Train className="w-3 h-3 text-amber-400" />
                <span>{ch.badge}</span>
              </span>
              <span className="font-serif text-xs font-semibold text-rose-200">
                {ch.title}
              </span>
            </div>

            {/* Photo with Perfect Portrait Framing & Tap-to-Zoom */}
            <div
              onClick={() => {
                romanticAudio.playSparkleSound();
                setActivePhoto({
                  url: ch.photoUrl,
                  title: ch.title,
                  quote: ch.quote,
                  badge: ch.badge,
                });
              }}
              className="aspect-[3/3.8] sm:aspect-[3/4] w-full rounded-2xl overflow-hidden bg-rose-950/30 border border-rose-400/20 relative shadow-md cursor-pointer group active:scale-[0.98] transition-transform"
            >
              <img
                src={ch.photoUrl}
                alt={ch.title}
                className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${ch.objectPosition || 'object-top'}`}
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-burgundy-950/80 to-transparent pointer-events-none" />
              <div className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/60 border border-amber-300/40 text-amber-200 opacity-80 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px] font-mono">
                <ZoomIn className="w-3 h-3 text-amber-300" />
                <span>Zoom</span>
              </div>
            </div>

            {/* Narrative Quote */}
            <p className="font-cormorant italic text-base sm:text-lg text-rose-100 leading-relaxed text-center px-1">
              "{ch.quote}"
            </p>
          </motion.div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 mb-4 w-full flex items-center justify-between gap-3">
        <button
          onClick={() => {
            romanticAudio.playSparkleSound();
            onPrev();
          }}
          className="px-4 py-3 rounded-full glass-romantic border border-rose-500/30 text-rose-200 text-xs font-serif flex items-center gap-1 active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <button
          onClick={() => {
            romanticAudio.playSparkleSound();
            onNext();
          }}
          className="flex-1 py-3.5 px-5 rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-burgundy-700 active:scale-95 text-white font-serif text-sm tracking-wider shadow-xl transition-all flex items-center justify-center gap-2 border border-champagne-300/40"
        >
          <span>{friendshipToLove.nextButtonText}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Romantic Photo Lightbox Zoom Modal */}
      <AnimatePresence>
        {activePhoto && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 select-none"
            onClick={() => setActivePhoto(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[390px] glass-burgundy border-2 border-amber-300/70 rounded-3xl p-3 sm:p-4 text-center space-y-3 shadow-2xl overflow-hidden"
            >
              {/* Close button */}
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 border border-amber-400/40 text-amber-200 hover:text-white"
                aria-label="Close photo"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-left border-b border-rose-500/20 pb-2 pr-10">
                <span className="text-[10px] font-mono text-amber-300 uppercase tracking-widest block">
                  {activePhoto.badge}
                </span>
                <h3 className="font-serif text-sm font-bold text-white">
                  {activePhoto.title}
                </h3>
              </div>

              {/* Full Zoomed Image */}
              <div className="w-full aspect-[3/3.8] sm:aspect-[3/4] rounded-2xl overflow-hidden border border-amber-300/40 shadow-inner bg-black">
                <img
                  src={activePhoto.url}
                  alt={activePhoto.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Romantic Quote */}
              <p className="font-cormorant italic text-sm sm:text-base text-rose-100 px-2 leading-relaxed">
                "{activePhoto.quote}"
              </p>

              <div className="pt-1 flex items-center justify-center gap-1.5 text-[10px] font-mono text-amber-300/80">
                <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                <span>Captured Forever in Bava's Heart</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
