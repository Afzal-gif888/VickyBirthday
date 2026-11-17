import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ArrowLeft, Train } from 'lucide-react';
import { PERSONALIZATION } from '../../config/personalization';
import { romanticAudio } from '../../utils/audioManager';

interface Scene04FriendshipToLoveProps {
  onNext: () => void;
  onPrev: () => void;
}

export const Scene04FriendshipToLove: React.FC<Scene04FriendshipToLoveProps> = ({ onNext, onPrev }) => {
  const { friendshipToLove } = PERSONALIZATION;

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

            {/* Photo with Perfect Portrait Framing */}
            <div className="aspect-[3/3.8] sm:aspect-[3/4] w-full rounded-2xl overflow-hidden bg-rose-950/30 border border-rose-400/20 relative shadow-md">
              <img
                src={ch.photoUrl}
                alt={ch.title}
                className={`w-full h-full object-cover ${ch.objectPosition || 'object-top'}`}
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-burgundy-950/80 to-transparent pointer-events-none" />
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
    </div>
  );
};
