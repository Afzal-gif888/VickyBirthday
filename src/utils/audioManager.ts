/**
 * Persistent Background Music & Audio Engine for Vicky's Universe
 * Soundtrack: "Lover BGM"
 * 
 * Strict Requirements:
 * 1. Single persistent HTMLAudioElement throughout entire lifecycle.
 * 2. Starts Lover BGM from 00:00 with continuous looping (loop = true).
 * 3. Volume set to 0.7, preload = 'auto'.
 * 4. Immediate autoplay attempt upon application load.
 * 5. Detailed logging of autoplay result (no silent ignoring).
 * 6. Flawless user-interaction fallback on the very first touch/click.
 * 7. Continuity across all 9 chapters, transitions, and proposal animations.
 * 8. High-impact original train departure & arrival sound effects.
 */

const AUDIO_SRC = '/assets/music/lover-bgm.mp3';
const TRAIN_DEPARTURE_SRC = '/assets/sound/train-departure.wav';
const TRAIN_ARRIVAL_SRC = '/assets/sound/train-arrival.wav';

class RomanticAudioManager {
  private static instance: RomanticAudioManager;
  public audio: HTMLAudioElement | null = null;
  public trainDepartureAudio: HTMLAudioElement | null = null;
  public trainArrivalAudio: HTMLAudioElement | null = null;
  private audioCtx: AudioContext | null = null;
  public isPlaying = false;
  public isMuted = false;
  public volume = 0.7;
  public hasStarted = false;
  public autoplayBlocked = false;
  private hasAttemptedAutoplay = false;
  private isUnlocking = false;
  private listeners: Array<(state: { isPlaying: boolean; isMuted: boolean; volume: number }) => void> = [];

  private constructor() {
    if (typeof window !== 'undefined') {
      this.initPersistentAudio();
      this.setupGlobalInteractionFallback();
      this.setupVisibilityHandler();
    }
  }

  public static getInstance(): RomanticAudioManager {
    if (!RomanticAudioManager.instance) {
      RomanticAudioManager.instance = new RomanticAudioManager();
    }
    return RomanticAudioManager.instance;
  }

  /**
   * Initializes the single persistent HTMLAudioElement once.
   */
  private initPersistentAudio() {
    if (this.audio) return;

    try {
      this.audio = new Audio(AUDIO_SRC);
      this.audio.loop = true;
      this.audio.preload = 'auto';
      this.audio.volume = this.volume;

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.hasStarted = true;
        this.autoplayBlocked = false;
        console.log('[Lover BGM] Audio playback active (time: ' + (this.audio?.currentTime.toFixed(1) || 0) + 's)');
        this.notify();
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener('error', (e) => {
        const err = this.audio?.error;
        console.error('[Lover BGM] Audio loading/playback error:', err || e);
      });

      // Preload big original train sound effects
      try {
        this.trainDepartureAudio = new Audio(TRAIN_DEPARTURE_SRC);
        this.trainDepartureAudio.preload = 'auto';
        this.trainDepartureAudio.volume = 1.0;

        this.trainArrivalAudio = new Audio(TRAIN_ARRIVAL_SRC);
        this.trainArrivalAudio.preload = 'auto';
        this.trainArrivalAudio.volume = 1.0;
      } catch (trainErr) {
        console.warn('[Train Audio] Preload notice:', trainErr);
      }

      // Immediate Autoplay Attempt
      this.attemptAutoplay();
    } catch (err) {
      console.error('[Lover BGM] Failed to construct Audio element:', err);
    }
  }

  /**
   * Global fallback: If mobile browser policies blocked unmuted autoplay on load,
   * the very first tap or touch anywhere immediately unlocks and starts Lover BGM.
   */
  private setupGlobalInteractionFallback() {
    const handleFirstGesture = async () => {
      if (this.isUnlocking) return;
      this.isUnlocking = true;
      cleanup();

      if (!this.isPlaying) {
        console.log('[Lover BGM] First user gesture detected — unlocking audio playback');
        await this.startMusic();
      }
    };

    const cleanup = () => {
      window.removeEventListener('click', handleFirstGesture, true);
      window.removeEventListener('touchstart', handleFirstGesture, true);
      window.removeEventListener('pointerdown', handleFirstGesture, true);
    };

    window.addEventListener('click', handleFirstGesture, { capture: true, once: true });
    window.addEventListener('touchstart', handleFirstGesture, { capture: true, once: true });
    window.addEventListener('pointerdown', handleFirstGesture, { capture: true, once: true });
  }

  /**
   * Respect visibility changes (e.g. switching browser tabs).
   */
  private setupVisibilityHandler() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (this.audio && !this.audio.paused) {
          this.audio.pause();
        }
      } else {
        if (this.isPlaying && this.audio && this.audio.paused) {
          this.audio.play().catch(() => {});
        }
      }
    });
  }

  public subscribe(fn: (state: { isPlaying: boolean; isMuted: boolean; volume: number }) => void) {
    this.listeners.push(fn);
    fn({ isPlaying: this.isPlaying, isMuted: this.isMuted, volume: this.volume });
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  private notify() {
    this.listeners.forEach((fn) =>
      fn({ isPlaying: this.isPlaying, isMuted: this.isMuted, volume: this.volume })
    );
  }

  /**
   * Autoplay attempt immediately upon application mount.
   */
  public attemptAutoplay() {
    if (this.hasAttemptedAutoplay || !this.audio) return;
    this.hasAttemptedAutoplay = true;

    console.log('[Lover BGM] Initiating immediate autoplay attempt...');

    const playPromise = this.audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlaying = true;
          this.hasStarted = true;
          this.autoplayBlocked = false;
          console.log('[Lover BGM] Autoplay SUCCEEDED seamlessly on load!');
          this.notify();
        })
        .catch((err) => {
          this.autoplayBlocked = true;
          this.isPlaying = false;
          console.warn(
            '[Lover BGM] Autoplay blocked by mobile browser gesture policy. Ready to start on very first tap:',
            err?.name,
            err?.message
          );
          this.notify();
        });
    }
  }

  public async startMusic(): Promise<boolean> {
    this.initPersistentAudio();
    if (!this.audio) return false;

    try {
      this.audio.muted = this.isMuted;
      this.audio.volume = this.volume;
      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        await playPromise;
      }
      this.isPlaying = true;
      this.hasStarted = true;
      this.autoplayBlocked = false;
      this.notify();
      return true;
    } catch (err) {
      console.error('[Lover BGM] Manual play error:', err);
      return false;
    }
  }

  public pauseMusic() {
    if (this.audio) {
      this.audio.pause();
    }
    this.isPlaying = false;
    this.notify();
  }

  public toggleMusic() {
    if (this.isPlaying) {
      this.pauseMusic();
    } else {
      this.startMusic();
    }
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.audio) {
      this.audio.muted = this.isMuted;
    }
    if (this.trainDepartureAudio) {
      this.trainDepartureAudio.muted = this.isMuted;
    }
    if (this.trainArrivalAudio) {
      this.trainArrivalAudio.muted = this.isMuted;
    }
    this.notify();
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audio) {
      this.audio.volume = this.volume;
    }
    this.notify();
  }

  // --- Sound Effects using an independent AudioContext (Never interrupts Lover BGM) ---
  private initAudioContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
  }

  private playTone(freq: number, duration: number, gainVal: number, delay = 0) {
    if (this.isMuted) return;
    this.initAudioContext();
    if (!this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime + delay;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(gainVal, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // Audio protection
    }
  }

  private playBell(freq: number, gainVal: number) {
    if (this.isMuted) return;
    this.initAudioContext();
    if (!this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(gainVal, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 1.8);
    } catch {
      // Audio protection
    }
  }

  public playSparkleSound() {
    try {
      [880, 1174.66, 1396.91].forEach((f, i) => {
        setTimeout(() => this.playBell(f, 0.03), i * 60);
      });
    } catch {
      // Audio protection
    }
  }

  public playCandleBlowSound() {
    try {
      this.initAudioContext();
      if (!this.audioCtx || this.isMuted) return;
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.5);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.5);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.5);

      [523.25, 659.25, 783.99, 1046.50].forEach((f, idx) => {
        setTimeout(() => this.playBell(f, 0.08), idx * 90);
      });
    } catch {
      // Audio protection
    }
  }

  public playCelebrationSound() {
    try {
      [440, 554.37, 659.25, 880, 1108.73].forEach((f, idx) => {
        setTimeout(() => this.playBell(f, 0.1), idx * 100);
      });
    } catch {
      // Audio protection
    }
  }

  /**
   * Plays the BIG, authentic original train departure sound.
   * Multi-chime air locomotive horn blast + steam hiss + accelerating chug-chug.
   */
  public playTrainWhistle() {
    if (this.isMuted) return;

    // 1. Play real uncompressed stereo train departure audio
    try {
      if (!this.trainDepartureAudio) {
        this.trainDepartureAudio = new Audio(TRAIN_DEPARTURE_SRC);
        this.trainDepartureAudio.preload = 'auto';
      }
      this.trainDepartureAudio.currentTime = 0;
      this.trainDepartureAudio.volume = 1.0;
      const playPromise = this.trainDepartureAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('[Train Audio] HTMLAudio play error, using synth boost:', err);
          this.playBigTrainHornSynth();
        });
      }
    } catch (err) {
      console.warn('[Train Audio] Playback fallback triggered:', err);
      this.playBigTrainHornSynth();
    }

    // 2. Also layer instant sub-bass locomotive rumble via Web Audio for maximum punch
    this.playBigTrainHornSynth();
  }

  /**
   * Massive multi-chime horn synthesizer with deep sub-bass.
   */
  public playBigTrainHornSynth() {
    try {
      this.initAudioContext();
      if (!this.audioCtx || this.isMuted) return;
      const now = this.audioCtx.currentTime;

      // Chord: Sub-bass + D4 + F4 + A4 + C5 (Express Locomotive Horn)
      const frequencies = [146.8, 293.66, 349.23, 440.0, 523.25, 587.33];

      frequencies.forEach((freq, idx) => {
        const osc = this.audioCtx!.createOscillator();
        const gain = this.audioCtx!.createGain();

        osc.type = idx === 0 ? 'sine' : 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);

        const peakGain = idx === 0 ? 0.22 : 0.08;
        // Blast 1
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(peakGain, now + 0.06);
        gain.gain.setValueAtTime(peakGain, now + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.45);

        // Blast 2
        gain.gain.setValueAtTime(0.001, now + 1.6);
        gain.gain.linearRampToValueAtTime(peakGain * 1.2, now + 1.68);
        gain.gain.setValueAtTime(peakGain * 1.2, now + 3.6);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.2);

        osc.connect(gain);
        gain.connect(this.audioCtx!.destination);

        osc.start(now);
        osc.stop(now + 4.2);
      });
    } catch {
      // Audio protection
    }
  }

  /**
   * Plays the authentic train arrival sound with pneumatic brakes and bell.
   */
  public playTrainStop() {
    if (this.isMuted) return;
    try {
      if (!this.trainArrivalAudio) {
        this.trainArrivalAudio = new Audio(TRAIN_ARRIVAL_SRC);
        this.trainArrivalAudio.preload = 'auto';
      }
      this.trainArrivalAudio.currentTime = 0;
      this.trainArrivalAudio.volume = 1.0;
      const playPromise = this.trainArrivalAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } catch {
      // Fallback
      this.playTone(330, 1.0, 0.15);
      setTimeout(() => this.playBell(659.25, 0.15), 300);
      setTimeout(() => this.playBell(523.25, 0.15), 600);
      setTimeout(() => this.playBell(392.00, 0.15), 900);
    }
  }

  public playHugSound() {
    try {
      this.playTone(196.00, 2.0, 0.06);
      setTimeout(() => this.playTone(293.66, 2.0, 0.06), 200);
    } catch {
      // Audio protection
    }
  }

  public playTypewriterKeySound() {
    try {
      this.initAudioContext();
      if (!this.audioCtx || this.isMuted) return;
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600 + Math.random() * 250, now);
      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.03);
    } catch {
      // Audio protection
    }
  }
}

export const romanticAudio = RomanticAudioManager.getInstance();

if (typeof window !== 'undefined') {
  (window as unknown as { romanticAudio: RomanticAudioManager }).romanticAudio = romanticAudio;
}
