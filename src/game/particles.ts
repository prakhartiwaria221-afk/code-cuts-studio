// Particle system for environmental effects
export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  alpha: number;
  type: 'leaf' | 'firefly' | 'dust' | 'sparkle' | 'bubble' | 'footstep';
}

const MAX_PARTICLES = 120;
const particles: Particle[] = [];
let globalTimer = 0;

export const spawnParticle = (p: Omit<Particle, 'alpha'>) => {
  if (particles.length >= MAX_PARTICLES) particles.shift();
  particles.push({ ...p, alpha: 1 });
};

// Spawn environmental particles based on visible area
export const spawnEnvironmentParticles = (
  camX: number, camY: number, cw: number, ch: number,
  timeOfDay: string
) => {
  globalTimer++;

  // Floating leaves (always)
  if (globalTimer % 40 === 0) {
    spawnParticle({
      x: camX + Math.random() * cw,
      y: camY - 10,
      vx: -0.3 + Math.random() * 0.2,
      vy: 0.4 + Math.random() * 0.3,
      life: 200,
      maxLife: 200,
      size: 3,
      color: ['#4a8c3f', '#6b8c3f', '#8a6a3a', '#c4a87a'][Math.floor(Math.random() * 4)],
      type: 'leaf',
    });
  }

  // Dust motes (daytime)
  if (timeOfDay === 'day' && globalTimer % 25 === 0) {
    spawnParticle({
      x: camX + Math.random() * cw,
      y: camY + Math.random() * ch,
      vx: Math.random() * 0.3 - 0.15,
      vy: -0.1 + Math.random() * 0.2,
      life: 120,
      maxLife: 120,
      size: 1.5,
      color: '#fff',
      type: 'dust',
    });
  }

  // Fireflies (night/dusk)
  if ((timeOfDay === 'night' || timeOfDay === 'dusk') && globalTimer % 20 === 0) {
    spawnParticle({
      x: camX + Math.random() * cw,
      y: camY + 100 + Math.random() * (ch - 200),
      vx: Math.random() * 0.6 - 0.3,
      vy: Math.random() * 0.4 - 0.2,
      life: 180,
      maxLife: 180,
      size: 2,
      color: '#ffd700',
      type: 'firefly',
    });
  }
};

// Spawn footstep dust when player moves
export const spawnFootstepDust = (px: number, py: number) => {
  if (globalTimer % 12 !== 0) return;
  for (let i = 0; i < 2; i++) {
    spawnParticle({
      x: px + 12 + Math.random() * 8,
      y: py + 28 + Math.random() * 4,
      vx: Math.random() * 0.6 - 0.3,
      vy: -0.3 - Math.random() * 0.2,
      life: 20,
      maxLife: 20,
      size: 2,
      color: '#c4a87a',
      type: 'footstep',
    });
  }
};

// Spawn sparkles near interactive objects
export const spawnInteractionSparkle = (worldX: number, worldY: number) => {
  if (globalTimer % 30 !== 0) return;
  spawnParticle({
    x: worldX + Math.random() * 32,
    y: worldY + Math.random() * 32,
    vx: Math.random() * 0.4 - 0.2,
    vy: -0.5 - Math.random() * 0.3,
    life: 40,
    maxLife: 40,
    size: 2.5,
    color: '#ffd700',
    type: 'sparkle',
  });
};

// Spawn water bubbles
export const spawnWaterBubble = (worldX: number, worldY: number) => {
  if (globalTimer % 60 !== 0 || Math.random() > 0.3) return;
  spawnParticle({
    x: worldX + Math.random() * 32,
    y: worldY + 20 + Math.random() * 12,
    vx: 0,
    vy: -0.3,
    life: 40,
    maxLife: 40,
    size: 2,
    color: '#8ad0f0',
    type: 'bubble',
  });
};

export const updateParticles = () => {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.life--;
    p.alpha = Math.max(0, p.life / p.maxLife);

    // Leaf swaying
    if (p.type === 'leaf') {
      p.vx += Math.sin(globalTimer * 0.05 + i) * 0.02;
    }

    // Firefly wobble
    if (p.type === 'firefly') {
      p.vx += Math.sin(globalTimer * 0.08 + i * 2) * 0.03;
      p.vy += Math.cos(globalTimer * 0.06 + i * 3) * 0.02;
    }

    if (p.life <= 0) particles.splice(i, 1);
  }
};

export const drawParticles = (
  ctx: CanvasRenderingContext2D,
  camX: number,
  camY: number
) => {
  for (const p of particles) {
    const sx = p.x - camX;
    const sy = p.y - camY;

    ctx.globalAlpha = p.alpha;

    if (p.type === 'firefly') {
      // Glowing firefly
      const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, 6);
      glow.addColorStop(0, `rgba(255, 215, 0, ${p.alpha * 0.6})`);
      glow.addColorStop(1, 'rgba(255, 215, 0, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(sx - 6, sy - 6, 12, 12);
      ctx.fillStyle = p.color;
      ctx.fillRect(sx - 1, sy - 1, 2, 2);
    } else if (p.type === 'sparkle') {
      ctx.fillStyle = p.color;
      // Star shape
      ctx.fillRect(sx - 1, sy - p.size, 2, p.size * 2);
      ctx.fillRect(sx - p.size, sy - 1, p.size * 2, 2);
    } else if (p.type === 'leaf') {
      ctx.fillStyle = p.color;
      ctx.fillRect(sx, sy, p.size, p.size - 1);
      ctx.fillRect(sx + 1, sy - 1, p.size - 2, 1);
    } else {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(sx, sy, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
};

export const clearParticles = () => {
  particles.length = 0;
};
