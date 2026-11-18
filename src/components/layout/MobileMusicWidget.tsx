import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, Lock, Compass, X, Heart } from 'lucide-react';
import { romanticAudio } from '../../utils/audioManager';
import { PERSONALIZATION } from '../../config/personalization';

interface MobileMusicWidgetProps {
  onLock?: () => void;
  currentScene?: number;
  onSelectScene?: (idx: number) => void;
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

export const MobileMusicWidget: React.FC<MobileMusicWidgetProps> = ({
  onLock,
  currentScene,
  onSelectScene,
}) => {
  const [isPlaying, setIsPlaying] = useState(romanticAudio.isPlaying);
  const [isMuted, setIsMuted] = useState(romanticAudio.isMuted);
  const [chaptersOpen, setChaptersOpen] = useState(false);

  useEffect(() => {
    const unsub = romanticAudio.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setIsMuted(state.isMuted);
    });

    return () => {
      unsub();
    };
  }, []);

  const handleToggle = () => {
    romanticAudio.toggleMusic();
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    romanticAudio.toggleMute();
  };

  return (
    <>
      <aside aria-label="Music player and controls" className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-full max-w-[430px] px-3 pointer-events-none select-none">
        <div className="flex items-center justify-between pointer-events-auto">
          {/* Compact Floating Music Pill */}
          <button
            type="button"
            onClick={handleToggle}
            className="cursor-pointer glass-romantic border border-rose-500/30 rounded-full px-3 py-1.5 flex items-center gap-2 shadow-lg shadow-black/50 backdrop-blur-md active:scale-95 transition-all duration-200"
            title={isPlaying ? 'Pause LOVER BGM' : 'Play LOVER BGM'}
          >
            {/* Animated Equalizer or Music Note */}
            {isPlaying && !isMuted ? (
              <div className="flex items-end gap-[2px] h-3 px-0.5">
                <span className="w-[2px] bg-rose-400 rounded-full animate-bounce [animation-duration:650ms]" style={{ height: '70%' }} />
                <span className="w-[2px] bg-champagne-300 rounded-full animate-bounce [animation-duration:450ms]" style={{ height: '100%' }} />
                <span className="w-[2px] bg-rose-400 rounded-full animate-bounce [animation-duration:850ms]" style={{ height: '40%' }} />
                <span className="w-[2px] bg-champagne-300 rounded-full animate-bounce [animation-duration:550ms]" style={{ height: '85%' }} />
              </div>
            ) : (
              <Music className="w-3.5 h-3.5 text-rose-300/80" />
            )}

            {/* Song Label: ♫ LOVER BGM */}
            <span className="text-[11px] font-mono tracking-wider text-rose-100 flex items-center gap-1.5">
              <span>♫</span>
              <span className="font-bold text-rose-200 tracking-wide">{PERSONALIZATION.music.title}</span>
            </span>

            {/* Mini Play / Pause Icon */}
            <div className="p-1 rounded-full bg-rose-950/60 text-rose-200 ml-0.5 border border-rose-500/20">
              {isPlaying ? (
                <Pause className="w-2.5 h-2.5 fill-rose-300 text-rose-300" />
              ) : (
                <Play className="w-2.5 h-2.5 fill-rose-300 text-rose-300" />
              )}
            </div>
          </button>

          {/* Right Action Icons: Chapters + Lock universe + Mute audio */}
          <div className="flex items-center gap-1.5">
            {/* Chapters navigation drawer trigger */}
            {onSelectScene && (
              <button
                type="button"
                onClick={() => setChaptersOpen(true)}
                className="pointer-events-auto p-2 rounded-full glass-romantic border border-amber-400/40 text-amber-200 hover:text-white shadow-md active:scale-90 transition-transform cursor-pointer"
                title="Browse Chapters"
                aria-label="Browse Chapters"
              >
                <Compass className="w-3.5 h-3.5 text-amber-300" />
              </button>
            )}

            {onLock && (
              <button
                type="button"
                onClick={onLock}
                className="pointer-events-auto p-2 rounded-full glass-romantic border border-rose-500/30 text-rose-300 hover:text-champagne-300 shadow-md active:scale-90 transition-transform cursor-pointer"
                title="Lock universe"
                aria-label="Lock secret universe"
              >
                <Lock className="w-3.5 h-3.5 text-rose-300" />
              </button>
            )}

            {/* Mute Button */}
            <button
              type="button"
              onClick={handleToggleMute}
              className="pointer-events-auto p-2 rounded-full glass-romantic border border-rose-500/30 text-rose-200 shadow-md active:scale-90 transition-transform cursor-pointer"
              aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
              title={isMuted ? 'Unmute audio' : 'Mute audio'}
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-rose-400" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-rose-200" />
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Chapters Drawer Modal - Clean & without page numbers */}
      {chaptersOpen && onSelectScene && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Story Chapters"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end justify-center select-none animate-fadeIn"
          onClick={() => setChaptersOpen(false)}
        >
          <div
            className="w-full max-w-[430px] glass-burgundy border-t-2 border-rose-500/40 rounded-t-3xl p-5 pb-[max(24px,env(safe-area-inset-bottom))] shadow-2xl space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-2 border-b border-rose-500/20">
              <span className="font-serif text-sm font-semibold text-rose-100 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/80" />
                <span>Our Story Chapters for Vicky</span>
              </span>
              <button
                onClick={() => setChaptersOpen(false)}
                className="p-1.5 rounded-full text-rose-300 hover:text-white"
                aria-label="Close chapters menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2 max-h-[60vh] overflow-y-auto pr-1">
              {CHAPTER_TITLES.map((title, idx) => {
                const num = idx + 1;
                const isActive = currentScene === num;
                return (
                  <button
                    key={num}
                    onClick={() => {
                      onSelectScene(num);
                      setChaptersOpen(false);
                    }}
                    className={`flex items-center justify-between p-3 rounded-2xl text-left text-xs transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-rose-600/50 to-burgundy-800/60 border border-amber-300/60 text-white font-semibold shadow-lg shadow-rose-950/60'
                        : 'bg-rose-950/40 text-rose-200/80 border border-rose-500/15 active:bg-rose-900/40 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Heart className={`w-3 h-3 ${isActive ? 'text-amber-300 fill-amber-300' : 'text-rose-400/70'}`} />
                      <span>{title}</span>
                    </span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping" />
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
