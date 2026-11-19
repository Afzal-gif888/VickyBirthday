import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, Heart, Award, X, Check, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { romanticAudio } from '../../utils/audioManager';

interface SurpriseGiftBoxProps {
  onUnwrapped?: () => void;
}

export const SurpriseGiftBox: React.FC<SurpriseGiftBoxProps> = ({ onUnwrapped }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const triggerGiftConfetti = () => {
    try {
      confetti({
        particleCount: 160,
        spread: 90,
        origin: { y: 0.65 },
        colors: ['#ffd700', '#f43f5e', '#ffffff', '#fb7185', '#ffe4e6'],
      });
    } catch {}
  };

  const handleUnwrap = () => {
    if (isOpen) {
      setShowCertificate(true);
      return;
    }

    romanticAudio.playCelebrationSound();
    romanticAudio.playSparkleSound();
    triggerGiftConfetti();

    // Trigger device vibration if available
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([80, 50, 120]);
      } catch {}
    }

    setIsOpen(true);
    setTimeout(() => {
      setShowCertificate(true);
      if (onUnwrapped) onUnwrapped();
    }, 450);
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleUnwrap}
        className="w-full relative mx-auto my-3 cursor-pointer select-none group"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400/40 via-rose-500/50 to-amber-300/40 rounded-3xl blur-sm group-hover:blur-md transition-all" />

        <div className="relative glass-burgundy border-2 border-amber-300/60 rounded-3xl p-4 sm:p-5 text-center space-y-3 overflow-hidden shadow-2xl">
          {/* Top Sparkling Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-200 text-[10px] font-mono uppercase tracking-widest">
            <Sparkles className="w-3 h-3 text-amber-300 animate-spin-slow" />
            <span>Mystery Birthday Surprise from Bava</span>
            <Sparkles className="w-3 h-3 text-amber-300 animate-spin-slow" />
          </div>

          {/* Animated 3D Gift Icon with Pulsing Halo */}
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/30 to-rose-600/40 rounded-full blur-xl animate-pulse" />
            <motion.div
              animate={{ rotate: [0, -6, 6, -3, 3, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-600 via-rose-500 to-burgundy-700 border-2 border-amber-300 shadow-xl flex items-center justify-center text-amber-200"
            >
              <Gift className="w-8 h-8 text-amber-200 animate-bounce" />
              {/* Ribbon cross */}
              <div className="absolute inset-x-0 h-1.5 bg-amber-300/80 top-1/2 -translate-y-1/2 pointer-events-none" />
              <div className="absolute inset-y-0 w-1.5 bg-amber-300/80 left-1/2 -translate-x-1/2 pointer-events-none" />
            </motion.div>
          </div>

          {/* Text Call to Action */}
          <div className="space-y-1">
            <h3 className="font-serif text-base sm:text-lg font-bold text-amber-200 group-hover:text-white transition-colors">
              {isOpen ? '🎁 Tap to View Your Royal Certificate ✨' : '🎁 Bava Left a Secret Birthday Gift for Bujji!'}
            </h3>
            <p className="font-cormorant italic text-xs sm:text-sm text-rose-200/90">
              {isOpen
                ? 'Your soulmate certificate is unlocked and sealed forever ❤️'
                : 'Tap to unwrap with love, sparkler fireworks & music! ✨'}
            </p>
          </div>

          <div className="pt-1">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 text-white font-serif text-xs font-bold tracking-wider border border-amber-300/60 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>{isOpen ? 'RE-OPEN CERTIFICATE 💌' : 'UNWRAP BIRTHDAY SURPRISE 🎁'}</span>
            </span>
          </div>
        </div>
      </motion.div>

      {/* Royal Certificate Modal Lightbox */}
      <AnimatePresence>
        {showCertificate && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 select-none"
            onClick={() => setShowCertificate(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[390px] bg-gradient-to-b from-[#220711] via-[#16030a] to-[#0d0105] border-2 border-amber-300/80 rounded-3xl p-5 shadow-2xl space-y-4 text-center overflow-hidden"
            >
              {/* Golden Corner Accents */}
              <div className="absolute top-2 left-2 text-amber-300 text-xs">✦</div>
              <div className="absolute top-2 right-2 text-amber-300 text-xs">✦</div>
              <div className="absolute bottom-2 left-2 text-amber-300 text-xs">✦</div>
              <div className="absolute bottom-2 right-2 text-amber-300 text-xs">✦</div>

              {/* Close Button */}
              <button
                onClick={() => setShowCertificate(false)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 border border-amber-400/40 text-amber-200 hover:text-white"
                aria-label="Close certificate"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Certificate Crest */}
              <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 p-0.5 shadow-xl flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#18040d] flex items-center justify-center">
                  <Award className="w-7 h-7 text-amber-300" />
                </div>
              </div>

              {/* Certificate Titles */}
              <div className="space-y-1">
                <span className="font-mono text-[9px] uppercase tracking-widest text-amber-400 block font-semibold">
                  HEAVEN'S REGISTRY • IRCTC CERTIFIED SOULMATE
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-200 via-rose-100 to-amber-200 bg-clip-text text-transparent text-glow-gold">
                  Certificate of Eternal Soulmates
                </h2>
                <div className="h-[1px] w-28 bg-amber-400/40 mx-auto" />
              </div>

              {/* Certificate Details Body */}
              <div className="bg-black/40 border border-amber-300/30 rounded-2xl p-3.5 space-y-2.5 text-left text-xs font-serif text-rose-100">
                <div className="flex items-center justify-between border-b border-rose-500/20 pb-1.5">
                  <span className="text-amber-300/90 font-mono text-[10px]">SOULMATE NAME:</span>
                  <span className="font-bold text-amber-200">Vicky (My Queen / Bujji) ❤️</span>
                </div>

                <div className="flex items-center justify-between border-b border-rose-500/20 pb-1.5">
                  <span className="text-amber-300/90 font-mono text-[10px]">DATE OF HEAVEN'S GIFT:</span>
                  <span className="font-bold text-amber-200">20 November 2005 🕊️</span>
                </div>

                <div className="flex items-center justify-between border-b border-rose-500/20 pb-1.5">
                  <span className="text-amber-300/90 font-mono text-[10px]">ISSUED BY:</span>
                  <span className="font-bold text-rose-200">Your Bava, Afzal</span>
                </div>

                <div className="pt-1 space-y-1.5 font-cormorant italic text-xs leading-relaxed text-rose-100">
                  <p className="font-semibold text-amber-300">Bava's Sacred Vows To You:</p>
                  <ul className="space-y-1 pl-1">
                    <li className="flex items-start gap-1.5">
                      <Star className="w-3 h-3 text-amber-300 shrink-0 mt-0.5" />
                      <span>Priority seat inside my heart across every birth and lifetime.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Star className="w-3 h-3 text-amber-300 shrink-0 mt-0.5" />
                      <span>Unlimited hugs and whispers in our midnight train coupé.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Star className="w-3 h-3 text-amber-300 shrink-0 mt-0.5" />
                      <span>Guaranteed protector of your smile through every storm on earth.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Wax Seal Stamp & Signature */}
              <div className="flex items-center justify-between px-2 pt-1">
                <div className="text-left">
                  <span className="text-[9px] font-mono text-amber-400 block">SEALED FOREVER:</span>
                  <span className="font-script text-xl text-rose-200">Forever Your Bava ❤️</span>
                </div>

                {/* Wax Seal */}
                <div className="w-12 h-12 rounded-full bg-rose-700 border-2 border-amber-300 flex items-center justify-center shadow-lg shadow-rose-950/80 rotate-12">
                  <Heart className="w-6 h-6 text-amber-200 fill-amber-200" />
                </div>
              </div>

              {/* Keep In My Heart Button */}
              <button
                onClick={() => setShowCertificate(false)}
                className="w-full py-3 rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 text-white font-serif text-xs font-bold tracking-wider border border-amber-300/60 shadow-lg active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5 text-amber-200" />
                <span>SEAL IN MY HEART FOREVER 💖</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
