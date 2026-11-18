import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Train, ArrowLeft, Home, RotateCcw } from 'lucide-react';
import { romanticAudio } from '../../utils/audioManager';

interface Scene10ReturnJourneyProps {
  onPrev: () => void;
  onRestart: () => void;
}

export const Scene10ReturnJourney: React.FC<Scene10ReturnJourneyProps> = ({
  onPrev,
  onRestart,
}) => {
  const [hasArrived, setHasArrived] = useState<boolean>(false);

  useEffect(() => {
    // Sound train stop / station arrival bells
    romanticAudio.playTrainStop();
    const timer = window.setTimeout(() => {
      setHasArrived(true);
      romanticAudio.playCelebrationSound();
    }, 4200);
    return () => clearTimeout(timer);
  }, []);

  const handleSkipToArrival = () => {
    setHasArrived(true);
    romanticAudio.playCelebrationSound();
  };

  return (
    <div className="relative min-h-[82vh] flex flex-col items-center justify-center px-3 py-4 select-none w-full max-w-[430px] mx-auto text-center">
      {/* Ambient Radial Golden Aura */}
      <div className="absolute w-[340px] h-[340px] rounded-full bg-gradient-to-tr from-amber-600/20 via-rose-700/25 to-burgundy-900/30 blur-[90px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {!hasArrived ? (
          /* ================= PHASE 1: THE TRAIN RETURNING HOME ACROSS THE SCREEN ================= */
          <motion.div
            key="train-transit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="w-full glass-burgundy border-2 border-amber-400/40 rounded-3xl p-4 sm:p-5 shadow-2xl space-y-4 relative overflow-hidden"
          >
            {/* Header */}
            <div className="space-y-1.5 pt-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-[10px] font-mono uppercase tracking-widest">
                <Train className="w-3.5 h-3.5 animate-pulse text-amber-400" />
                <span>The Return Express • In Transit</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </div>

              <h2 className="font-serif text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-200 via-rose-100 to-amber-200 bg-clip-text text-transparent text-glow-gold">
                Returning Home to Bava's Arms...
              </h2>

              <p className="font-cormorant italic text-xs sm:text-sm text-rose-200/90 px-2">
                "The return train is rolling home... hold tight to my hand, Bujji."
              </p>
            </div>

            {/* Train Tracks & Animated Moving Train (Running in Reverse: Right to Left) */}
            <div className="relative w-full h-44 flex flex-col justify-center items-center overflow-hidden my-2">
              <div className="absolute inset-x-0 bottom-8 h-12 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

              <motion.div
                initial={{ x: '130%' }}
                animate={{ x: '-130%' }}
                transition={{ duration: 4.2, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ transform: 'scaleX(-1)' }}
                className="absolute bottom-6 flex items-end"
              >
                {/* Headlight Golden Beam */}
                <div className="absolute right-0 top-6 translate-x-[90%] w-44 h-16 bg-gradient-to-r from-amber-300/40 via-amber-200/15 to-transparent blur-md pointer-events-none transform -skew-y-3" />

                {/* Train SVG */}
                <svg viewBox="0 0 460 90" className="w-[330px] sm:w-[380px] h-auto filter drop-shadow-xl">
                  <defs>
                    <linearGradient id="trainGradRet" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4a0d1e" />
                      <stop offset="50%" stopColor="#2b0510" />
                      <stop offset="100%" stopColor="#150207" />
                    </linearGradient>
                    <linearGradient id="windowGlowRet" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#fff3b0" />
                      <stop offset="100%" stopColor="#ffb703" />
                    </linearGradient>
                  </defs>

                  {/* Coach 2 */}
                  <rect x="5" y="24" width="115" height="46" rx="6" fill="url(#trainGradRet)" stroke="#c4933d" strokeWidth="1.5" />
                  <rect x="15" y="32" width="22" height="18" rx="3" fill="url(#windowGlowRet)" opacity="0.9" />
                  <rect x="45" y="32" width="22" height="18" rx="3" fill="url(#windowGlowRet)" opacity="0.9" />
                  <rect x="75" y="32" width="22" height="18" rx="3" fill="url(#windowGlowRet)" opacity="0.9" />
                  <line x1="5" y1="56" x2="120" y2="56" stroke="#f43f5e" strokeWidth="2" />
                  <text x="32" y="65" fill="#fbcfe8" fontSize="7" fontFamily="monospace" fontWeight="bold">COUPÉ 46</text>

                  {/* Coupler */}
                  <rect x="120" y="52" width="14" height="6" rx="1" fill="#c4933d" />

                  {/* Coach 1 */}
                  <rect x="134" y="22" width="125" height="48" rx="6" fill="url(#trainGradRet)" stroke="#ffd700" strokeWidth="1.8" />
                  <rect x="146" y="30" width="26" height="20" rx="3" fill="url(#windowGlowRet)" opacity="0.9" />
                  <rect x="182" y="30" width="28" height="20" rx="3" fill="url(#windowGlowRet)" opacity="0.95" />
                  <circle cx="196" cy="40" r="6" fill="#be123c" opacity="0.8" />
                  <path d="M196,37 C196,35 193,33 191,35 C189,37 191,40 196,44 C201,40 203,37 201,35 C199,33 196,35 196,37 Z" fill="#ffe4e6" />
                  <rect x="220" y="30" width="26" height="20" rx="3" fill="url(#windowGlowRet)" opacity="0.9" />
                  <line x1="134" y1="56" x2="259" y2="56" stroke="#fb7185" strokeWidth="2.5" />
                  <text x="160" y="65" fill="#ffd700" fontSize="8" fontFamily="serif" fontWeight="bold">V & A SPECIAL #143</text>

                  {/* Coupler */}
                  <rect x="259" y="52" width="14" height="6" rx="1" fill="#c4933d" />

                  {/* Locomotive Engine */}
                  <path d="M273,20 L360,20 L375,32 L405,32 L412,48 L418,68 L273,68 Z" fill="url(#trainGradRet)" stroke="#ffd700" strokeWidth="2" />
                  <rect x="282" y="26" width="30" height="22" rx="4" fill="url(#windowGlowRet)" opacity="0.9" />
                  <rect x="378" y="10" width="14" height="22" rx="2" fill="#713f12" stroke="#ffd700" strokeWidth="1" />
                  <ellipse cx="345" cy="18" rx="10" ry="6" fill="#c4933d" />
                  <polygon points="412,60 435,72 412,72" fill="#991b1b" stroke="#ffd700" strokeWidth="1" />
                  <rect x="414" y="36" width="12" height="12" rx="2" fill="#ffd700" stroke="#fff" strokeWidth="1" />
                  <circle cx="420" cy="42" r="4" fill="#ffffff" />

                  {/* Wheels */}
                  {[25, 55, 85, 110, 150, 180, 210, 245, 295, 335, 375, 405].map((cx, idx) => (
                    <g key={idx}>
                      <circle cx={cx} cy="73" r="8" fill="#18181b" stroke="#c4933d" strokeWidth="1.5" />
                      <circle cx={cx} cy="73" r="3" fill="#ffd700" />
                    </g>
                  ))}
                </svg>

                {/* Steam Puffs */}
                <div className="absolute right-10 top-0">
                  <motion.div
                    animate={{ y: [-8, -35], x: [-5, -18], scale: [0.6, 1.2], opacity: [0.8, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
                    className="absolute text-rose-300 text-xs"
                  >
                    💖
                  </motion.div>
                  <motion.div
                    animate={{ y: [-10, -42], x: [-10, -25], scale: [0.5, 1.1], opacity: [0.8, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, delay: 0.4, ease: 'easeOut' }}
                    className="absolute text-amber-200 text-[10px]"
                  >
                    💨
                  </motion.div>
                  <motion.div
                    animate={{ y: [-6, -38], x: [-12, -32], scale: [0.6, 1.3], opacity: [0.9, 0] }}
                    transition={{ duration: 1.3, repeat: Infinity, delay: 0.7, ease: 'easeOut' }}
                    className="absolute text-rose-400 text-[10px]"
                  >
                    ❤️
                  </motion.div>
                </div>
              </motion.div>

              {/* Rails */}
              <div className="absolute bottom-4 inset-x-0 w-full">
                <div className="w-full h-[2px] bg-gradient-to-r from-amber-400/40 via-amber-200 to-amber-400/40 shadow-sm" />
                <div className="w-full h-[2px] bg-zinc-600 mt-[3px]" />
                <div className="w-full flex justify-between px-1 mt-[-4px]">
                  {[...Array(20)].map((_, i) => (
                    <span key={i} className="inline-block w-2.5 h-2 bg-amber-950/80 border-t border-amber-800/60" />
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Status & Skip Button */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-amber-300/90">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Approaching: Platform Forever (Bava's Arms)</span>
              </div>

              <button
                onClick={handleSkipToArrival}
                className="text-xs font-serif text-rose-300/80 hover:text-white px-4 py-1.5 rounded-full border border-rose-500/25 active:scale-95 transition-all cursor-pointer"
              >
                Arrive Home Immediately ➔
              </button>
            </div>
          </motion.div>
        ) : (
          /* ================= PHASE 2: SAFE IN AFZAL'S ARMS FOREVER (DEDICATED FULL PAGE CARD) ================= */
          <motion.div
            key="arrival-card"
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full glass-burgundy border-2 border-amber-300/70 rounded-3xl p-4 sm:p-5 shadow-2xl text-center space-y-3.5 relative overflow-hidden"
          >
            {/* Top Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/50 text-amber-300 text-[10px] font-mono uppercase tracking-widest">
              <Train className="w-3.5 h-3.5 text-amber-400" />
              <span>Platform Forever • Arrival Confirmed</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </div>

            {/* Glowing Golden Home Badge */}
            <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-tr from-amber-500/25 via-rose-600/30 to-amber-400/20 border-2 border-amber-300 flex items-center justify-center shadow-xl shadow-rose-950/70">
              <Home className="w-7 h-7 text-amber-300 animate-pulse" />
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-1">
              <h2 className="font-serif text-2xl font-bold bg-gradient-to-r from-amber-200 via-rose-100 to-amber-200 bg-clip-text text-transparent text-glow-gold">
                Safe in Your Bava's Arms Forever ❤️
              </h2>
              <p className="font-cormorant italic text-xs sm:text-sm text-amber-200/90 px-1 leading-snug">
                "No matter where the rails took us, you are my eternal home."
              </p>
            </div>

            {/* Romantic Vows Card */}
            <div className="glass-burgundy border border-amber-400/35 rounded-2xl p-3.5 shadow-inner space-y-2 text-left">
              <p className="font-cormorant italic text-xs sm:text-sm text-rose-100 leading-relaxed text-center">
                "Our train has carried our laughter, our whispers on swaying berths, our held hands on the train floor, and our sacred vows. Now and for every lifetime that follows, you are safe in your Bava's arms."
              </p>
              <div className="pt-2 border-t border-rose-500/20 flex items-center justify-center gap-2 text-[9px] font-mono text-amber-300/80">
                <span>PNR: FOREVERWITHVICKY143</span>
                <span>•</span>
                <span>STATUS: CNF (LIFETIME)</span>
              </div>
            </div>

            {/* Birthday Cheer & Signature */}
            <div className="pt-2 border-t border-amber-400/30 w-full space-y-0.5">
              <span className="font-serif text-[11px] text-amber-300/90 tracking-widest uppercase block">
                Happy Birthday, My Queen Vicky 🎂✨
              </span>
              <p className="font-script text-2xl text-rose-200 text-glow-rose">
                Forever Your Bava, Afzal ❤️
              </p>
            </div>

            {/* Action Buttons: Return to Proposal or Relive */}
            <div className="pt-1 flex flex-col gap-2 w-full">
              <button
                onClick={onPrev}
                className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-burgundy-700 text-white font-serif text-xs font-bold tracking-wider shadow-lg border border-amber-300/60 active:scale-95 cursor-pointer hover:border-amber-200 transition-all flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Proposal & Return Ticket 💌</span>
              </button>

              <button
                onClick={onRestart}
                className="w-full py-2 px-4 rounded-full glass-romantic text-rose-200 font-serif text-xs border border-rose-400/30 active:scale-95 inline-flex items-center justify-center gap-1.5 cursor-pointer hover:text-white transition-all"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Relive Journey From Start</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
