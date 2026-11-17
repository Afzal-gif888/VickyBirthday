import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, ArrowRight, Train } from 'lucide-react';
import { PERSONALIZATION } from '../../config/personalization';
import { romanticAudio } from '../../utils/audioManager';

interface Scene01EntranceProps {
  onNext: () => void;
}

export const Scene01Entrance: React.FC<Scene01EntranceProps> = ({ onNext }) => {
  const [isOpening, setIsOpening] = useState<boolean>(false);
  const [cinematicStep, setCinematicStep] = useState<number>(0);
  const { entrance, herNickname } = PERSONALIZATION;
  const timerRefs = useRef<number[]>([]);

  // Attempt automatic playback immediately on mount
  useEffect(() => {
    romanticAudio.attemptAutoplay();

    return () => {
      timerRefs.current.forEach(t => clearTimeout(t));
    };
  }, []);

  const handleOpenSurprise = async () => {
    // 1. Immediately start Lover BGM on this very first tap
    try {
      await romanticAudio.startMusic();
    } catch (e) {
      console.warn('Playback gesture handle:', e);
    }
    romanticAudio.playSparkleSound();

    // 2. Start the opening cinematic animation
    setIsOpening(true);

    // Sequence cinematic progression
    const t1 = window.setTimeout(() => setCinematicStep(1), 600);
    const t2 = window.setTimeout(() => setCinematicStep(2), 1800);
    const t3 = window.setTimeout(() => setCinematicStep(3), 3200);

    // 3. Automatically begin the birthday experience (no second tap required)
    const t4 = window.setTimeout(() => {
      onNext();
    }, 5200);

    timerRefs.current = [t1, t2, t3, t4];
  };

  const handleSkipToBirthday = () => {
    timerRefs.current.forEach(t => clearTimeout(t));
    romanticAudio.startMusic();
    onNext();
  };

  return (
    <div className="relative min-h-[82vh] flex flex-col items-center justify-center px-4 py-6 text-center select-none overflow-hidden w-full max-w-[430px] mx-auto">
      {/* Background ambient radial glow */}
      <div className="absolute w-[320px] h-[320px] rounded-full bg-gradient-to-tr from-rose-600/30 via-purple-600/20 to-champagne-400/15 blur-[90px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isOpening ? (
          /* ========================================================= */
          /* STAGE 1: IMMEDIATE OPENING PRESENTATION (SEAMLESS ENTRY)   */
          /* ========================================================= */
          <motion.div
            key="pre-open"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04, filter: 'blur(6px)' }}
            transition={{ duration: 0.6 }}
            className="relative z-10 w-full flex flex-col items-center space-y-6"
          >
            {/* Celestial Train Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-romantic border border-amber-400/40 text-amber-200 shadow-md text-xs font-cormorant tracking-widest uppercase"
            >
              <Train className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>The Midnight Express • Dedicated to Bujji</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
            </motion.div>

            {/* Glowing Heart Crest */}
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-600 via-rose-500 to-burgundy-700 p-0.5 shadow-2xl flex items-center justify-center border border-amber-300/50"
            >
              <div className="w-full h-full rounded-full bg-[#12040b] flex items-center justify-center">
                <Heart className="w-9 h-9 text-rose-400 fill-rose-500/80 drop-shadow-md" />
              </div>
            </motion.div>

            {/* Title & Subtitle */}
            <div className="space-y-2 px-2">
              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-champagne-200 via-rose-100 to-amber-200 bg-clip-text text-transparent text-glow-rose drop-shadow-2xl">
                {entrance.greeting}
              </h1>
              <p className="font-cormorant italic text-lg sm:text-xl text-rose-200/90 leading-snug">
                "{entrance.tagline}"
              </p>
            </div>

            {/* Mobile First Touch CTA Button: Starts Lover BGM + Experience */}
            <div className="w-full max-w-[320px] pt-3 space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleOpenSurprise}
                className="group relative w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-full font-serif text-base font-bold tracking-wider text-white shadow-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-burgundy-700 border border-amber-300/60 overflow-hidden cursor-pointer"
              >
                {/* Subtle shine sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                <Train className="w-5 h-5 text-amber-200 animate-pulse" />
                <span className="relative z-10 text-rose-50 drop-shadow tracking-wider">
                  {entrance.ctaButtonText}
                </span>
                <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
              </motion.button>

              <p className="text-[11px] text-amber-300/80 font-cormorant italic tracking-wide">
                ♫ Background music starts with your tap ❤️
              </p>
            </div>
          </motion.div>
        ) : (
          /* ========================================================= */
          /* STAGE 2: OPENING CINEMATIC ANIMATION                      */
          /* ========================================================= */
          <motion.div
            key="cinematic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 w-full flex flex-col items-center space-y-6"
          >
            {/* Celestial Aura Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-romantic border border-amber-400/30 text-amber-200 text-xs font-mono tracking-widest uppercase"
            >
              <Train className="w-3 h-3 text-amber-300" />
              <span>Chapter 01 • The Midnight Train Journey</span>
            </motion.div>

            {/* Narrative Sequential Reveal */}
            <div className="min-h-[110px] flex flex-col items-center justify-center space-y-3 px-3">
              <AnimatePresence>
                {cinematicStep >= 1 && (
                  <motion.p
                    initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 1 }}
                    className="font-cormorant text-xl sm:text-2xl text-rose-200 font-light italic leading-snug"
                  >
                    "{entrance.line1}"
                  </motion.p>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {cinematicStep >= 2 && (
                  <motion.p
                    initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 1 }}
                    className="font-cormorant text-lg sm:text-xl text-rose-100 font-light italic leading-snug"
                  >
                    "{entrance.line2}"
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Hero Name Reveal "VICKY ❤️" */}
            <AnimatePresence>
              {cinematicStep >= 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.82, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="py-2 relative"
                >
                  <div className="absolute -inset-4 bg-gradient-to-r from-rose-500/25 via-amber-300/20 to-purple-500/25 rounded-full blur-2xl animate-pulse-glow" />

                  <h1 className="relative font-serif text-5xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-rose-200 via-rose-100 to-amber-200 bg-clip-text text-transparent text-glow-rose drop-shadow-2xl">
                    {entrance.revealName}
                  </h1>

                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="h-[1px] w-6 bg-amber-400/50" />
                    <span className="font-script text-2xl sm:text-3xl text-rose-300 text-glow-rose">
                      {herNickname}
                    </span>
                    <span className="h-[1px] w-6 bg-amber-400/50" />
                  </div>

                  <p className="mt-3 font-cormorant italic text-sm text-champagne-200/90">
                    "{entrance.subtext}"
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Continue Button / Auto-advancing Indicator */}
            <div className="pt-4 flex flex-col items-center gap-2">
              <button
                onClick={handleSkipToBirthday}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full glass-romantic border border-rose-400/30 text-rose-200 text-xs font-serif tracking-wider hover:text-white active:scale-95 transition-all cursor-pointer"
              >
                <span>Entering Your Birthday Celebration</span>
                <ArrowRight className="w-3.5 h-3.5 text-champagne-300 animate-pulse" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
