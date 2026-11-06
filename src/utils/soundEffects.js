// Synthesized sound effects using standard Web Audio API
// No external assets required, zero latency, works offline

class SoundController {
  constructor() {
    this.ctx = null;
    this.isMuted = false;

    // Load persisted mute preference if available
    try {
      const stored = localStorage.getItem("quiz_sound_muted");
      if (stored !== null) {
        this.isMuted = stored === "true";
      }
    } catch {
      // ignore
    }
  }

  init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    try {
      localStorage.setItem("quiz_sound_muted", String(this.isMuted));
    } catch {
      // ignore
    }
    return this.isMuted;
  }

  getMuted() {
    return this.isMuted;
  }

  playCorrect() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = "sine";
    osc2.type = "triangle";

    // Pleasant chord: A4 -> C#5 -> E5
    osc1.frequency.setValueAtTime(440, now);
    osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.12);

    osc2.frequency.setValueAtTime(554.37, now);
    osc2.frequency.exponentialRampToValueAtTime(880, now + 0.15);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.36);
    osc2.stop(now + 0.36);
  }

  playWrong() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(130, now + 0.25);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.31);
  }

  playTick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.03);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.05, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.035);
  }

  playTimeout() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Two quick buzzer pulses
    [0, 0.15].forEach((offset) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(180, now + offset);

      gain.gain.setValueAtTime(0.001, now + offset);
      gain.gain.linearRampToValueAtTime(0.12, now + offset + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + offset);
      osc.stop(now + offset + 0.13);
    });
  }

  playFanfare() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [
      { f: 523.25, start: 0, dur: 0.15 }, // C5
      { f: 659.25, start: 0.14, dur: 0.15 }, // E5
      { f: 783.99, start: 0.28, dur: 0.2 }, // G5
      { f: 1046.5, start: 0.45, dur: 0.5 }, // C6
    ];

    notes.forEach(({ f, start, dur }) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(f, now + start);

      gain.gain.setValueAtTime(0.001, now + start);
      gain.gain.linearRampToValueAtTime(0.2, now + start + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + start + dur);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + start);
      osc.stop(now + start + dur + 0.02);
    });
  }
}

export const sounds = new SoundController();
export default sounds;
