// Day/night cycle system
// One full cycle = ~120 seconds (2 minutes)
const CYCLE_DURATION = 120_000; // ms

export type TimeOfDay = 'dawn' | 'day' | 'dusk' | 'night';

export interface LightingState {
  overlay: string;       // rgba overlay color
  ambientLight: number;  // 0-1 brightness multiplier
  timeOfDay: TimeOfDay;
  lampGlow: number;      // 0-1 lamp intensity
  progress: number;      // 0-1 cycle progress
}

export const getLightingState = (elapsed: number): LightingState => {
  const progress = (elapsed % CYCLE_DURATION) / CYCLE_DURATION;

  // Phases: dawn 0-0.15, day 0.15-0.5, dusk 0.5-0.65, night 0.65-1.0
  if (progress < 0.15) {
    // Dawn
    const t = progress / 0.15;
    return {
      overlay: `rgba(255, 180, 100, ${0.2 * (1 - t)})`,
      ambientLight: 0.6 + 0.4 * t,
      timeOfDay: 'dawn',
      lampGlow: 1 - t,
      progress,
    };
  } else if (progress < 0.5) {
    // Day
    return {
      overlay: 'rgba(0, 0, 0, 0)',
      ambientLight: 1,
      timeOfDay: 'day',
      lampGlow: 0,
      progress,
    };
  } else if (progress < 0.65) {
    // Dusk
    const t = (progress - 0.5) / 0.15;
    return {
      overlay: `rgba(180, 80, 50, ${0.25 * t})`,
      ambientLight: 1 - 0.4 * t,
      timeOfDay: 'dusk',
      lampGlow: t,
      progress,
    };
  } else {
    // Night
    const t = (progress - 0.65) / 0.35;
    const pulse = Math.sin(t * Math.PI * 4) * 0.05;
    return {
      overlay: `rgba(10, 10, 40, ${0.45 + pulse})`,
      ambientLight: 0.55,
      timeOfDay: 'night',
      lampGlow: 0.8 + pulse,
      progress,
    };
  }
};

export const drawLightingOverlay = (
  ctx: CanvasRenderingContext2D,
  cw: number,
  ch: number,
  lighting: LightingState,
  lampPositions: { sx: number; sy: number }[]
) => {
  // Apply ambient overlay
  ctx.fillStyle = lighting.overlay;
  ctx.fillRect(0, 0, cw, ch);

  // Draw lamp glow circles during dusk/night/dawn
  if (lighting.lampGlow > 0.05) {
    ctx.globalCompositeOperation = 'lighter';
    for (const lamp of lampPositions) {
      const gradient = ctx.createRadialGradient(lamp.sx, lamp.sy, 0, lamp.sx, lamp.sy, 60);
      const alpha = lighting.lampGlow * 0.15;
      gradient.addColorStop(0, `rgba(255, 215, 0, ${alpha})`);
      gradient.addColorStop(0.5, `rgba(255, 200, 50, ${alpha * 0.4})`);
      gradient.addColorStop(1, 'rgba(255, 200, 50, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(lamp.sx - 60, lamp.sy - 60, 120, 120);
    }
    ctx.globalCompositeOperation = 'source-over';
  }
};
