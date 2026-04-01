// Magical audio engine - Harry Potter themed chiptune
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
    musicGain.gain.value = 0.12;
    musicGain.connect(audioCtx.destination);
    sfxGain = audioCtx.createGain();
    sfxGain.gain.value = 0.2;
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

// Magical footstep (stone corridor echo)
export const playStep = () => {
  stepTimer++;
  if (stepTimer % 12 !== 0) return;
  const freq = 60 + Math.random() * 30;
  playNote(freq, 0.06, 'triangle');
};

// Spell cast / interaction
export const playInteract = () => {
  const ctx = getCtx();
  const now = ctx.currentTime;
  [587, 740, 880, 1047].forEach((f, i) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = f;
    g.gain.setValueAtTime(0.15, now + i * 0.06);
    g.gain.exponentialRampToValueAtTime(0.01, now + i * 0.06 + 0.2);
    osc.connect(g);
    g.connect(sfxGain!);
    osc.start(now + i * 0.06);
    osc.stop(now + i * 0.06 + 0.2);
  });
};

// Dialog open (magical reveal)
export const playDialogOpen = () => {
  const ctx = getCtx();
  const now = ctx.currentTime;
  [330, 392, 494, 587, 659].forEach((f, i) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = f;
    g.gain.setValueAtTime(0.12, now + i * 0.07);
    g.gain.exponentialRampToValueAtTime(0.01, now + i * 0.07 + 0.25);
    osc.connect(g);
    g.connect(sfxGain!);
    osc.start(now + i * 0.07);
    osc.stop(now + i * 0.07 + 0.25);
  });
};

// Dialog close
export const playDialogClose = () => {
  const ctx = getCtx();
  const now = ctx.currentTime;
  [659, 494, 330].forEach((f, i) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = f;
    g.gain.setValueAtTime(0.08, now + i * 0.05);
    g.gain.exponentialRampToValueAtTime(0.01, now + i * 0.05 + 0.15);
    osc.connect(g);
    g.connect(sfxGain!);
    osc.start(now + i * 0.05);
    osc.stop(now + i * 0.05 + 0.15);
  });
};

// Menu select (magical chime)
export const playMenuSelect = () => {
  const ctx = getCtx();
  const now = ctx.currentTime;
  [494, 659, 988].forEach((f, i) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = f;
    g.gain.setValueAtTime(0.18, now + i * 0.1);
    g.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.2);
    osc.connect(g);
    g.connect(sfxGain!);
    osc.start(now + i * 0.1);
    osc.stop(now + i * 0.1 + 0.2);
  });
};

// Hogwarts-inspired melody (mysterious, magical minor key)
const MELODY = [
  330, 370, 440, 494, 523, 494, 440, 370,
  330, 392, 440, 523, 587, 523, 494, 440,
  370, 330, 294, 330, 370, 440, 494, 440,
  392, 370, 330, 294, 262, 294, 330, 370,
];

const BASS = [
  165, 165, 196, 196, 220, 220, 196, 196,
  165, 165, 196, 196, 247, 247, 220, 220,
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

    // Melody - use sine for ethereal feel
    const mFreq = MELODY[melodyIdx % MELODY.length];
    const mOsc = ctx.createOscillator();
    const mG = ctx.createGain();
    mOsc.type = 'sine';
    mOsc.frequency.value = mFreq;
    mG.gain.setValueAtTime(0.06, now);
    mG.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
    mOsc.connect(mG);
    mG.connect(musicGain!);
    mOsc.start(now);
    mOsc.stop(now + 0.35);
    melodyIdx++;

    if (melodyIdx % 2 === 0) {
      const bFreq = BASS[bassIdx % BASS.length];
      const bOsc = ctx.createOscillator();
      const bG = ctx.createGain();
      bOsc.type = 'triangle';
      bOsc.frequency.value = bFreq;
      bG.gain.setValueAtTime(0.04, now);
      bG.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      bOsc.connect(bG);
      bG.connect(musicGain!);
      bOsc.start(now);
      bOsc.stop(now + 0.5);
      bassIdx++;
    }
  }, 320);
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
