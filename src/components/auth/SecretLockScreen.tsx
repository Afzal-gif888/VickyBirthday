import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, KeyRound, User, Eye, EyeOff, Sparkles, Heart, ShieldCheck } from 'lucide-react';
import { romanticAudio } from '../../utils/audioManager';

interface SecretLockScreenProps {
  onUnlock: () => void;
}

const VALID_USERNAME = 'itsyourbday@46';
const VALID_PASSWORD = 'itsourlove@143';

export const SecretLockScreen: React.FC<SecretLockScreenProps> = ({ onUnlock }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [shake, setShake] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanUsername = username.trim();
    const cleanPassword = password.trim();

    // Check username (accepting Ayush@28 or ayush@28 to avoid mobile auto-capitalization issues)
    const isUserValid =
      cleanUsername === VALID_USERNAME ||
      cleanUsername.toLowerCase() === VALID_USERNAME.toLowerCase();

    // Check password (accepting itsourlove@143 or Itsourlove@143 to prevent mobile auto-caps lockouts)
    const isPassValid =
      cleanPassword === VALID_PASSWORD ||
      cleanPassword.toLowerCase() === VALID_PASSWORD.toLowerCase();

    if (isUserValid && isPassValid) {
      setErrorMsg(null);
      setIsSuccess(true);

      // Play unlock celebration sound & prime background music with this direct user gesture
      romanticAudio.playCelebrationSound();
      romanticAudio.startMusic();

      // Persist in session storage
      try {
        sessionStorage.setItem('vicky_universe_auth', 'true');
      } catch {
        // Storage fallback
      }

      // Smooth transition to the experience
      setTimeout(() => {
        onUnlock();
      }, 900);
    } else {
      setErrorMsg('Only our hearts hold this secret key. Please try again ❤️');
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-3 py-6 select-none w-full max-w-[430px] mx-auto text-center">
      {/* Background Luxury Ambient Glow */}
      <div className="absolute w-[360px] h-[360px] rounded-full bg-gradient-to-tr from-burgundy-950 via-rose-900/30 to-purple-950/20 blur-[100px] pointer-events-none" />

      {/* Main Glass Lock Card with Shake Animation on Error */}
      <motion.div
        animate={shake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full glass-burgundy border-2 border-rose-500/30 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6 overflow-hidden"
      >
        {/* Subtle Candlelight/Starlight Shimmer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 bg-champagne-400/10 rounded-full blur-2xl pointer-events-none" />

        {/* Animated Padlock Crest */}
        <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
          <motion.div
            animate={
              isSuccess
                ? { scale: [1, 1.25, 1.1], rotate: [0, -10, 0] }
                : { scale: [1, 1.05, 1] }
            }
            transition={{
              duration: isSuccess ? 0.6 : 2.5,
              repeat: isSuccess ? 0 : Infinity,
              ease: 'easeInOut',
            }}
            className={`w-20 h-20 rounded-full p-0.5 shadow-2xl flex items-center justify-center border transition-all duration-500 ${
              isSuccess
                ? 'bg-gradient-to-tr from-champagne-300 via-rose-400 to-amber-200 border-champagne-200 shadow-champagne-400/40'
                : 'bg-gradient-to-tr from-rose-700 via-rose-600 to-burgundy-800 border-rose-400/40 shadow-rose-950/80'
            }`}
          >
            <div className="w-full h-full rounded-full bg-[#12040b] flex items-center justify-center">
              {isSuccess ? (
                <Unlock className="w-9 h-9 text-champagne-300 fill-champagne-300/40 animate-pulse drop-shadow-lg" />
              ) : (
                <Lock className="w-9 h-9 text-rose-300 fill-rose-400/30 drop-shadow-md" />
              )}
            </div>
          </motion.div>

          {/* Golden Orbiting Sparkles */}
          <div className="absolute -top-1 -right-1">
            <Sparkles className="w-4 h-4 text-champagne-300 animate-spin-slow" />
          </div>
          <div className="absolute -bottom-1 -left-1">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/80 animate-pulse" />
          </div>
        </div>

        {/* Header Titles */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-rose-500/30 text-rose-300 text-[11px] font-mono tracking-widest uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-champagne-300" />
            <span>Private Sanctuary • For Us Only</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-bold bg-gradient-to-r from-champagne-200 via-rose-100 to-champagne-200 bg-clip-text text-transparent text-glow-rose">
            Our Secret Universe
          </h1>

          <p className="font-cormorant italic text-sm sm:text-base text-rose-200/80 max-w-xs mx-auto leading-relaxed">
            "A personal world made with all my love, protected just for the two of us."
          </p>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* Username Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-serif text-rose-300 tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-rose-400" />
              <span>Username</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrorMsg(null);
                }}
                placeholder="Enter username"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck="false"
                required
                className="w-full bg-black/60 border border-rose-500/30 rounded-2xl px-4 py-3.5 text-base text-rose-100 placeholder:text-rose-400/30 focus:outline-none focus:border-champagne-300 focus:ring-1 focus:ring-champagne-300 transition-all font-sans"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-serif text-rose-300 tracking-wider flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-rose-400" />
              <span>Secret Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg(null);
                }}
                placeholder="Enter password"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck="false"
                required
                className="w-full bg-black/60 border border-rose-500/30 rounded-2xl px-4 py-3.5 pr-11 text-base text-rose-100 placeholder:text-rose-400/30 focus:outline-none focus:border-champagne-300 focus:ring-1 focus:ring-champagne-300 transition-all font-sans"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-rose-400/70 hover:text-rose-200 transition-colors p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-2.5 rounded-xl bg-crimson-950/70 border border-rose-500/40 text-rose-200 text-xs font-cormorant italic text-center"
              >
                {errorMsg}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Unlock CTA Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            type="submit"
            disabled={isSuccess}
            className={`w-full relative inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-full font-serif text-sm sm:text-base font-bold tracking-wider text-white shadow-2xl transition-all duration-300 border cursor-pointer ${
              isSuccess
                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 border-champagne-300'
                : 'bg-gradient-to-r from-rose-600 via-rose-500 to-burgundy-700 border-champagne-300/60'
            }`}
          >
            {isSuccess ? (
              <>
                <Unlock className="w-5 h-5 text-champagne-200 animate-bounce" />
                <span className="text-white drop-shadow">Welcome In, My Bujji ❤️</span>
              </>
            ) : (
              <>
                <Heart className="w-5 h-5 text-rose-200 fill-rose-200 animate-pulse" />
                <span className="text-rose-50 drop-shadow tracking-wider">
                  UNLOCK OUR UNIVERSE ❤️
                </span>
                <Sparkles className="w-4 h-4 text-champagne-300 animate-spin-slow" />
              </>
            )}
          </motion.button>
        </form>

        {/* Footer Note */}
        <div className="border-t border-rose-500/15 pt-3 text-[11px] font-serif text-rose-300/50">
          Created with endless love by your Bava (Afzal) for Bujji ❤️
        </div>
      </motion.div>
    </div>
  );
};
