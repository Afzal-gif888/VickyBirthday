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
 */

const AUDIO_SRC = '/assets/music/lover-bgm.mp3';

class RomanticAudioManager {
  private static instance: RomanticAudioManager;
  public audio: HTMLAudioElement | null = null;
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
      window.removeEventListener('touchend', handleFirstGesture, true);
      window.removeEventListener('pointerdown', handleFirstGesture, true);
    };

    window.addEventListener('click', handleFirstGesture, { capture: true, once: true });
    window.addEventListener('touchstart', handleFirstGesture, { capture: true, once: true });
    window.addEventListener('touchend', handleFirstGesture, { capture: true, once: true });
    window.addEventListener('pointerdown', handleFirstGesture, { capture: true, once: true });
  }

  private setupVisibilityHandler() {
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && this.hasStarted && !this.isMuted && this.audio && this.audio.paused) {
        this.audio.play().catch(() => {});
      }
    });
  }

  public subscribe(callback: (state: { isPlaying: boolean; isMuted: boolean; volume: number }) => void) {
    this.listeners.push(callback);
    callback({ isPlaying: this.isPlaying, isMuted: this.isMuted, volume: this.volume });
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  private notify() {
    this.listeners.forEach(cb => cb({ isPlaying: this.isPlaying, isMuted: this.isMuted, volume: this.volume }));
  }

  /**
   * Attempts autoplay immediately when the application loads.
   * Handles promise and logs exact status/error.
   */
  public async attemptAutoplay(): Promise<boolean> {
    if (!this.audio) return false;
    if (this.isPlaying && !this.audio.paused) return true;
    if (this.hasAttemptedAutoplay && this.autoplayBlocked) return false;
    this.hasAttemptedAutoplay = true;

    try {
      await this.audio.play();
      this.isPlaying = true;
      this.hasStarted = true;
      this.autoplayBlocked = false;
      console.log('Lover BGM started successfully via autoplay');
      this.notify();
      return true;
    } catch (error) {
      this.autoplayBlocked = true;
      this.isPlaying = false;
      console.warn('Autoplay blocked by browser policy:', error);
      this.notify();
      return false;
    }
  }

  /**
   * Starts Lover BGM.
   * - Starts at 00:00 on first launch.
   * - If already playing, maintains continuous smooth playback without restarting.
   */
  public async startMusic(): Promise<boolean> {
    if (!this.audio) {
      this.initPersistentAudio();
    }
    if (!this.audio) return false;

    // Do NOT restart or interrupt if already playing smoothly
    if (this.isPlaying && !this.audio.paused) {
      return true;
    }

    try {
      if (!this.hasStarted) {
        try {
          this.audio.currentTime = 0;
        } catch {
          // Ignore if currentTime cannot be set before metadata
        }
      }
      await this.audio.play();
      this.isPlaying = true;
      this.hasStarted = true;
      this.autoplayBlocked = false;
      console.log('Lover BGM started successfully');
      this.notify();
      return true;
    } catch (error) {
      this.autoplayBlocked = true;
      this.isPlaying = false;
      console.warn('Autoplay blocked by browser policy (user interaction required):', error);
      this.notify();
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

  public playTrainWhistle() {
    try {
      this.initAudioContext();
      if (!this.audioCtx || this.isMuted) return;
      this.playTone(440, 1.4, 0.08);
      this.playTone(554.37, 1.4, 0.07);
      setTimeout(() => {
        this.playTone(440, 1.2, 0.09);
        this.playTone(554.37, 1.2, 0.08);
        this.playTone(659.25, 1.0, 0.05);
      }, 400);
      setTimeout(() => this.playBell(880, 0.08), 800);
      setTimeout(() => this.playBell(1046.50, 0.08), 1000);
    } catch {
      // Audio protection
    }
  }

  public playTrainStop() {
    try {
      this.initAudioContext();
      if (!this.audioCtx || this.isMuted) return;
      this.playTone(330, 1.0, 0.06);
      setTimeout(() => this.playBell(659.25, 0.1), 300);
      setTimeout(() => this.playBell(523.25, 0.1), 600);
      setTimeout(() => this.playBell(392.00, 0.1), 900);
    } catch {
      // Audio protection
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
