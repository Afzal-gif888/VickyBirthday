import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowLeft } from 'lucide-react';
import { PERSONALIZATION } from '../../config/personalization';
import { romanticAudio } from '../../utils/audioManager';

interface Scene08QuestionProps {
  onNext: () => void;
  onPrev: () => void;
}

export const Scene08Question: React.FC<Scene08QuestionProps> = ({ onNext, onPrev }) => {
  const { questionPreamble } = PERSONALIZATION;
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 800);
    const t2 = setTimeout(() => setStep(2), 2200);
    const t3 = setTimeout(() => setStep(3), 3800);
    const t4 = setTimeout(() => setStep(4), 5000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div className="relative min-h-[82vh] flex flex-col items-center justify-center px-4 py-8 text-center select-none overflow-hidden w-full max-w-[430px] mx-auto">
      {/* Luxury Burgundy Dark Atmosphere Glow */}
      <div className="absolute w-[320px] h-[320px] rounded-full bg-gradient-to-tr from-burgundy-900/50 via-rose-700/25 to-champagne-500/10 blur-[80px] pointer-events-none" />

      {/* Floating 3D Rose Petals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, 350], x: [0, 30], rotate: [0, 180] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute left-[15%] -top-8 text-2xl text-rose-500/30"
        >
          🌹
        </motion.div>
        <motion.div
          animate={{ y: [0, 380], x: [0, -30], rotate: [0, -180] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear', delay: 2 }}
          className="absolute right-[20%] -top-8 text-xl text-rose-400/20"
        >
          🌸
        </motion.div>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center space-y-6">
        {/* Pulsing Rose Heart Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="w-14 h-14 rounded-full glass-burgundy border border-rose-500/30 flex items-center justify-center shadow-xl shadow-rose-900/50"
        >
          <Heart className="w-7 h-7 text-rose-400 fill-rose-500/40 animate-pulse" />
        </motion.div>

        {/* Cinematic Dramatic Dialogue */}
        <div className="space-y-4 min-h-[140px] flex flex-col items-center justify-center px-2">
          <AnimatePresence>
            {step >= 1 && (
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="font-serif text-4xl font-bold text-rose-100 text-glow-rose tracking-tight"
              >
                {questionPreamble.line1}
              </motion.h2>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {step >= 2 && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="font-cormorant italic text-xl text-rose-200/90 font-light"
              >
                "{questionPreamble.line2}"
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {step >= 3 && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="font-cormorant italic text-base text-champagne-200/90 font-light tracking-wide"
              >
                "{questionPreamble.line3}"
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Transition Buttons */}
        <AnimatePresence>
          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="pt-2 w-full flex items-center justify-between gap-3"
            >
              <button
                onClick={() => {
                  romanticAudio.playSparkleSound();
                  onPrev();
                }}
                className="px-4 py-3.5 rounded-full glass-romantic border border-rose-500/30 text-rose-200 text-xs font-serif flex items-center gap-1 active:scale-95"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                onClick={() => {
                  romanticAudio.playSparkleSound();
                  onNext();
                }}
                className="flex-1 py-4 px-6 rounded-full font-serif text-base font-semibold tracking-wider text-white shadow-2xl active:scale-95 transition-all bg-gradient-to-r from-rose-600 via-rose-500 to-burgundy-700 border border-champagne-300/40 flex items-center justify-center gap-2"
              >
                <span>{questionPreamble.nextButtonText}</span>
                <Heart className="w-4 h-4 text-rose-200 fill-rose-200 animate-bounce" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
