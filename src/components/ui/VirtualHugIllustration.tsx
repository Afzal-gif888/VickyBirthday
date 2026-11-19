import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { romanticAudio } from '../../utils/audioManager';

interface VirtualHugIllustrationProps {
  squeezeTrigger?: number;
}

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  size: number;
}

export const VirtualHugIllustration: React.FC<VirtualHugIllustrationProps> = ({ squeezeTrigger = 0 }) => {
  const [isSqueezing, setIsSqueezing] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);

  const triggerHugSqueeze = () => {
    setIsSqueezing(true);
    romanticAudio.playHugSound();

    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([80, 50, 120]);
      } catch {}
    }

    // Spawn floating hearts
    const newHearts: FloatingHeart[] = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      x: 30 + Math.random() * 40, // percentage
      y: 60 + Math.random() * 20,
      size: 14 + Math.random() * 12,
    }));
    setFloatingHearts(newHearts);

    setTimeout(() => {
      setIsSqueezing(false);
    }, 700);

    setTimeout(() => {
      setFloatingHearts([]);
    }, 1500);
  };

  useEffect(() => {
    if (squeezeTrigger > 0) {
      triggerHugSqueeze();
    }
  }, [squeezeTrigger]);

  return (
    <div
      onClick={triggerHugSqueeze}
      className="relative w-full max-w-[340px] mx-auto select-none cursor-pointer group"
    >
      {/* Outer Romantic Radiant Glow */}
      <motion.div
        animate={
          isSqueezing
            ? { scale: [1, 1.2, 1.05], opacity: [0.6, 0.95, 0.7] }
            : { scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }
        }
        transition={{ duration: isSqueezing ? 0.6 : 2.5, repeat: isSqueezing ? 0 : Infinity }}
        className="absolute -inset-2 bg-gradient-to-tr from-rose-600/40 via-amber-400/30 to-burgundy-600/50 rounded-3xl blur-xl pointer-events-none"
      />

      {/* Main Hugging GIF Frame */}
      <motion.div
        animate={
          isSqueezing
            ? { scale: [1, 1.06, 0.96, 1.03, 1] }
            : { scale: [1, 1.015, 1] }
        }
        transition={{ duration: isSqueezing ? 0.6 : 3, repeat: isSqueezing ? 0 : Infinity, ease: 'easeInOut' }}
        className="relative z-10 rounded-2xl overflow-hidden border-2 border-amber-300/80 shadow-2xl bg-black/60 p-2 space-y-2 backdrop-blur-sm"
      >
        {/* Top Mini Badge */}
        <div className="flex items-center justify-between px-2 pt-0.5">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-300 uppercase tracking-widest">
            <Sparkles className="w-3 h-3 text-amber-400 animate-spin-slow" />
            <span>LOVERS COUPÉ 46 • HUGGING TIGHT</span>
          </div>
          <span className="text-[10px] font-mono text-rose-300/80 bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-500/30">
            BAVA & BUJJI
          </span>
        </div>

        {/* Real Couple Hugging Animated Visual */}
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-rose-950/30 border border-amber-300/30 shadow-inner">
          <img
            src="/assets/photos/couple-hug.gif"
            alt="Afzal and Vicky Hugging Close"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              // Fallback to jpg if gif has any loading delay
              (e.currentTarget as HTMLImageElement).src = '/assets/photos/couple-hug.jpg';
            }}
          />

          {/* Vignette & soft lighting overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

          {/* Squeeze Heart Shockwave Overlay */}
          <AnimatePresence>
            {isSqueezing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1.2 }}
                exit={{ opacity: 0, scale: 1.5 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="w-20 h-20 rounded-full bg-rose-500/40 backdrop-blur-xs flex items-center justify-center border-2 border-amber-300 shadow-2xl">
                  <Heart className="w-10 h-10 text-white fill-rose-500 animate-ping" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Hearts Particles on Squeeze */}
          <AnimatePresence>
            {floatingHearts.map((h) => (
              <motion.div
                key={h.id}
                initial={{ opacity: 1, y: 0, scale: 0.6 }}
                animate={{ opacity: 0, y: -65 - Math.random() * 30, scale: 1.25 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: 'easeOut' }}
                style={{ left: `${h.x}%`, bottom: `${h.y}%` }}
                className="absolute pointer-events-none text-rose-300 drop-shadow-lg"
              >
                <Heart style={{ width: h.size, height: h.size }} className="fill-rose-400 text-rose-200" />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Tap-to-squeeze hint pill */}
          <div className="absolute bottom-2 inset-x-0 flex justify-center">
            <span className="px-3 py-1 rounded-full bg-black/70 border border-amber-300/40 text-[10px] font-serif text-amber-200 shadow-md flex items-center gap-1.5 backdrop-blur-sm">
              <Heart className="w-2.5 h-2.5 text-rose-400 fill-rose-400 animate-pulse" />
              <span>{isSqueezing ? 'Wrapped in Bava\'s arms... 🥺❤️' : 'Tap image to squeeze hug tight 🫂'}</span>
            </span>
          </div>
        </div>

        {/* Caption */}
        <p className="font-cormorant italic text-xs text-amber-200/90 text-center py-0.5">
          "Held tight in our midnight train coupé, where time stands still."
        </p>
      </motion.div>
    </div>
  );
};
