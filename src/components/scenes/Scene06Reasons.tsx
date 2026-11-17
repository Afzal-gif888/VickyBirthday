import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, CheckCircle2, ArrowRight, ArrowLeft, Lock } from 'lucide-react';
import { PERSONALIZATION } from '../../config/personalization';
import type { LoveReason } from '../../config/personalization';
import { romanticAudio } from '../../utils/audioManager';

interface Scene06ReasonsProps {
  onNext: () => void;
  onPrev: () => void;
  discoveredReasons?: number[];
  onDiscoverReason?: (id: number) => void;
}

export const Scene06Reasons: React.FC<Scene06ReasonsProps> = ({
  onNext,
  onPrev,
  discoveredReasons: propDiscovered,
  onDiscoverReason,
}) => {
  const { reasons } = PERSONALIZATION;

  // Initialize flipped cards from props or sessionStorage
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>(() => {
    if (propDiscovered && propDiscovered.length > 0) {
      const map: Record<number, boolean> = {};
      propDiscovered.forEach((id) => (map[id] = true));
      return map;
    }
    if (typeof window !== 'undefined') {
      try {
        const saved = sessionStorage.getItem('vicky_discovered_reasons');
        if (saved) {
          const ids: number[] = JSON.parse(saved);
          const map: Record<number, boolean> = {};
          ids.forEach((id) => (map[id] = true));
          return map;
        }
      } catch {}
    }
    return {};
  });

  const [promptMessage, setPromptMessage] = useState<string | null>(null);
  const [shakeButton, setShakeButton] = useState<boolean>(false);

  const toggleCard = (id: number) => {
    romanticAudio.playSparkleSound();
    setFlippedCards((prev) => {
      const isCurrentlyFlipped = !!prev[id];
      const next = { ...prev, [id]: !isCurrentlyFlipped };
      
      // Update persistent list of discovered ids
      const discoveredIds = Object.keys(next)
        .map(Number)
        .filter((k) => next[k]);

      try {
        sessionStorage.setItem('vicky_discovered_reasons', JSON.stringify(discoveredIds));
      } catch {}

      if (onDiscoverReason) {
        onDiscoverReason(id);
      }
      return next;
    });

    setPromptMessage(null);
  };

  const flippedCount = Object.values(flippedCards).filter(Boolean).length;
  const isComplete = flippedCount >= reasons.items.length;

  const handleNextClick = () => {
    if (!isComplete) {
      romanticAudio.playTypewriterKeySound();
      setShakeButton(true);
      const remaining = reasons.items.length - flippedCount;
      setPromptMessage(
        `Bujji, please uncover all 12 reasons why my soul chooses you to break the wax seal on my letter! (${remaining} remaining) ❤️`
      );
      setTimeout(() => setShakeButton(false), 600);
      return;
    }

    romanticAudio.playSparkleSound();
    onNext();
  };

  return (
    <div className="relative min-h-[82vh] flex flex-col items-center justify-center px-3 py-6 select-none w-full max-w-[430px] mx-auto">
      {/* Mobile Header */}
      <div className="text-center w-full space-y-2 mb-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-romantic border border-rose-500/30 text-rose-200 text-[11px] font-serif tracking-widest uppercase"
        >
          <Sparkles className="w-3 h-3 text-champagne-300" />
          <span>Chapter 05 • Reasons Why My Soul Chooses You</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-serif text-2xl font-bold bg-gradient-to-r from-rose-200 via-rose-100 to-amber-200 bg-clip-text text-transparent text-glow-rose"
        >
          {reasons.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-cormorant italic text-sm text-rose-200/80 px-2"
        >
          "{reasons.subtitle}"
        </motion.p>

        {/* Progress Tracker */}
        <div className="pt-1">
          <span
            className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border text-xs font-mono transition-all duration-300 ${
              isComplete
                ? 'bg-amber-500/20 border-amber-400/50 text-amber-200 shadow-md animate-pulse'
                : 'bg-rose-500/20 border-rose-500/30 text-rose-200'
            }`}
          >
            {isComplete ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-rose-300" />
            )}
            <span>Discovered:</span>
            <span className={`font-bold ${isComplete ? 'text-amber-300' : 'text-champagne-300'}`}>
              {flippedCount}
            </span>
            <span>of {reasons.items.length}</span>
            {isComplete && <span className="text-amber-300 font-bold">• Ready! ✨</span>}
          </span>
        </div>
      </div>

      {/* Grid of 12 Cards */}
      <div className="w-full grid grid-cols-2 gap-2.5">
        {reasons.items.map((item: LoveReason, index: number) => {
          const isFlipped = !!flippedCards[item.id];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03, duration: 0.3 }}
              onClick={() => toggleCard(item.id)}
              className="relative h-44 cursor-pointer perspective-1000 active:scale-95 transition-transform"
            >
              <div
                className={`w-full h-full rounded-2xl transition-all duration-500 [transform-style:preserve-3d] ${
                  isFlipped ? '[transform:rotateY(180deg)]' : ''
                }`}
              >
                {/* Front Side */}
                <div className="absolute inset-0 [backface-visibility:hidden] glass-romantic border border-rose-500/20 rounded-2xl p-3 flex flex-col justify-between items-center text-center shadow-md">
                  <div className="w-full flex justify-between items-center text-[10px] font-mono text-rose-400/80">
                    <span>#{item.id}</span>
                    <Heart className="w-3 h-3 text-rose-400 fill-rose-400/30" />
                  </div>

                  <div className="my-auto space-y-1">
                    <div className="text-2xl filter drop-shadow">
                      {item.emoji}
                    </div>
                    <h3 className="font-serif text-xs font-bold text-rose-100 line-clamp-2">
                      {item.title}
                    </h3>
                  </div>

                  <div className="text-[10px] font-cormorant italic text-rose-300/70 flex items-center gap-0.5">
                    <span>Tap to reveal</span>
                    <Sparkles className="w-2.5 h-2.5 text-champagne-300" />
                  </div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] glass-burgundy border border-rose-400/40 rounded-2xl p-3 flex flex-col justify-between text-center shadow-xl">
                  <div className="flex justify-between items-center border-b border-rose-500/20 pb-1">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-amber-300 truncate">
                      {item.highlight || 'Love'}
                    </span>
                    <CheckCircle2 className="w-3 h-3 text-rose-400 flex-shrink-0" />
                  </div>

                  <p className="font-cormorant italic text-xs text-rose-100 leading-snug my-auto overflow-y-auto max-h-[85px]">
                    "{item.description}"
                  </p>

                  <div className="text-[9px] font-serif text-rose-300/70 pt-0.5 border-t border-rose-500/15">
                    Afzal ❤️
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Unlock Alert Prompt if tapped prematurely */}
      <AnimatePresence>
        {promptMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full mt-4 p-3 rounded-2xl bg-gradient-to-r from-crimson-950 via-burgundy-900 to-black border border-amber-400/40 shadow-xl text-center"
          >
            <div className="flex items-center justify-center gap-1.5 text-amber-300 text-xs font-serif font-bold mb-0.5">
              <Lock className="w-3.5 h-3.5" />
              <span>Sealed by Afzal's Heart</span>
            </div>
            <p className="font-cormorant italic text-xs text-rose-200">
              "{promptMessage}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-6 mb-4 w-full flex items-center justify-between gap-3">
        <button
          onClick={() => {
            romanticAudio.playSparkleSound();
            onPrev();
          }}
          className="px-4 py-3 rounded-full glass-romantic border border-rose-500/30 text-rose-200 text-xs font-serif flex items-center gap-1 active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <motion.button
          animate={shakeButton ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
          transition={{ duration: 0.5 }}
          onClick={handleNextClick}
          className={`flex-1 py-3.5 px-5 rounded-full font-serif text-xs font-semibold tracking-wider shadow-xl transition-all flex items-center justify-center gap-2 border cursor-pointer active:scale-95 ${
            isComplete
              ? 'bg-gradient-to-r from-rose-600 via-rose-500 to-burgundy-700 border-amber-300/80 text-white animate-pulse'
              : 'bg-gradient-to-r from-zinc-900/90 to-burgundy-950/80 border-rose-500/30 text-rose-300/80 hover:text-rose-100'
          }`}
        >
          {isComplete ? (
            <>
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
              <span>OPEN MY LETTER ❤️🔥</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>DISCOVER ALL 12 TO UNLOCK ({flippedCount}/12)</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
};
