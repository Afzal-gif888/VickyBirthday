import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CosmicBackground } from './components/canvas/CosmicBackground';
import { SecretLockScreen } from './components/auth/SecretLockScreen';
import { MobileMusicWidget } from './components/layout/MobileMusicWidget';
import { DesktopGate } from './components/layout/DesktopGate';

import { Scene01Entrance } from './components/scenes/Scene01Entrance';
import { Scene02Birthday } from './components/scenes/Scene02Birthday';
import { Scene04FriendshipToLove } from './components/scenes/Scene04FriendshipToLove';
import { Scene05Relationship } from './components/scenes/Scene05Relationship';
import { Scene06Reasons } from './components/scenes/Scene06Reasons';
import { Scene07DarkLetter } from './components/scenes/Scene07DarkLetter';
import { Scene08Question } from './components/scenes/Scene08Question';
import { Scene09Proposal } from './components/scenes/Scene09Proposal';
import { Scene10ReturnJourney } from './components/scenes/Scene10ReturnJourney';

import { romanticAudio } from './utils/audioManager';

function App() {
  const [currentScene, setCurrentScene] = useState<number>(1);
  const TOTAL_SCENES = 9;

  // Secret Authentication state (persisted per session)
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        return sessionStorage.getItem('vicky_universe_auth') === 'true';
      } catch {
        return false;
      }
    }
    return false;
  });

  // Discovered Reasons state (12 of 12 required to open dark letter)
  const [discoveredReasons, setDiscoveredReasons] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = sessionStorage.getItem('vicky_discovered_reasons');
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  const handleDiscoverReason = (id: number) => {
    setDiscoveredReasons((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      try {
        sessionStorage.setItem('vicky_discovered_reasons', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Attempt autoplay immediately on mount as requested
  useEffect(() => {
    romanticAudio.attemptAutoplay();
  }, []);

  // Scroll mobile viewport smoothly to top on scene change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScene, isUnlocked]);

  // Determine dynamic cosmic canvas theme
  const getCosmicTheme = (): 'fairytale' | 'birthday' | 'luxury' => {
    if (!isUnlocked) return 'luxury';
    if (currentScene === 2) return 'birthday';
    if (currentScene >= 6) return 'luxury';
    return 'fairytale';
  };

  const nextScene = () => {
    setCurrentScene((prev) => Math.min(TOTAL_SCENES, prev + 1));
  };

  const prevScene = () => {
    setCurrentScene((prev) => Math.max(1, prev - 1));
  };

  const restartExperience = () => {
    setCurrentScene(1);
  };

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  const handleLock = () => {
    try {
      sessionStorage.removeItem('vicky_universe_auth');
      sessionStorage.removeItem('vicky_discovered_reasons');
    } catch {
      // storage fallback
    }
    setDiscoveredReasons([]);
    setIsUnlocked(false);
    setCurrentScene(1);
  };

  return (
    <DesktopGate>
      <div className="relative min-h-screen bg-[#07030d] text-rose-100 flex justify-center overflow-x-hidden selection:bg-rose-500 selection:text-white">
        {/* Dynamic Cosmic Background */}
        <CosmicBackground theme={getCosmicTheme()} />

        {/* Exclusively Centered Mobile Container (max-width: 430px) */}
        <div className="relative z-10 w-full max-w-[430px] mx-auto min-h-screen flex flex-col justify-between px-2 pt-14 pb-6 sm:pb-8 shadow-2xl bg-black/25 backdrop-blur-[1px] border-x border-rose-500/10">
          
          {/* Persistent Floating Mobile Music & Chapters Control: ♫ LOVER BGM */}
          <MobileMusicWidget
            onLock={isUnlocked ? handleLock : undefined}
            currentScene={isUnlocked ? currentScene : undefined}
            onSelectScene={isUnlocked ? setCurrentScene : undefined}
          />

          {/* Main Viewport: Secret Lock Screen or Story Chapters */}
          <main className="flex-1 flex flex-col justify-center w-full">
            <AnimatePresence mode="wait">
              {!isUnlocked ? (
                <motion.div
                  key="secret-lock"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <SecretLockScreen onUnlock={handleUnlock} />
                </motion.div>
              ) : (
                <motion.div
                  key={currentScene}
                  initial={{ opacity: 0, y: 12, filter: 'blur(3px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -12, filter: 'blur(3px)' }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full"
                >
                  {currentScene === 1 && <Scene01Entrance onNext={nextScene} />}
                  {currentScene === 2 && <Scene02Birthday onNext={nextScene} onPrev={prevScene} />}
                  {currentScene === 3 && <Scene04FriendshipToLove onNext={nextScene} onPrev={prevScene} />}
                  {currentScene === 4 && <Scene05Relationship onNext={nextScene} onPrev={prevScene} />}
                  {currentScene === 5 && (
                    <Scene06Reasons
                      discoveredReasons={discoveredReasons}
                      onDiscoverReason={handleDiscoverReason}
                      onNext={nextScene}
                      onPrev={prevScene}
                    />
                  )}
                  {currentScene === 6 && (
                    <Scene07DarkLetter
                      isFullyDiscovered={discoveredReasons.length >= 12}
                      discoveredCount={discoveredReasons.length}
                      onGoToReasons={() => setCurrentScene(5)}
                      onNext={nextScene}
                      onPrev={prevScene}
                    />
                  )}
                  {currentScene === 7 && <Scene08Question onNext={nextScene} onPrev={prevScene} />}
                  {currentScene === 8 && (
                    <Scene09Proposal
                      onNext={nextScene}
                      onRestart={restartExperience}
                      onPrev={prevScene}
                    />
                  )}
                  {currentScene === 9 && (
                    <Scene10ReturnJourney
                      onPrev={prevScene}
                      onRestart={restartExperience}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </DesktopGate>
  );
}

export default App;
