import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ArrowLeft, Heart } from 'lucide-react';
import { PERSONALIZATION } from '../../config/personalization';
import { romanticAudio } from '../../utils/audioManager';

interface Scene05RelationshipProps {
  onNext: () => void;
  onPrev: () => void;
}

export const Scene05Relationship: React.FC<Scene05RelationshipProps> = ({ onNext, onPrev }) => {
  const { story } = PERSONALIZATION;

  return (
    <div className="relative min-h-[82vh] flex flex-col items-center justify-center px-3 py-6 select-none w-full max-w-[430px] mx-auto">
      {/* Header */}
      <div className="text-center w-full space-y-2 mb-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-romantic border border-rose-500/30 text-rose-200 text-[11px] font-serif tracking-widest uppercase"
        >
          <Sparkles className="w-3 h-3 text-champagne-300" />
          <span>Chapter 04 • Our Relationship Story</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-serif text-2xl font-bold bg-gradient-to-r from-rose-200 via-rose-100 to-champagne-200 bg-clip-text text-transparent text-glow-rose"
        >
          {story.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-cormorant italic text-sm text-rose-200/80 px-2"
        >
          "{story.subtitle}"
        </motion.p>
      </div>

      {/* Story Highlights Cards */}
      <div className="w-full space-y-4">
        {story.highlights.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="glass-romantic border border-rose-500/25 rounded-2xl p-4 text-left shadow-lg"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/40" />
              <h3 className="font-serif text-sm font-bold text-rose-100">
                {item.title}
              </h3>
            </div>
            <p className="font-cormorant italic text-xs text-rose-200/85 leading-relaxed pl-5">
              "{item.description}"
            </p>
          </motion.div>
        ))}
      </div>

      {/* Navigation */}
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
          className="flex-1 py-3.5 px-5 rounded-full bg-gradient-to-r from-rose-600 to-burgundy-700 active:scale-95 text-white font-serif text-sm tracking-wider shadow-xl transition-all flex items-center justify-center gap-2"
        >
          <span>{story.nextButtonText}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
