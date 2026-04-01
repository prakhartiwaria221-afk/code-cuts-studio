// Hogwarts day/night cycle - magical atmosphere
const CYCLE_DURATION = 120_000;

export type TimeOfDay = 'dawn' | 'day' | 'dusk' | 'night';

export interface LightingState {
  overlay: string;
  ambientLight: number;
  timeOfDay: TimeOfDay;
  lampGlow: number;
  progress: number;
}

export const getLightingState = (elapsed: number): LightingState => {
  const progress = (elapsed % CYCLE_DURATION) / CYCLE_DURATION;

  if (progress < 0.15) {
    const t = progress / 0.15;
    return {
      overlay: `rgba(200, 140, 80, ${0.25 * (1 - t)})`,
      ambientLight: 0.5 + 0.5 * t,
      timeOfDay: 'dawn',
      lampGlow: 1 - t,
      progress,
    };
  } else if (progress < 0.5) {
    return {
      overlay: 'rgba(0, 0, 0, 0)',
      ambientLight: 1,
      timeOfDay: 'day',
      lampGlow: 0,
      progress,
    };
  } else if (progress < 0.65) {
    const t = (progress - 0.5) / 0.15;
    return {
      overlay: `rgba(60, 30, 80, ${0.3 * t})`,
      ambientLight: 1 - 0.45 * t,
      timeOfDay: 'dusk',
      lampGlow: t,
      progress,
    };
  } else {
    const t = (progress - 0.65) / 0.35;
    const pulse = Math.sin(t * Math.PI * 4) * 0.05;
    return {
      overlay: `rgba(5, 5, 30, ${0.5 + pulse})`,
      ambientLight: 0.45,
      timeOfDay: 'night',
      lampGlow: 0.85 + pulse,
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
  ctx.fillStyle = lighting.overlay;
  ctx.fillRect(0, 0, cw, ch);

  if (lighting.lampGlow > 0.05) {
    ctx.globalCompositeOperation = 'lighter';
    for (const lamp of lampPositions) {
      const gradient = ctx.createRadialGradient(lamp.sx, lamp.sy, 0, lamp.sx, lamp.sy, 70);
      const alpha = lighting.lampGlow * 0.18;
      gradient.addColorStop(0, `rgba(255, 180, 60, ${alpha})`);
      gradient.addColorStop(0.4, `rgba(255, 150, 30, ${alpha * 0.5})`);
      gradient.addColorStop(1, 'rgba(255, 150, 30, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(lamp.sx - 70, lamp.sy - 70, 140, 140);
    }
    ctx.globalCompositeOperation = 'source-over';
  }
};
