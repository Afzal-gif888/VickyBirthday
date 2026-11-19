import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, FastForward, RotateCcw, ArrowRight, ArrowLeft, Lock, Sparkles } from 'lucide-react';
import { PERSONALIZATION } from '../../config/personalization';
import { romanticAudio } from '../../utils/audioManager';

interface Scene07DarkLetterProps {
  onNext: () => void;
  onPrev: () => void;
  isFullyDiscovered?: boolean;
  discoveredCount?: number;
  onGoToReasons?: () => void;
}

export const Scene07DarkLetter: React.FC<Scene07DarkLetterProps> = ({
  onNext,
  onPrev,
  isFullyDiscovered: propIsFullyDiscovered,
  discoveredCount: propDiscoveredCount,
  onGoToReasons,
}) => {
  const { darkLetter } = PERSONALIZATION;
  const [isOpen, setIsOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [lockError, setLockError] = useState<string | null>(null);

  // Read current discovered count from props or sessionStorage
  const getDiscoveredCount = (): number => {
    if (propDiscoveredCount !== undefined) return propDiscoveredCount;
    if (typeof window !== 'undefined') {
      try {
        const saved = sessionStorage.getItem('vicky_discovered_reasons');
        if (saved) {
          const ids = JSON.parse(saved);
          return Array.isArray(ids) ? ids.length : 0;
        }
      } catch {}
    }
    return 0;
  };

  const count = getDiscoveredCount();
  const isUnlocked = propIsFullyDiscovered !== undefined ? propIsFullyDiscovered : count >= 12;

  // Clean formatted content without redundant empty lines
  const signatureBlock = `${darkLetter.signOff}\n${darkLetter.senderName}`;
  const fullLetterContent = [
    darkLetter.recipient,
    ...darkLetter.paragraphs,
    signatureBlock,
  ].join('\n\n');

  const typewriterRef = useRef<number | null>(null);

  const startTypewriter = () => {
    setIsTyping(true);
    setDisplayedText('');
    setIsFinished(false);
    let index = 0;

    if (typewriterRef.current) clearInterval(typewriterRef.current);

    typewriterRef.current = window.setInterval(() => {
      index += 2;
      if (index <= fullLetterContent.length) {
        setDisplayedText(fullLetterContent.slice(0, index));
        if (index % 12 === 0) {
          romanticAudio.playTypewriterKeySound();
        }
      } else {
        setDisplayedText(fullLetterContent);
        setIsTyping(false);
        setIsFinished(true);
        if (typewriterRef.current) clearInterval(typewriterRef.current);
      }
    }, 22);
  };

  const handleOpenEnvelope = () => {
    if (isOpen) return;

    if (!isUnlocked) {
      romanticAudio.playTypewriterKeySound();
      setLockError(
        `This letter is sealed by your Bava's heart. You must uncover all 12 reasons in Chapter 05 to break this seal (${count}/12 discovered) ❤️`
      );
      return;
    }

    setIsOpen(true);
    romanticAudio.playSparkleSound();
    setTimeout(() => {
      startTypewriter();
    }, 600);
  };

  const handleSkip = () => {
    if (typewriterRef.current) clearInterval(typewriterRef.current);
    setDisplayedText(fullLetterContent);
    setIsTyping(false);
    setIsFinished(true);
    romanticAudio.playSparkleSound();
  };

  const handleRestart = () => {
    startTypewriter();
  };

  useEffect(() => {
    return () => {
      if (typewriterRef.current) clearInterval(typewriterRef.current);
    };
  }, []);

  // Split displayed text into paragraphs for exact CSS spacing control
  const paragraphs = displayedText.split('\n\n');

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-3 py-4 select-none w-full max-w-[430px] mx-auto text-center">
      {/* Dark Romance Midnight Aura */}
      <div className="absolute w-[340px] h-[340px] rounded-full bg-gradient-to-tr from-burgundy-950 via-rose-900/30 to-black blur-[90px] pointer-events-none" />

      {/* Falling Rose Petals Ambient Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, 360], x: [0, 20], rotate: [0, 180] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="absolute left-[10%] -top-8 text-xl opacity-40 filter drop-shadow"
        >
          🥀
        </motion.div>
        <motion.div
          animate={{ y: [0, 390], x: [0, -25], rotate: [0, -180] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear', delay: 3 }}
          className="absolute right-[12%] -top-8 text-2xl opacity-40 filter drop-shadow"
        >
          🌹
        </motion.div>
      </div>

      <div className="relative z-10 w-full space-y-3">
        {/* Dark Romance Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-black/60 border border-crimson-800/40 text-rose-300 text-[10px] font-mono tracking-widest uppercase">
            <span>Chapter 06</span>
            <span className="text-rose-500">•</span>
            <span className="text-amber-300">Dark Romance Epistle</span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-200 via-rose-200 to-rose-400 bg-clip-text text-transparent">
            A Letter From Your Bava
          </h2>
        </div>

        {/* ================= STATE 1: BLACK ENVELOPE ================= */}
        {!isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full bg-gradient-to-b from-[#11050a] via-[#090205] to-[#040102] border border-amber-400/40 rounded-3xl p-5 shadow-2xl space-y-4 text-center relative overflow-hidden"
          >
            {/* Candlelight glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-20 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />

            <div className="space-y-1 pt-1">
              <p className="font-serif text-lg font-semibold text-rose-100">
                {darkLetter.envelopeTitle}
              </p>
              <p className="font-cormorant italic text-xs text-rose-300/80">
                "{darkLetter.envelopeSubtitle}"
              </p>
            </div>

            {/* Deep Red Wax Heart Seal with V & A Monogram */}
            <div className="relative mx-auto w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-crimson-700 via-rose-900 to-burgundy-950 border-2 border-amber-300/80 shadow-2xl flex items-center justify-center p-4">
              <div className="text-center">
                <Heart className="w-7 h-7 text-crimson-400 fill-crimson-400/90 mx-auto animate-pulse" />
                <span className="font-serif text-[10px] tracking-widest text-amber-200 uppercase font-extrabold block mt-0.5">
                  V & A
                </span>
              </div>
            </div>

            {/* Locked Warning or Ready Indicator */}
            {!isUnlocked ? (
              <div className="p-3 rounded-2xl bg-black/60 border border-amber-500/30 text-amber-200 text-xs font-serif space-y-1 text-center">
                <div className="flex items-center justify-center gap-1.5 text-amber-300 font-bold uppercase text-[11px]">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Sealed with 12 Secret Locks</span>
                </div>
                <p className="font-cormorant italic text-xs text-rose-200/90">
                  "This letter is sealed by your Bava's heart. Discover all 12 reasons in Chapter 06 to break this seal."
                </p>
                <div className="pt-1">
                  <span className="inline-block px-3 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 font-mono text-[10px] font-bold">
                    Discovered: {count} of 12
                  </span>
                </div>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-400/40 text-emerald-300 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>All 12 Reasons Discovered • Ready to Open!</span>
              </div>
            )}

            {/* Lock Error Alert */}
            {lockError && (
              <p className="text-xs text-rose-300 font-cormorant italic bg-crimson-950/80 p-2 rounded-xl border border-rose-500/30">
                {lockError}
              </p>
            )}

            {/* Open or Return Button */}
            <div className="pt-1">
              {isUnlocked ? (
                <button
                  onClick={handleOpenEnvelope}
                  className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-full font-serif text-sm font-bold tracking-wider text-white shadow-2xl active:scale-95 transition-all bg-gradient-to-r from-crimson-800 via-rose-700 to-burgundy-800 border-2 border-amber-300/80 cursor-pointer animate-pulse hover:scale-[1.02]"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{darkLetter.openButtonText}</span>
                </button>
              ) : (
                <button
                  onClick={onGoToReasons || onPrev}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-serif text-xs font-bold tracking-wider text-amber-200 shadow-2xl active:scale-95 transition-all bg-gradient-to-r from-zinc-900 to-burgundy-950 border border-amber-400/40 cursor-pointer hover:text-white"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-amber-300" />
                  <span>DISCOVER ALL 12 REASONS FIRST ({count}/12)</span>
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          /* ================= STATE 2: REVEALED DARK BURGUNDY LETTER ================= */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full bg-gradient-to-b from-[#18040b] via-[#100207] to-[#080103] border border-amber-400/40 rounded-3xl p-4 sm:p-5 shadow-2xl text-left relative overflow-hidden"
          >
            {/* Header Toolbar */}
            <div className="flex justify-between items-center border-b border-rose-500/20 pb-2 mb-3">
              <span className="font-serif text-[10px] uppercase tracking-widest text-amber-300 font-semibold flex items-center gap-1">
                <span>🥀</span>
                <span>Midnight Epistle • V & A</span>
              </span>

              <div className="flex items-center gap-1.5">
                {isTyping && (
                  <button
                    onClick={handleSkip}
                    className="flex items-center gap-1 text-[10px] font-serif text-rose-200 active:bg-rose-950 px-2 py-0.5 rounded-full bg-black/60 border border-rose-500/30 cursor-pointer"
                  >
                    <FastForward className="w-3 h-3 text-amber-300" />
                    <span>Skip</span>
                  </button>
                )}

                {isFinished && (
                  <button
                    onClick={handleRestart}
                    className="flex items-center gap-1 text-[10px] font-serif text-rose-300 active:text-white px-2 py-0.5 rounded-full bg-black/60 border border-rose-500/20 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3 text-rose-400" />
                    <span>Re-read</span>
                  </button>
                )}
              </div>
            </div>

            {/* Letter Body */}
            <div className="space-y-4 max-h-[58vh] overflow-y-auto pr-1 select-text scroll-smooth">
              {paragraphs.map((paragraph, idx) => {
                const isGreeting = idx === 0;
                const isSignature = idx === paragraphs.length - 1;

                if (isGreeting) {
                  return (
                    <h3
                      key={idx}
                      className="font-serif text-lg font-bold text-amber-200 border-b border-rose-500/15 pb-2"
                    >
                      {paragraph}
                    </h3>
                  );
                }

                if (isSignature) {
                  return (
                    <div
                      key={idx}
                      className="pt-4 border-t border-rose-500/20 text-right space-y-1 font-script text-2xl text-rose-200"
                    >
                      <pre className="font-script text-2xl text-rose-200 whitespace-pre-wrap leading-relaxed">
                        {paragraph}
                      </pre>
                    </div>
                  );
                }

                return (
                  <p
                    key={idx}
                    className="font-cormorant italic text-sm sm:text-base text-rose-100/90 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                );
              })}

              {isTyping && (
                <span className="inline-block w-2 h-4 bg-amber-400 animate-pulse ml-0.5 align-middle" />
              )}
            </div>

            {/* Finished Note & Action Buttons */}
            <AnimatePresence>
              {isFinished && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mt-4 pt-3 border-t border-rose-500/25 space-y-3 text-center"
                >
                  {/* Deep Red Animated Rose */}
                  <div className="text-3xl filter drop-shadow-lg animate-pulse">
                    🌹
                  </div>

                  {/* Poetic Closing Line */}
                  <p className="font-cormorant italic text-xs sm:text-sm text-amber-200 max-w-xs mx-auto leading-relaxed">
                    "{darkLetter.closingLine}"
                  </p>

                  {/* Action Buttons: Back + Next as usual */}
                  <div className="pt-2 flex items-center justify-between gap-3">
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

                    <button
                      onClick={() => {
                        romanticAudio.playSparkleSound();
                        onNext();
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-full font-serif text-xs sm:text-sm font-bold tracking-wider text-white shadow-2xl active:scale-95 transition-all bg-gradient-to-r from-crimson-800 via-rose-700 to-burgundy-950 border border-amber-300/60 cursor-pointer"
                    >
                      <span>{darkLetter.nextButtonText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Back navigation when envelope is closed */}
        {!isOpen && (
          <div className="pt-1">
            <button
              onClick={() => {
                romanticAudio.playSparkleSound();
                onPrev();
              }}
              className="px-4 py-2 rounded-full glass-romantic border border-rose-500/20 text-rose-300 text-xs font-serif inline-flex items-center gap-1 active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Reasons</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
