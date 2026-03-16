// Chiptune audio engine using Web Audio API - no external dependencies
let audioCtx: AudioContext | null = null;
let musicGain: GainNode | null = null;
let sfxGain: GainNode | null = null;
let musicPlaying = false;
let musicInterval: number | null = null;
let stepTimer = 0;

const getCtx = (): AudioContext => {
  if (!audioCtx) {
    audioCtx = new AudioContext();
    musicGain = audioCtx.createGain();
    musicGain.gain.value = 0.15;
    musicGain.connect(audioCtx.destination);
    sfxGain = audioCtx.createGain();
    sfxGain.gain.value = 0.25;
    sfxGain.connect(audioCtx.destination);
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
};

const playNote = (freq: number, duration: number, type: OscillatorType = 'square', gain?: GainNode) => {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(0.3, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
  osc.connect(g);
  g.connect(gain || sfxGain!);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
};

// Walking footstep
export const playStep = () => {
  stepTimer++;
  if (stepTimer % 12 !== 0) return;
  const freq = 80 + Math.random() * 40;
  playNote(freq, 0.05, 'triangle');
};

// Interaction / door open
export const playInteract = () => {
  const ctx = getCtx();
  const now = ctx.currentTime;
  [523, 659, 784].forEach((f, i) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'square';
    osc.frequency.value = f;
    g.gain.setValueAtTime(0.2, now + i * 0.08);
    g.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.15);
    osc.connect(g);
    g.connect(sfxGain!);
    osc.start(now + i * 0.08);
    osc.stop(now + i * 0.08 + 0.15);
  });
};

// Dialog open
export const playDialogOpen = () => {
  const ctx = getCtx();
  const now = ctx.currentTime;
  [262, 330, 392, 523].forEach((f, i) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = f;
    g.gain.setValueAtTime(0.15, now + i * 0.06);
    g.gain.exponentialRampToValueAtTime(0.01, now + i * 0.06 + 0.2);
    osc.connect(g);
    g.connect(sfxGain!);
    osc.start(now + i * 0.06);
    osc.stop(now + i * 0.06 + 0.2);
  });
};

// Dialog close
export const playDialogClose = () => {
  const ctx = getCtx();
  const now = ctx.currentTime;
  [523, 392, 262].forEach((f, i) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = f;
    g.gain.setValueAtTime(0.1, now + i * 0.05);
    g.gain.exponentialRampToValueAtTime(0.01, now + i * 0.05 + 0.12);
    osc.connect(g);
    g.connect(sfxGain!);
    osc.start(now + i * 0.05);
    osc.stop(now + i * 0.05 + 0.12);
  });
};

// Menu select / start
export const playMenuSelect = () => {
  const ctx = getCtx();
  const now = ctx.currentTime;
  [440, 880].forEach((f, i) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'square';
    osc.frequency.value = f;
    g.gain.setValueAtTime(0.2, now + i * 0.1);
    g.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.15);
    osc.connect(g);
    g.connect(sfxGain!);
    osc.start(now + i * 0.1);
    osc.stop(now + i * 0.1 + 0.15);
  });
};

// Background chiptune melody loop
const MELODY = [
  262, 294, 330, 349, 392, 349, 330, 294,
  262, 330, 392, 523, 392, 330, 294, 262,
  349, 392, 440, 392, 349, 330, 294, 330,
  262, 294, 330, 392, 440, 392, 330, 262,
];

const BASS = [
  131, 131, 165, 165, 196, 196, 165, 165,
  131, 131, 165, 165, 175, 175, 131, 131,
];

let melodyIdx = 0;
let bassIdx = 0;

export const startMusic = () => {
  if (musicPlaying) return;
  getCtx();
  musicPlaying = true;
  melodyIdx = 0;
  bassIdx = 0;

  musicInterval = window.setInterval(() => {
    if (!musicPlaying) return;
    const ctx = getCtx();
    const now = ctx.currentTime;

    // Melody
    const mFreq = MELODY[melodyIdx % MELODY.length];
    const mOsc = ctx.createOscillator();
    const mG = ctx.createGain();
    mOsc.type = 'square';
    mOsc.frequency.value = mFreq;
    mG.gain.setValueAtTime(0.08, now);
    mG.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
    mOsc.connect(mG);
    mG.connect(musicGain!);
    mOsc.start(now);
    mOsc.stop(now + 0.25);
    melodyIdx++;

    // Bass (every 2 beats)
    if (melodyIdx % 2 === 0) {
      const bFreq = BASS[bassIdx % BASS.length];
      const bOsc = ctx.createOscillator();
      const bG = ctx.createGain();
      bOsc.type = 'triangle';
      bOsc.frequency.value = bFreq;
      bG.gain.setValueAtTime(0.06, now);
      bG.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      bOsc.connect(bG);
      bG.connect(musicGain!);
      bOsc.start(now);
      bOsc.stop(now + 0.4);
      bassIdx++;
    }
  }, 280);
};

export const stopMusic = () => {
  musicPlaying = false;
  if (musicInterval !== null) {
    clearInterval(musicInterval);
    musicInterval = null;
  }
};

export const toggleMusic = (): boolean => {
  if (musicPlaying) { stopMusic(); return false; }
  startMusic();
  return true;
};

export const initAudio = () => { getCtx(); };
