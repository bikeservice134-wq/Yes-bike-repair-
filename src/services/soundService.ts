/**
 * YES BIKE SERVICE - Admin Audio Notification Service
 * Synthesizes crisp, high-clarity notification sounds for new incoming bookings
 * using the browser's native Web Audio API (zero external assets or network latency).
 */

export type AlertSoundTone = 'doorstep' | 'two_tone' | 'arpeggio' | 'dispatch';

export interface SoundConfig {
  enabled: boolean;
  volume: number; // 0.0 to 1.0
  tone: AlertSoundTone;
}

const STORAGE_KEY_SOUND_CONFIG = 'yesbike_admin_sound_config';

const DEFAULT_CONFIG: SoundConfig = {
  enabled: true,
  volume: 0.8,
  tone: 'doorstep'
};

class SoundService {
  private audioCtx: AudioContext | null = null;
  private config: SoundConfig = DEFAULT_CONFIG;
  private userInteracted = false;

  constructor() {
    this.loadConfig();
    this.initInteractionListener();
  }

  private loadConfig() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SOUND_CONFIG);
      if (saved) {
        this.config = { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
      }
    } catch {
      this.config = DEFAULT_CONFIG;
    }
  }

  public saveConfig(newConfig: Partial<SoundConfig>) {
    this.config = { ...this.config, ...newConfig };
    try {
      localStorage.setItem(STORAGE_KEY_SOUND_CONFIG, JSON.stringify(this.config));
    } catch {
      // ignore
    }
  }

  public getConfig(): SoundConfig {
    return { ...this.config };
  }

  /**
   * Request browser desktop notification permission
   */
  public async requestNotificationPermission(): Promise<NotificationPermission> {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        return await Notification.requestPermission();
      } catch {
        return 'denied';
      }
    }
    return 'denied';
  }

  /**
   * Display native desktop notification when document is not in focus
   */
  public triggerDesktopNotification(title: string, body: string) {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon: '/favicon.ico'
        });
      } catch {
        // ignore
      }
    }
  }

  /**
   * Listen for user interaction to resume AudioContext (browser autoplay policy)
   */
  private initInteractionListener() {
    if (typeof window === 'undefined') return;
    const unlock = () => {
      this.userInteracted = true;
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume().catch(() => {});
      }
      window.removeEventListener('click', unlock);
      window.removeEventListener('keydown', unlock);
      window.removeEventListener('touchstart', unlock);
    };
    window.addEventListener('click', unlock, { once: true, passive: true });
    window.addEventListener('keydown', unlock, { once: true, passive: true });
    window.addEventListener('touchstart', unlock, { once: true, passive: true });
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended' && this.userInteracted) {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  /**
   * Play the new booking alert sound based on current configuration
   */
  public playNewBookingSound(toneOverride?: AlertSoundTone) {
    if (!this.config.enabled && !toneOverride) return;

    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      const selectedTone = toneOverride || this.config.tone;
      const masterVol = Math.max(0.05, Math.min(1, this.config.volume));

      switch (selectedTone) {
        case 'doorstep':
          this.playDoorstepChime(ctx, masterVol);
          break;
        case 'two_tone':
          this.playTwoTone(ctx, masterVol);
          break;
        case 'arpeggio':
          this.playArpeggio(ctx, masterVol);
          break;
        case 'dispatch':
          this.playDispatchBeep(ctx, masterVol);
          break;
        default:
          this.playDoorstepChime(ctx, masterVol);
      }
    } catch (err) {
      console.warn('[Audio Alert] Error synthesizing sound:', err);
    }
  }

  /**
   * Tone 1: Doorstep Chime (Classic rich "Ding-Dong" arrival bell)
   * High note (G5 / 784Hz) then Warm note (E5 / 659Hz)
   */
  private playDoorstepChime(ctx: AudioContext, volume: number) {
    const now = ctx.currentTime;

    // Ding (G5)
    this.createBellHarmonic(ctx, 783.99, now, 0.45, volume);

    // Dong (E5) after 260ms
    this.createBellHarmonic(ctx, 659.25, now + 0.26, 0.75, volume * 1.1);
  }

  /**
   * Tone 2: Two-Tone High Clarity Ping (D5 -> A5)
   */
  private playTwoTone(ctx: AudioContext, volume: number) {
    const now = ctx.currentTime;
    this.createSinePulse(ctx, 587.33, now, 0.22, volume * 0.9);
    this.createSinePulse(ctx, 880.00, now + 0.16, 0.45, volume);
  }

  /**
   * Tone 3: Harmonic Arpeggio (C5 -> E5 -> G5 -> C6)
   */
  private playArpeggio(ctx: AudioContext, volume: number) {
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      this.createBellHarmonic(ctx, freq, now + idx * 0.11, 0.35, volume * 0.85);
    });
  }

  /**
   * Tone 4: Express Dispatch Alert (Fast crisp electronic twin chime)
   */
  private playDispatchBeep(ctx: AudioContext, volume: number) {
    const now = ctx.currentTime;
    this.createTrianglePulse(ctx, 880.0, now, 0.12, volume);
    this.createTrianglePulse(ctx, 1174.66, now + 0.14, 0.28, volume * 0.95);
  }

  /**
   * Helper: Bell with rich overtone harmonics & exponential decay
   */
  private createBellHarmonic(
    ctx: AudioContext,
    freq: number,
    startTime: number,
    duration: number,
    vol: number
  ) {
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, startTime);
    masterGain.gain.linearRampToValueAtTime(vol * 0.55, startTime + 0.015);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
    masterGain.connect(ctx.destination);

    // Fundamental sine
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, startTime);
    osc1.connect(masterGain);
    osc1.start(startTime);
    osc1.stop(startTime + duration);

    // Harmonic 2 (2x overtone for chime richness)
    const gain2 = ctx.createGain();
    gain2.gain.setValueAtTime(vol * 0.25, startTime);
    gain2.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.7);
    gain2.connect(ctx.destination);

    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2.01, startTime);
    osc2.connect(gain2);
    osc2.start(startTime);
    osc2.stop(startTime + duration * 0.7);
  }

  /**
   * Helper: Pure Sine Pulse
   */
  private createSinePulse(
    ctx: AudioContext,
    freq: number,
    startTime: number,
    duration: number,
    vol: number
  ) {
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(vol * 0.6, startTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
    gain.connect(ctx.destination);

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);
    osc.connect(gain);
    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  /**
   * Helper: Triangle wave pulse for digital sharpness
   */
  private createTrianglePulse(
    ctx: AudioContext,
    freq: number,
    startTime: number,
    duration: number,
    vol: number
  ) {
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(vol * 0.5, startTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
    gain.connect(ctx.destination);

    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);
    osc.connect(gain);
    osc.start(startTime);
    osc.stop(startTime + duration);
  }
}

export const soundService = new SoundService();
