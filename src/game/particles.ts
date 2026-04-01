// Magical particle system - Harry Potter themed
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
  type: 'sparkle' | 'firefly' | 'dust' | 'wand' | 'bubble' | 'footstep' | 'owl_feather';
}

const MAX_PARTICLES = 150;
const particles: Particle[] = [];
let globalTimer = 0;

export const spawnParticle = (p: Omit<Particle, 'alpha'>) => {
  if (particles.length >= MAX_PARTICLES) particles.shift();
  particles.push({ ...p, alpha: 1 });
};

export const spawnEnvironmentParticles = (
  camX: number, camY: number, cw: number, ch: number,
  timeOfDay: string
) => {
  globalTimer++;

  // Floating magical sparkles (always - like Hogwarts corridors)
  if (globalTimer % 30 === 0) {
    spawnParticle({
      x: camX + Math.random() * cw,
      y: camY - 10,
      vx: -0.2 + Math.random() * 0.4,
      vy: 0.3 + Math.random() * 0.3,
      life: 180,
      maxLife: 180,
      size: 2,
      color: ['#ffd700', '#ffcc44', '#ffe066', '#fff8dc'][Math.floor(Math.random() * 4)],
      type: 'sparkle',
    });
  }

  // Owl feathers (gentle floating)
  if (globalTimer % 80 === 0) {
    spawnParticle({
      x: camX + Math.random() * cw,
      y: camY + Math.random() * ch * 0.3,
      vx: -0.3 + Math.random() * 0.2,
      vy: 0.2 + Math.random() * 0.2,
      life: 250,
      maxLife: 250,
      size: 3,
      color: '#e0d8cc',
      type: 'owl_feather',
    });
  }

  // Dust motes in candlelight (daytime)
  if (timeOfDay === 'day' && globalTimer % 20 === 0) {
    spawnParticle({
      x: camX + Math.random() * cw,
      y: camY + Math.random() * ch,
      vx: Math.random() * 0.2 - 0.1,
      vy: -0.1 + Math.random() * 0.15,
      life: 100,
      maxLife: 100,
      size: 1.5,
      color: '#ffd700',
      type: 'dust',
    });
  }

  // Magical wisps at night (like Patronus fragments)
  if ((timeOfDay === 'night' || timeOfDay === 'dusk') && globalTimer % 15 === 0) {
    spawnParticle({
      x: camX + Math.random() * cw,
      y: camY + 100 + Math.random() * (ch - 200),
      vx: Math.random() * 0.5 - 0.25,
      vy: Math.random() * 0.3 - 0.15,
      life: 160,
      maxLife: 160,
      size: 2.5,
      color: '#aaddff',
      type: 'firefly',
    });
  }
};

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
      color: '#5a5060',
      type: 'footstep',
    });
  }
};

export const spawnInteractionSparkle = (worldX: number, worldY: number) => {
  if (globalTimer % 25 !== 0) return;
  spawnParticle({
    x: worldX + Math.random() * 32,
    y: worldY + Math.random() * 32,
    vx: Math.random() * 0.4 - 0.2,
    vy: -0.5 - Math.random() * 0.3,
    life: 40,
    maxLife: 40,
    size: 2.5,
    color: '#ffd700',
    type: 'wand',
  });
};

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
    color: '#4466aa',
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

    if (p.type === 'sparkle' || p.type === 'owl_feather') {
      p.vx += Math.sin(globalTimer * 0.04 + i) * 0.015;
    }
    if (p.type === 'firefly') {
      p.vx += Math.sin(globalTimer * 0.06 + i * 2) * 0.025;
      p.vy += Math.cos(globalTimer * 0.05 + i * 3) * 0.015;
    }

    if (p.life <= 0) particles.splice(i, 1);
  }
};

export const drawParticles = (ctx: CanvasRenderingContext2D, camX: number, camY: number) => {
  for (const p of particles) {
    const sx = p.x - camX;
    const sy = p.y - camY;
    ctx.globalAlpha = p.alpha;

    if (p.type === 'firefly') {
      // Patronus-like wisp
      const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, 8);
      glow.addColorStop(0, `rgba(170, 221, 255, ${p.alpha * 0.5})`);
      glow.addColorStop(1, 'rgba(170, 221, 255, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(sx - 8, sy - 8, 16, 16);
      ctx.fillStyle = '#aaddff';
      ctx.fillRect(sx - 1, sy - 1, 2, 2);
    } else if (p.type === 'wand' || p.type === 'sparkle') {
      // Magical sparkle
      ctx.fillStyle = p.color;
      ctx.fillRect(sx - 1, sy - p.size, 2, p.size * 2);
      ctx.fillRect(sx - p.size, sy - 1, p.size * 2, 2);
      // Extra glow
      ctx.fillStyle = `rgba(255, 215, 0, ${p.alpha * 0.2})`;
      ctx.beginPath();
      ctx.arc(sx, sy, p.size + 1, 0, Math.PI * 2);
      ctx.fill();
    } else if (p.type === 'owl_feather') {
      ctx.fillStyle = p.color;
      ctx.fillRect(sx, sy, p.size, p.size - 1);
      ctx.fillRect(sx + 1, sy - 1, p.size - 2, 1);
      ctx.fillRect(sx, sy + p.size - 1, 1, 2);
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
