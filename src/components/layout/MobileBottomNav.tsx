import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Heart } from 'lucide-react';

interface MobileBottomNavProps {
  currentScene: number;
  totalScenes: number;
  onSelectScene: (idx: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

const CHAPTER_TITLES = [
  'Magical Opening',
  'Happy Birthday',
  'From Passengers to Soulmates',
  'Our Relationship Story',
  'Reasons I Love You',
  'Dark Romance Letter',
  'One Last Question',
  'The Proposal & Celebration',
  "Safe in Bava's Arms",
];

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentScene,
  totalScenes = 9,
  onSelectScene,
  onNext,
  onPrev,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <nav aria-label="Mobile story navigation" className="fixed bottom-0 left-1/2 -translate-x-1/2 z-40 w-full max-w-[430px] px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-2 select-none pointer-events-none">
        <div className="glass-romantic border border-rose-500/30 rounded-2xl p-2 px-3 flex items-center justify-between shadow-2xl backdrop-blur-xl pointer-events-auto">
          {/* Back button */}
          <button
            onClick={onPrev}
            disabled={currentScene === 1}
            className={`p-1.5 rounded-full text-rose-200 transition-opacity ${
              currentScene === 1 ? 'opacity-30 cursor-not-allowed' : 'active:scale-90 hover:bg-rose-500/20'
            }`}
            aria-label="Previous chapter"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Indicator: Heart + Visual Progress Dots (No numbers) */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex flex-col items-center gap-1 px-4 py-1 rounded-xl active:bg-rose-500/20"
          >
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalScenes }).map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentScene === i + 1
                      ? 'w-3.5 bg-rose-400 shadow-sm shadow-rose-400'
                      : 'w-1 bg-rose-500/30'
                  }`}
                />
              ))}
            </div>
          </button>

          {/* Next button */}
          <button
            onClick={onNext}
            disabled={currentScene === totalScenes}
            className={`p-1.5 rounded-full text-rose-200 transition-opacity ${
              currentScene === totalScenes ? 'opacity-30 cursor-not-allowed' : 'active:scale-90 hover:bg-rose-500/20'
            }`}
            aria-label="Next chapter"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Chapter Selection Drawer (No page numbers) */}
      {drawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Story Chapters"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end justify-center select-none animate-fadeIn"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="w-full max-w-[430px] glass-burgundy border-t-2 border-rose-500/40 rounded-t-3xl p-5 pb-[max(20px,env(safe-area-inset-bottom))] shadow-2xl space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-2 border-b border-rose-500/20">
              <span className="font-serif text-sm font-semibold text-rose-100 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/80" />
                <span>Chapters for Vicky</span>
              </span>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1 rounded-full text-rose-300 hover:text-white"
                aria-label="Close chapters menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-1.5 max-h-[60vh] overflow-y-auto pr-1">
              {CHAPTER_TITLES.map((title, idx) => {
                const num = idx + 1;
                const isActive = currentScene === num;
                return (
                  <button
                    key={num}
                    onClick={() => {
                      onSelectScene(num);
                      setDrawerOpen(false);
                    }}
                    className={`flex items-center justify-between p-2.5 px-3 rounded-xl text-left text-xs transition-all ${
                      isActive
                        ? 'bg-rose-600/40 border border-rose-400/60 text-white font-semibold'
                        : 'bg-rose-950/40 text-rose-200/80 active:bg-rose-900/40'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Heart className={`w-3 h-3 ${isActive ? 'text-amber-300 fill-amber-300' : 'text-rose-400/70'}`} />
                      <span>{title}</span>
                    </span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
