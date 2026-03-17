import { TILE_SIZE, MAP_W, MAP_H, T, isInteractive, BUILDING_LABELS, SPAWN } from './mapData';

// Collectible items scattered around the map
export interface Collectible {
  x: number;
  y: number;
  type: 'coin' | 'gem' | 'star' | 'scroll';
  collected: boolean;
  color: string;
  points: number;
}

// Secret areas
export interface SecretZone {
  x: number;
  y: number;
  w: number;
  h: number;
  discovered: boolean;
  name: string;
  message: string;
}

export const COLLECTIBLES: Collectible[] = [
  // Coins along paths
  { x: 10, y: 14, type: 'coin', collected: false, color: '#ffd700', points: 10 },
  { x: 14, y: 14, type: 'coin', collected: false, color: '#ffd700', points: 10 },
  { x: 25, y: 14, type: 'coin', collected: false, color: '#ffd700', points: 10 },
  { x: 30, y: 14, type: 'coin', collected: false, color: '#ffd700', points: 10 },
  { x: 19, y: 6, type: 'coin', collected: false, color: '#ffd700', points: 10 },
  { x: 19, y: 21, type: 'coin', collected: false, color: '#ffd700', points: 10 },
  { x: 20, y: 10, type: 'coin', collected: false, color: '#ffd700', points: 10 },
  { x: 20, y: 24, type: 'coin', collected: false, color: '#ffd700', points: 10 },
  // Gems near buildings
  { x: 10, y: 12, type: 'gem', collected: false, color: '#3498db', points: 25 },
  { x: 29, y: 12, type: 'gem', collected: false, color: '#e74c3c', points: 25 },
  { x: 22, y: 8, type: 'gem', collected: false, color: '#2ecc71', points: 25 },
  { x: 16, y: 21, type: 'gem', collected: false, color: '#9b59b6', points: 25 },
  // Stars in corners
  { x: 4, y: 3, type: 'star', collected: false, color: '#ffd700', points: 50 },
  { x: 36, y: 3, type: 'star', collected: false, color: '#ffd700', points: 50 },
  { x: 4, y: 26, type: 'star', collected: false, color: '#ffd700', points: 50 },
  { x: 36, y: 26, type: 'star', collected: false, color: '#ffd700', points: 50 },
  // Scrolls (rare)
  { x: 7, y: 7, type: 'scroll', collected: false, color: '#c4a87a', points: 100 },
  { x: 34, y: 20, type: 'scroll', collected: false, color: '#c4a87a', points: 100 },
];

export const SECRET_ZONES: SecretZone[] = [
  {
    x: 3, y: 3, w: 3, h: 3,
    discovered: false,
    name: 'Hidden Grove',
    message: '🌟 You found a secret grove! Prakhar loves exploring hidden corners of technology too!',
  },
  {
    x: 35, y: 25, w: 3, h: 3,
    discovered: false,
    name: 'Secret Beach',
    message: '🏖️ You discovered a secret beach! Like Prakhar, always seeking new horizons!',
  },
];

export const checkCollectibles = (
  px: number,
  py: number,
  collectibles: Collectible[]
): Collectible | null => {
  const ptx = Math.floor((px + TILE_SIZE / 2) / TILE_SIZE);
  const pty = Math.floor((py + TILE_SIZE / 2) / TILE_SIZE);

  for (const c of collectibles) {
    if (!c.collected && c.x === ptx && c.y === pty) {
      c.collected = true;
      return c;
    }
  }
  return null;
};

export const checkSecretZones = (
  px: number,
  py: number,
  zones: SecretZone[]
): SecretZone | null => {
  const ptx = Math.floor((px + TILE_SIZE / 2) / TILE_SIZE);
  const pty = Math.floor((py + TILE_SIZE / 2) / TILE_SIZE);

  for (const z of zones) {
    if (!z.discovered && ptx >= z.x && ptx < z.x + z.w && pty >= z.y && pty < z.y + z.h) {
      z.discovered = true;
      return z;
    }
  }
  return null;
};

export const drawCollectible = (
  ctx: CanvasRenderingContext2D,
  c: Collectible,
  camX: number,
  camY: number,
  frame: number
) => {
  if (c.collected) return;

  const sx = c.x * TILE_SIZE - camX;
  const sy = c.y * TILE_SIZE - camY;
  const bounce = Math.sin(frame * 0.06 + c.x + c.y) * 3;

  switch (c.type) {
    case 'coin': {
      const w = 6 + Math.abs(Math.sin(frame * 0.08 + c.x)) * 4;
      ctx.fillStyle = '#ffd700';
      ctx.beginPath();
      ctx.ellipse(sx + 16, sy + 12 + bounce, w, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#daa520';
      ctx.beginPath();
      ctx.ellipse(sx + 16, sy + 12 + bounce, w - 2, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffd700';
      ctx.font = '6px "Press Start 2P"';
      ctx.textAlign = 'center';
      ctx.fillText('P', sx + 16, sy + 14 + bounce);
      break;
    }
    case 'gem': {
      ctx.fillStyle = c.color;
      // Diamond shape
      ctx.beginPath();
      ctx.moveTo(sx + 16, sy + 6 + bounce);
      ctx.lineTo(sx + 22, sy + 14 + bounce);
      ctx.lineTo(sx + 16, sy + 22 + bounce);
      ctx.lineTo(sx + 10, sy + 14 + bounce);
      ctx.closePath();
      ctx.fill();
      // Highlight
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.beginPath();
      ctx.moveTo(sx + 16, sy + 6 + bounce);
      ctx.lineTo(sx + 19, sy + 14 + bounce);
      ctx.lineTo(sx + 16, sy + 14 + bounce);
      ctx.closePath();
      ctx.fill();
      // Sparkle
      const sparkle = Math.sin(frame * 0.1 + c.x * 3) > 0.7;
      if (sparkle) {
        ctx.fillStyle = '#fff';
        ctx.fillRect(sx + 14, sy + 8 + bounce, 2, 2);
      }
      break;
    }
    case 'star': {
      ctx.fillStyle = c.color;
      const rot = frame * 0.03;
      ctx.save();
      ctx.translate(sx + 16, sy + 14 + bounce);
      ctx.rotate(rot);
      for (let i = 0; i < 5; i++) {
        const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
        const innerAngle = angle + Math.PI / 5;
        if (i === 0) {
          ctx.beginPath();
          ctx.moveTo(Math.cos(angle) * 8, Math.sin(angle) * 8);
        } else {
          ctx.lineTo(Math.cos(angle) * 8, Math.sin(angle) * 8);
        }
        ctx.lineTo(Math.cos(innerAngle) * 3, Math.sin(innerAngle) * 3);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      break;
    }
    case 'scroll': {
      // Scroll body
      ctx.fillStyle = '#c4a87a';
      ctx.fillRect(sx + 10, sy + 8 + bounce, 12, 16);
      ctx.fillStyle = '#a88a5a';
      ctx.fillRect(sx + 8, sy + 8 + bounce, 16, 3);
      ctx.fillRect(sx + 8, sy + 21 + bounce, 16, 3);
      // Text lines
      ctx.fillStyle = '#5a3a1a';
      ctx.fillRect(sx + 12, sy + 13 + bounce, 8, 1);
      ctx.fillRect(sx + 12, sy + 16 + bounce, 6, 1);
      ctx.fillRect(sx + 12, sy + 19 + bounce, 7, 1);
      // Glow
      ctx.fillStyle = `rgba(196, 168, 122, ${0.2 + Math.sin(frame * 0.05) * 0.1})`;
      ctx.beginPath();
      ctx.arc(sx + 16, sy + 16 + bounce, 12, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
  }
};

export const getScore = (collectibles: Collectible[]): number =>
  collectibles.filter(c => c.collected).reduce((sum, c) => sum + c.points, 0);

export const getCollectedCount = (collectibles: Collectible[]): number =>
  collectibles.filter(c => c.collected).length;
