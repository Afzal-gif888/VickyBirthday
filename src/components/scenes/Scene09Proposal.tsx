import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, RotateCcw, ArrowLeft, Train } from 'lucide-react';
import { PERSONALIZATION } from '../../config/personalization';
import { romanticAudio } from '../../utils/audioManager';
import { RomanticCelebrationCanvas } from '../canvas/RomanticCelebrationCanvas';
import { VirtualHugIllustration } from '../ui/VirtualHugIllustration';
import { RomanticTrainTicket } from '../ui/RomanticTrainTicket';

interface Scene09ProposalProps {
  onNext: () => void;
  onRestart: () => void;
  onPrev: () => void;
}

export const Scene09Proposal: React.FC<Scene09ProposalProps> = ({ onNext, onRestart, onPrev }) => {
  const { proposal } = PERSONALIZATION;
  const [responseState, setResponseState] = useState<'prompt' | 'always' | 'hug'>('prompt');
  const [celebrationKey, setCelebrationKey] = useState<number>(0);

  const fireGrandConfetti = () => {
    try {
      confetti({
        particleCount: 180,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ffd700', '#f43f5e', '#ffffff', '#fb7185', '#ffe4e6'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 100,
          angle: 60,
          spread: 70,
          origin: { x: 0, y: 0.7 },
          colors: ['#ffd700', '#f43f5e', '#fb7185'],
        });
        confetti({
          particleCount: 100,
          angle: 120,
          spread: 70,
          origin: { x: 1, y: 0.7 },
          colors: ['#ffd700', '#f43f5e', '#fb7185'],
        });
      }, 350);
    } catch {}

    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([100, 50, 150, 50, 100]);
      } catch {}
    }
  };

  const handleAlwaysAccept = () => {
    setResponseState('always');
    setCelebrationKey(prev => prev + 1);
    romanticAudio.playCelebrationSound();
    fireGrandConfetti();
  };

  const handleVirtualHug = () => {
    setResponseState('hug');
    setCelebrationKey(prev => prev + 1);
    romanticAudio.playHugSound();
    try {
      confetti({
        particleCount: 90,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#ffb6c1', '#f43f5e', '#ffe4e6'],
      });
    } catch {}
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([80, 40, 80]);
      } catch {}
    }
  };

  return (
    <div className={`relative min-h-[85vh] flex flex-col items-center justify-center px-3 py-6 text-center select-none overflow-hidden w-full max-w-[430px] mx-auto transition-colors duration-1000 ${
      responseState === 'always'
        ? 'bg-gradient-to-b from-burgundy-950 via-[#26030c] to-[#0f0105]'
        : responseState === 'hug'
        ? 'bg-gradient-to-b from-[#1f0510] via-burgundy-950 to-[#0e0207]'
        : ''
    }`}>
      {/* Dynamic Romantic Paper & Rose Confetti Canvas */}
      {responseState === 'always' && (
        <RomanticCelebrationCanvas key={`always-${celebrationKey}`} type="always" />
      )}
      {responseState === 'hug' && (
        <RomanticCelebrationCanvas key={`hug-${celebrationKey}`} type="hug" />
      )}

      {/* Background radial luxury aura */}
      <div className="absolute w-[360px] h-[360px] rounded-full bg-gradient-to-tr from-burgundy-900/60 via-rose-700/30 to-champagne-300/15 blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full">
        {/* ================= STATE 1: PROPOSAL PROMPT ================= */}
        {responseState === 'prompt' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="glass-burgundy border-2 border-rose-500/30 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-5 relative overflow-hidden"
          >
            {/* Chapter 09 Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-amber-300/30 text-amber-200 text-[10px] font-serif tracking-widest uppercase">
              <Train className="w-3 h-3 text-amber-300" />
              <span>Chapter 08 • A Reaffirmation of Our Love</span>
              <Sparkles className="w-3 h-3 text-amber-300" />
            </div>

            {/* The Question */}
            <div className="py-4 border-y border-rose-500/25 relative">
              <div className="absolute -inset-1 bg-rose-500/10 rounded-xl blur-md" />
              <h3 className="relative font-serif text-lg sm:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-champagne-200 via-rose-100 to-amber-200 text-glow-gold leading-relaxed">
                "{proposal.question}"
              </h3>
            </div>

            {/* The Two Proposal Buttons */}
            <div className="flex flex-col gap-3 pt-1">
              {/* BUTTON ONE: ALWAYS, MY AFZAL! 🚆❤️ */}
              <button
                onClick={handleAlwaysAccept}
                className="group relative w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-full font-serif text-base font-bold tracking-wider text-white shadow-2xl active:scale-95 transition-all bg-gradient-to-r from-rose-600 via-rose-500 to-burgundy-700 border border-amber-300/60 overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-rose-400 to-burgundy-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Heart className="relative z-10 w-5 h-5 text-amber-200 fill-amber-200 animate-pulse" />
                <span className="relative z-10 drop-shadow">{proposal.yesButtonText}</span>
                <Sparkles className="relative z-10 w-4 h-4 text-amber-300" />
              </button>

              {/* BUTTON TWO: PULL ME CLOSE IN OUR COUPÉ 🥺 */}
              <button
                onClick={handleVirtualHug}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-full font-serif text-sm font-medium tracking-wide text-rose-200 hover:text-white glass-romantic border border-rose-400/40 active:scale-95 transition-all cursor-pointer"
              >
                <span>{proposal.hugButtonText}</span>
              </button>
            </div>

            <div className="pt-1">
              <button
                onClick={onPrev}
                className="text-xs font-serif text-rose-300/70 hover:text-rose-200 inline-flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Back to Question</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* ================= STATE 2: CELEBRATION (BUTTON ONE: ALWAYS, MY AFZAL ❤️) ================= */}
        {responseState === 'always' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="glass-burgundy border-2 border-amber-300/60 rounded-3xl p-3.5 sm:p-4 shadow-2xl space-y-3 text-center relative overflow-hidden"
          >
            {/* Glowing Heart in the Center */}
            <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
              <div className="absolute inset-0 bg-rose-500/40 rounded-full blur-xl animate-pulse" />
              <Heart className="w-16 h-16 text-rose-500 fill-rose-500 filter drop-shadow-2xl animate-bounce" />
            </div>

            {/* Display Acceptance Title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-serif text-2xl sm:text-3xl font-black bg-gradient-to-r from-amber-200 via-rose-100 to-amber-200 bg-clip-text text-transparent text-glow-gold"
            >
              {proposal.acceptance.title}
            </motion.h2>

            {/* Reveal Acceptance Message */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-cormorant italic text-base text-rose-100 leading-relaxed font-light px-1"
            >
              "{proposal.acceptance.message}"
            </motion.p>

            {/* Return Journey Ticket with STOP TRAIN button */}
            <div className="pt-2">
              <RomanticTrainTicket
                variant="return"
                actionButtonText="STOP TRAIN 🛑🚆"
                onAction={onNext}
              />
            </div>

            {/* Reveal: "Forever Your Afzal ❤️" */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-0.5 pt-1"
            >
              <span className="font-serif text-sm text-amber-300 font-semibold tracking-wide block">
                {proposal.acceptance.birthdayCheer}
              </span>
              <p className="font-script text-3xl text-rose-200 text-glow-rose">
                {proposal.acceptance.signature}
              </p>
            </motion.div>

            {/* Action Buttons: Confetti, Restart, and BACK BUTTON as usual */}
            <div className="pt-1.5 flex flex-col gap-2">
              <button
                onClick={() => {
                  setCelebrationKey(prev => prev + 1);
                  romanticAudio.playCelebrationSound();
                  fireGrandConfetti();
                }}
                className="w-full inline-flex items-center justify-center gap-1.5 py-3 rounded-full bg-rose-600/70 active:bg-rose-500 text-white font-serif text-xs tracking-wider border border-rose-400/40 shadow cursor-pointer hover:bg-rose-600 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>More Confetti Shower! 💌✨</span>
              </button>

              <button
                onClick={() => setResponseState('prompt')}
                className="w-full inline-flex items-center justify-center gap-1.5 py-3 rounded-full glass-romantic border border-amber-300/40 text-amber-200 font-serif text-xs tracking-wider active:scale-95 cursor-pointer hover:text-white hover:border-amber-300 transition-colors shadow"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-amber-300" />
                <span>Back to Question</span>
              </button>

              <button
                onClick={onRestart}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full glass-romantic border border-rose-400/30 text-rose-200 font-serif text-xs tracking-wider active:scale-95 cursor-pointer hover:text-white transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Relive Our Story From Start</span>
              </button>

              <div className="pt-1">
                <button
                  onClick={onPrev}
                  className="text-xs font-serif text-rose-300/70 hover:text-rose-200 inline-flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <ArrowLeft className="w-3 h-3" />
                  <span>Previous Chapter</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ================= STATE 3: CELEBRATION (BUTTON TWO: PULL ME CLOSE IN OUR COUPÉ 🥺) ================= */}
        {responseState === 'hug' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="glass-burgundy border-2 border-rose-400/50 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 text-center relative overflow-hidden"
          >
            {/* Real Couple Hugging Animated Visual */}
            <VirtualHugIllustration squeezeTrigger={celebrationKey} />

            {/* Display Hug Title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-serif text-2xl sm:text-3xl font-bold text-rose-100 text-glow-rose"
            >
              {proposal.hugResponse.title}
            </motion.h2>

            {/* Narrative text */}
            <div className="space-y-2">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-cormorant italic text-base sm:text-lg text-amber-200 font-medium leading-relaxed"
              >
                "{proposal.hugResponse.message}"
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="font-cormorant italic text-sm sm:text-base text-rose-200/90 leading-relaxed"
              >
                "If I were beside you in our coupé right now, I wouldn't let this hug end so quickly."
              </motion.p>
            </div>

            {/* Show: "LOTS OF LOVE, YOUR BAVA AFZAL ❤️🔥" */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="pt-2 border-t border-rose-500/20"
            >
              <p className="font-serif text-sm tracking-widest text-amber-300 font-bold uppercase">
                LOTS OF LOVE, YOUR BAVA AFZAL ❤️🔥
              </p>
            </motion.div>

            {/* Buttons: Return to proposal & More hug confetti */}
            <div className="pt-1.5 flex flex-col gap-2">
              <button
                onClick={() => setResponseState('prompt')}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-burgundy-700 active:scale-95 text-white font-serif text-sm font-semibold tracking-wider shadow-xl border border-amber-300/40 cursor-pointer"
              >
                <Heart className="w-4 h-4 text-rose-200 fill-rose-200" />
                <span>{proposal.hugResponse.returnButtonText}</span>
              </button>

              <button
                onClick={() => {
                  setCelebrationKey(prev => prev + 1);
                  romanticAudio.playHugSound();
                }}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full glass-romantic border border-rose-400/30 text-rose-200 font-serif text-xs active:scale-95 cursor-pointer"
              >
                <span>Squeeze Hug Again 🫂💕</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>


    </div>
  );
};
