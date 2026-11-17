import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, ArrowLeft, Train } from 'lucide-react';
import { PERSONALIZATION } from '../../config/personalization';
import { romanticAudio } from '../../utils/audioManager';
import { TrainTransitionOverlay } from '../ui/TrainTransitionOverlay';

interface Scene02BirthdayProps {
  onNext: () => void;
  onPrev: () => void;
}

export const Scene02Birthday: React.FC<Scene02BirthdayProps> = ({ onNext, onPrev }) => {
  const [candlesBlown, setCandlesBlown] = useState<boolean>(false);
  const [wishMade, setWishMade] = useState<boolean>(false);
  const [showTrainTransition, setShowTrainTransition] = useState<boolean>(false);
  const { birthday } = PERSONALIZATION;

  const triggerConfettiExplosion = () => {
    const count = 180;
    const defaults = { origin: { y: 0.7 }, zIndex: 9999 };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55, colors: ['#f43f5e', '#ffd700', '#ffffff'] });
    fire(0.2, { spread: 60, colors: ['#ec4899', '#fbcfe8', '#e11d48'] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#ffe4e6', '#ffd700', '#fb7185'] });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2, colors: ['#ffd700', '#fff', '#f43f5e'] });
  };

  const handleBlowCandles = () => {
    if (candlesBlown) return;
    setCandlesBlown(true);
    romanticAudio.playCandleBlowSound();
    triggerConfettiExplosion();

    setTimeout(() => {
      setWishMade(true);
    }, 700);
  };

  return (
    <div className="relative min-h-[82vh] flex flex-col items-center justify-center px-3 py-4 select-none overflow-hidden text-center w-full max-w-[430px] mx-auto">
      {/* Floating balloons in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [-10, -35, -10], x: [-5, 8, -5] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[6%] top-[8%] text-3xl opacity-70 filter drop-shadow-lg"
        >
          🎈
        </motion.div>
        <motion.div
          animate={{ y: [10, -25, 10], x: [8, -8, 8] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute right-[8%] top-[12%] text-3xl opacity-70 filter drop-shadow-lg"
        >
          💖
        </motion.div>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center space-y-4">
        {/* Date Ribbon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full glass-romantic border border-amber-400/30 text-amber-200 text-xs font-serif tracking-widest uppercase shadow-md mx-auto"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
          <span>{birthday.subheading}</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
        </motion.div>

        {/* Main Birthday Header */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-serif text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-200 via-rose-100 to-amber-200 bg-clip-text text-transparent text-glow-rose drop-shadow-xl"
        >
          {birthday.heading}
        </motion.h2>

        <p className="font-cormorant italic text-base sm:text-lg text-rose-200/90 max-w-xs mx-auto">
          For the most enchanting girl in the entire universe — Vicky (My Bujji).
        </p>

        {/* Interactive Birthday Cake (Strictly Centered Always) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative my-2 cursor-pointer group flex flex-col items-center justify-center w-full mx-auto"
          onClick={handleBlowCandles}
          title="Tap to blow out candles!"
        >
          <div className="absolute -inset-4 bg-gradient-to-t from-rose-600/30 via-amber-400/20 to-transparent rounded-full blur-xl pointer-events-none" />

          {/* SVG Multi-Tier Birthday Cake (Dead-Center w-56 h-56 mx-auto) */}
          <div className="relative w-56 h-56 mx-auto flex items-center justify-center">
            <svg viewBox="0 0 300 300" className="w-full h-full filter drop-shadow-2xl">
              <ellipse cx="150" cy="275" rx="100" ry="12" fill="#3e0a16" stroke="#c4933d" strokeWidth="2" />
              <path d="M125,275 L175,275 L165,290 L135,290 Z" fill="#26060e" stroke="#c4933d" strokeWidth="1" />
              <ellipse cx="150" cy="290" rx="45" ry="6" fill="#c4933d" />

              {/* Bottom Tier */}
              <path d="M60,200 C60,200 60,260 60,260 C60,270 240,270 240,260 L240,200 Z" fill="url(#cakeBaseGrad)" stroke="#fda4af" strokeWidth="1.5" />
              <ellipse cx="150" cy="200" rx="90" ry="22" fill="#5a0f21" stroke="#fda4af" strokeWidth="1.5" />
              <path d="M60,215 Q105,235 150,215 Q195,235 240,215" fill="none" stroke="#fbcfe8" strokeWidth="4" strokeLinecap="round" />

              {/* Middle Tier */}
              <path d="M85,145 C85,145 85,195 85,195 C85,203 215,203 215,195 L215,145 Z" fill="url(#cakeMidGrad)" stroke="#fda4af" strokeWidth="1.5" />
              <ellipse cx="150" cy="145" rx="65" ry="18" fill="#7a142c" stroke="#fda4af" strokeWidth="1.5" />
              <path d="M85,155 Q117,172 150,155 Q183,172 215,155" fill="none" stroke="#ffe4e6" strokeWidth="3.5" strokeLinecap="round" />

              {/* Top Tier */}
              <path d="M105,100 C105,100 105,140 105,140 C105,147 195,147 195,140 L195,100 Z" fill="url(#cakeTopGrad)" stroke="#fda4af" strokeWidth="1.5" />
              <ellipse cx="150" cy="100" rx="45" ry="14" fill="#9f1239" stroke="#fda4af" strokeWidth="1.5" />

              {/* Strawberries on Top */}
              <circle cx="120" cy="98" r="6" fill="#e11d48" stroke="#ffe4e6" strokeWidth="1" />
              <circle cx="150" cy="104" r="7" fill="#e11d48" stroke="#ffe4e6" strokeWidth="1" />
              <circle cx="180" cy="98" r="6" fill="#e11d48" stroke="#ffe4e6" strokeWidth="1" />

              {/* Candles */}
              <rect x="126" y="55" width="6" height="38" rx="2" fill="url(#candleGrad)" stroke="#fda4af" strokeWidth="0.8" />
              <line x1="129" y1="55" x2="129" y2="47" stroke="#333" strokeWidth="1.5" />
              <rect x="147" y="45" width="6" height="48" rx="2" fill="url(#candleGrad)" stroke="#ffd700" strokeWidth="0.8" />
              <line x1="150" y1="45" x2="150" y2="37" stroke="#333" strokeWidth="1.5" />
              <rect x="168" y="55" width="6" height="38" rx="2" fill="url(#candleGrad)" stroke="#fda4af" strokeWidth="0.8" />
              <line x1="171" y1="55" x2="171" y2="47" stroke="#333" strokeWidth="1.5" />

              <defs>
                <linearGradient id="cakeBaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3e0a16" />
                  <stop offset="50%" stopColor="#5a0f21" />
                  <stop offset="100%" stopColor="#26060e" />
                </linearGradient>
                <linearGradient id="cakeMidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#5a0f21" />
                  <stop offset="50%" stopColor="#7a142c" />
                  <stop offset="100%" stopColor="#3e0a16" />
                </linearGradient>
                <linearGradient id="cakeTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7a142c" />
                  <stop offset="50%" stopColor="#9f1239" />
                  <stop offset="100%" stopColor="#5a0f21" />
                </linearGradient>
                <linearGradient id="candleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fff1f2" />
                  <stop offset="50%" stopColor="#fbcfe8" />
                  <stop offset="100%" stopColor="#fda4af" />
                </linearGradient>
                <radialGradient id="flameGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="25%" stopColor="#fff3b0" />
                  <stop offset="60%" stopColor="#ff9f1c" />
                  <stop offset="100%" stopColor="#e71d36" />
                </radialGradient>
              </defs>

              {!candlesBlown ? (
                <g className="animate-flicker origin-bottom">
                  <ellipse cx="129" cy="40" rx="5" ry="9" fill="url(#flameGrad)" />
                  <ellipse cx="150" cy="30" rx="6" ry="11" fill="url(#flameGrad)" />
                  <ellipse cx="171" cy="40" rx="5" ry="9" fill="url(#flameGrad)" />
                </g>
              ) : (
                <g opacity="0.6">
                  <path d="M129,45 Q125,35 131,25" fill="none" stroke="#ddd" strokeWidth="1.5" strokeDasharray="3,3" />
                  <path d="M150,35 Q145,22 153,12" fill="none" stroke="#ddd" strokeWidth="1.5" strokeDasharray="3,3" />
                  <path d="M171,45 Q175,35 168,25" fill="none" stroke="#ddd" strokeWidth="1.5" strokeDasharray="3,3" />
                </g>
              )}
            </svg>
          </div>

          {/* Candle Action Prompt (Centered and Wrap-Safe) */}
          <div className="mt-2 w-full flex justify-center px-2">
            {!candlesBlown ? (
              <span className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-rose-500/20 border border-rose-400/50 text-rose-200 text-xs font-cormorant tracking-wide hover:bg-rose-500/40 transition-colors animate-pulse text-center max-w-[90%]">
                🕯️ {birthday.blowCandlePrompt}
              </span>
            ) : (
              <span className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 text-xs font-cormorant tracking-wide text-center max-w-[90%]">
                ✨ {birthday.blownCandleSuccess}
              </span>
            )}
          </div>
        </motion.div>

        {/* Revealed Birthday Message Card */}
        <AnimatePresence>
          {wishMade && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-[390px] mx-auto glass-burgundy border border-amber-400/30 rounded-3xl p-5 shadow-2xl space-y-3 text-center relative"
            >
              <div className="space-y-2 font-cormorant text-base text-rose-100 leading-relaxed pt-1">
                {birthday.letterMessage.map((line, idx) => (
                  <p key={idx} className={idx === 0 ? "font-serif text-lg text-amber-200 font-semibold" : ""}>
                    {line}
                  </p>
                ))}
              </div>

              <div className="border-t border-rose-500/20 pt-3 flex flex-col items-center">
                <div className="font-script text-2xl text-rose-300">
                  {birthday.authorSign}
                </div>
              </div>

              {/* Next Button: Triggers Train Journey Transition */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  onClick={onPrev}
                  className="px-4 py-3 rounded-full glass-romantic border border-rose-500/30 text-rose-200 text-xs font-serif flex items-center gap-1 active:scale-95 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  onClick={() => {
                    romanticAudio.playSparkleSound();
                    setShowTrainTransition(true);
                  }}
                  className="flex-1 py-3.5 px-5 rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-burgundy-700 active:scale-95 text-white font-serif text-xs font-semibold tracking-wider shadow-lg flex items-center justify-center gap-2 border border-amber-300/40 cursor-pointer hover:border-amber-300"
                >
                  <Train className="w-4 h-4 text-amber-300 animate-pulse" />
                  <span>{birthday.nextButtonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Cinematic Train Passing Overlay between Birthday & Chapter 03 Photos */}
      <AnimatePresence>
        {showTrainTransition && (
          <TrainTransitionOverlay
            onComplete={onNext}
            onCancel={() => setShowTrainTransition(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
