import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Clock } from 'lucide-react';

interface TimeElapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
}

export const AngelTimeCounter: React.FC = () => {
  const [elapsed, setElapsed] = useState<TimeElapsed>(() => calculateElapsed());

  function calculateElapsed(): TimeElapsed {
    // Birthdate: 20 November 2005
    const birthDate = new Date(2005, 10, 20, 0, 0, 0).getTime();
    const now = Date.now();
    const diff = Math.max(0, now - birthDate);

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds, totalSeconds };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed(calculateElapsed());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full relative mx-auto my-3 select-none"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400/30 via-rose-500/30 to-amber-300/30 rounded-2xl blur-sm" />
      
      <div className="relative glass-burgundy border-2 border-amber-300/50 rounded-2xl p-3 sm:p-4 text-center space-y-2.5 overflow-hidden">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-200 text-[10px] font-mono uppercase tracking-wider">
          <Clock className="w-3 h-3 text-amber-300 animate-spin-slow" />
          <span>Heaven's Angel On Earth • Lived Counter</span>
          <Sparkles className="w-3 h-3 text-amber-300" />
        </div>

        {/* Ticking Grid */}
        <div className="grid grid-cols-4 gap-1.5 pt-1">
          <div className="bg-black/50 border border-amber-400/30 rounded-xl py-2 px-1">
            <span className="block font-mono text-base sm:text-lg font-bold text-amber-200">
              {elapsed.days.toLocaleString()}
            </span>
            <span className="text-[9px] font-serif text-rose-300/80 uppercase tracking-wider">
              Days
            </span>
          </div>

          <div className="bg-black/50 border border-rose-500/30 rounded-xl py-2 px-1">
            <span className="block font-mono text-base sm:text-lg font-bold text-rose-200">
              {elapsed.hours.toString().padStart(2, '0')}
            </span>
            <span className="text-[9px] font-serif text-rose-300/80 uppercase tracking-wider">
              Hours
            </span>
          </div>

          <div className="bg-black/50 border border-amber-400/30 rounded-xl py-2 px-1">
            <span className="block font-mono text-base sm:text-lg font-bold text-amber-200">
              {elapsed.minutes.toString().padStart(2, '0')}
            </span>
            <span className="text-[9px] font-serif text-rose-300/80 uppercase tracking-wider">
              Mins
            </span>
          </div>

          <div className="bg-black/50 border border-rose-500/30 rounded-xl py-2 px-1">
            <span className="block font-mono text-base sm:text-lg font-bold text-rose-300 animate-pulse">
              {elapsed.seconds.toString().padStart(2, '0')}
            </span>
            <span className="text-[9px] font-serif text-rose-300/80 uppercase tracking-wider">
              Secs
            </span>
          </div>
        </div>

        {/* Heartfelt Note */}
        <p className="font-cormorant italic text-xs text-amber-100/90 leading-relaxed px-1">
          "Since <span className="font-semibold text-amber-200">20 November 2005</span>, you have blessed this world with pure beauty—and every single second has been leading your Bava to love you forever."
        </p>

        <div className="flex items-center justify-center gap-1 text-[10px] font-mono text-rose-300/70 pt-0.5 border-t border-rose-500/20">
          <Heart className="w-2.5 h-2.5 text-rose-400 fill-rose-400 animate-ping" />
          <span>Total heartbeat seconds: {elapsed.totalSeconds.toLocaleString()}s</span>
        </div>
      </div>
    </motion.div>
  );
};
