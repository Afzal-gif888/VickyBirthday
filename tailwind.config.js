/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          950: '#140307',
          900: '#26060e',
          800: '#3e0a16',
          700: '#5a0f21',
          600: '#7a142c',
        },
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        champagne: {
          50: '#fbf9f4',
          100: '#f5efe0',
          200: '#ebdcb9',
          300: '#dfc48d',
          400: '#d1aa5f',
          500: '#c4933d',
          600: '#b07a30',
        },
        universe: {
          void: '#07030d',
          dark: '#0c0617',
          deep: '#150928',
          mid: '#23103d',
          glow: '#43196f',
        }
      },
      fontFamily: {
        script: ['"Great Vibes"', 'cursive'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 7s ease-in-out infinite',
        'float-medium': 'float 5s ease-in-out infinite',
        'float-fast': 'float 3.5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'flicker': 'flicker 1.5s ease-in-out infinite alternate',
        'spin-slow': 'spin 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(3deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        flicker: {
          '0%': { transform: 'scale(1) skewX(-1deg)', opacity: '0.95' },
          '50%': { transform: 'scale(1.08, 0.95) skewX(2deg)', opacity: '1' },
          '100%': { transform: 'scale(0.96, 1.05) skewX(-2deg)', opacity: '0.9' },
        }
      }
    },
  },
  plugins: [],
}
