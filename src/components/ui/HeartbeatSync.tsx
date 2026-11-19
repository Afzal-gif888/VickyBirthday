import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Fingerprint } from 'lucide-react';
import { romanticAudio } from '../../utils/audioManager';

interface HeartbeatSyncProps {
  onComplete: () => void;
  ctaText?: string;
}

export const HeartbeatSync: React.FC<HeartbeatSyncProps> = ({
  onComplete,
  ctaText = 'Touch & hold your thumb to sync heartbeats with Bava',
}) => {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSynced, setIsSynced] = useState(false);
  const holdIntervalRef = useRef<number | null>(null);

  const startHold = () => {
    if (isSynced) return;
    setIsHolding(true);
    romanticAudio.playSparkleSound();

    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([30, 40, 30]);
      } catch {}
    }

    const startTime = Date.now();
    const duration = 1400; // 1.4 seconds hold time

    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);

    holdIntervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(holdIntervalRef.current!);
        setIsSynced(true);
        setIsHolding(false);

        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
          try {
            navigator.vibrate([80, 50, 150]);
          } catch {}
        }

        romanticAudio.playCelebrationSound();
        setTimeout(() => {
          onComplete();
        }, 600);
      }
    }, 25);
  };

  const cancelHold = () => {
    if (isSynced) return;
    setIsHolding(false);
    setProgress(0);
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center space-y-3 select-none my-2">
      {/* Biometric Heart Sensor */}
      <div
        onPointerDown={startHold}
        onPointerUp={cancelHold}
        onPointerLeave={cancelHold}
        className="relative w-28 h-28 flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
      >
        {/* Rippling glow rings when holding */}
        {isHolding && (
          <>
            <motion.div
              animate={{ scale: [1, 1.8], opacity: [0.8, 0] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full border-2 border-rose-400 pointer-events-none"
            />
            <motion.div
              animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
              transition={{ duration: 1.1, repeat: Infinity, delay: 0.2, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full border border-amber-300 pointer-events-none"
            />
          </>
        )}

        {/* Circular SVG Progress Ring */}
        <svg className="w-28 h-28 transform -rotate-90 pointer-events-none">
          <circle
            cx="56"
            cy="56"
            r="48"
            stroke="rgba(244, 63, 94, 0.2)"
            strokeWidth="5"
            fill="transparent"
          />
          <circle
            cx="56"
            cy="56"
            r="48"
            stroke="#fb7185"
            strokeWidth="5"
            fill="transparent"
            strokeDasharray={2 * Math.PI * 48}
            strokeDashoffset={2 * Math.PI * 48 * (1 - progress / 100)}
            strokeLinecap="round"
            className="transition-all duration-75"
          />
        </svg>

        {/* Center Glowing Heart Touch Pad */}
        <motion.div
          animate={
            isHolding
              ? { scale: [1, 1.12, 1] }
              : isSynced
              ? { scale: 1.15 }
              : { scale: [1, 1.05, 1] }
          }
          transition={{
            duration: isHolding ? 0.4 : 1.8,
            repeat: isSynced ? 0 : Infinity,
            ease: 'easeInOut',
          }}
          className={`absolute w-20 h-20 rounded-full flex flex-col items-center justify-center border-2 shadow-2xl transition-all duration-300 ${
            isSynced
              ? 'bg-gradient-to-tr from-emerald-600 via-rose-500 to-amber-500 border-amber-200'
              : isHolding
              ? 'bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-600 border-amber-300 shadow-rose-500/50'
              : 'bg-gradient-to-tr from-rose-950 via-burgundy-900 to-black border-rose-500/40 shadow-rose-950/70'
          }`}
        >
          {isSynced ? (
            <Sparkles className="w-9 h-9 text-amber-200 animate-spin-slow" />
          ) : isHolding ? (
            <Heart className="w-9 h-9 text-rose-200 fill-rose-300 animate-pulse" />
          ) : (
            <Fingerprint className="w-9 h-9 text-rose-300/90" />
          )}
        </motion.div>
      </div>

      {/* Instructional text & status */}
      <div className="space-y-1 text-center px-4">
        <p className="font-serif text-xs font-semibold tracking-wide text-rose-100">
          {isSynced
            ? '✨ Two Souls, One Pulse • Heartbeats Synced! ✨'
            : isHolding
            ? `Syncing soul frequencies... ${progress}%`
            : ctaText}
        </p>
        <span className="text-[10px] font-mono text-amber-300/80 block">
          {isHolding ? 'Hold tight, Bujji... ❤️' : 'Press & hold your thumb here'}
        </span>
      </div>
    </div>
  );
};
