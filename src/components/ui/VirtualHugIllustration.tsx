import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const VirtualHugIllustration: React.FC = () => {
  return (
    <div className="relative w-44 h-44 sm:w-52 sm:h-52 mx-auto flex items-center justify-center select-none">
      {/* Outer Glow Ring */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-2 bg-gradient-to-tr from-rose-600/30 via-burgundy-600/30 to-champagne-300/20 rounded-full blur-xl"
      />

      {/* SVG Hugging Arms Animation */}
      <svg
        viewBox="0 0 240 240"
        className="relative z-10 w-full h-full filter drop-shadow-2xl"
      >
        <defs>
          <linearGradient id="armLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fda4af" />
            <stop offset="50%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#be123c" />
          </linearGradient>
          <linearGradient id="armRightGrad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fda4af" />
            <stop offset="50%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#be123c" />
          </linearGradient>
          <radialGradient id="centerHeartGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#fbcfe8" />
            <stop offset="80%" stopColor="#e11d48" />
            <stop offset="100%" stopColor="#881337" />
          </radialGradient>
        </defs>

        {/* Center Big Glowing Heart */}
        <motion.path
          animate={{ scale: [0.95, 1.08, 0.95] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '120px 120px' }}
          d="M120,80 C100,50 50,60 50,105 C50,145 100,175 120,195 C140,175 190,145 190,105 C190,60 140,50 120,80 Z"
          fill="url(#centerHeartGlow)"
          stroke="#fff1f2"
          strokeWidth="2.5"
        />

        {/* Left Arm wrapping around */}
        <motion.path
          animate={{
            d: [
              "M20,130 C30,90 70,100 115,115 C135,122 150,138 145,155 C140,168 125,168 110,158 C90,145 50,155 20,130 Z",
              "M20,130 C35,85 75,95 125,118 C145,128 158,142 152,158 C145,172 128,170 112,158 C88,142 45,152 20,130 Z",
              "M20,130 C30,90 70,100 115,115 C135,122 150,138 145,155 C140,168 125,168 110,158 C90,145 50,155 20,130 Z",
            ],
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          fill="url(#armLeftGrad)"
          stroke="#fff1f2"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Right Arm wrapping around */}
        <motion.path
          animate={{
            d: [
              "M220,130 C210,90 170,100 125,115 C105,122 90,138 95,155 C100,168 115,168 130,158 C150,145 190,155 220,130 Z",
              "M220,130 C205,85 165,95 115,118 C95,128 82,142 88,158 C95,172 112,170 128,158 C152,142 195,152 220,130 Z",
              "M220,130 C210,90 170,100 125,115 C105,122 90,138 95,155 C100,168 115,168 130,158 C150,145 190,155 220,130 Z",
            ],
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          fill="url(#armRightGrad)"
          stroke="#fff1f2"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Cute Face on Center Heart */}
        <g>
          {/* Eyes: Happy curved closed eyes */}
          <path d="M102,110 Q108,103 114,110" fill="none" stroke="#5a0f21" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M126,110 Q132,103 138,110" fill="none" stroke="#5a0f21" strokeWidth="2.5" strokeLinecap="round" />
          {/* Sweet blush circles */}
          <circle cx="98" cy="118" r="4.5" fill="#f43f5e" opacity="0.6" />
          <circle cx="142" cy="118" r="4.5" fill="#f43f5e" opacity="0.6" />
          {/* Cute smile */}
          <path d="M116,122 Q120,127 124,122" fill="none" stroke="#5a0f21" strokeWidth="2" strokeLinecap="round" />
        </g>
      </svg>

      {/* Floating Little Hearts Around the Hug */}
      <motion.div
        animate={{ y: [-5, -25, -5], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-1 left-6"
      >
        <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
      </motion.div>
      <motion.div
        animate={{ y: [5, -20, 5], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute -top-3 right-8"
      >
        <Heart className="w-4 h-4 text-champagne-300 fill-champagne-300" />
      </motion.div>
      <motion.div
        animate={{ y: [0, -18, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        className="absolute bottom-2 right-4"
      >
        <span className="text-xl">💌</span>
      </motion.div>
    </div>
  );
};
