import { TILE_SIZE } from './mapData';

export interface Collectible {
  x: number;
  y: number;
  type: 'snitch' | 'chocolate_frog' | 'spell_book' | 'deathly_hallow';
  collected: boolean;
  color: string;
  points: number;
}

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
  // Golden Snitches along paths
  { x: 12, y: 17, type: 'snitch', collected: false, color: '#ffd700', points: 15 },
  { x: 16, y: 17, type: 'snitch', collected: false, color: '#ffd700', points: 15 },
  { x: 28, y: 17, type: 'snitch', collected: false, color: '#ffd700', points: 15 },
  { x: 34, y: 17, type: 'snitch', collected: false, color: '#ffd700', points: 15 },
  { x: 22, y: 8, type: 'snitch', collected: false, color: '#ffd700', points: 15 },
  { x: 22, y: 24, type: 'snitch', collected: false, color: '#ffd700', points: 15 },
  { x: 22, y: 12, type: 'snitch', collected: false, color: '#ffd700', points: 15 },
  { x: 22, y: 28, type: 'snitch', collected: false, color: '#ffd700', points: 15 },
  // Chocolate Frogs near buildings
  { x: 12, y: 14, type: 'chocolate_frog', collected: false, color: '#5a2a0a', points: 25 },
  { x: 32, y: 14, type: 'chocolate_frog', collected: false, color: '#5a2a0a', points: 25 },
  { x: 25, y: 10, type: 'chocolate_frog', collected: false, color: '#5a2a0a', points: 25 },
  { x: 19, y: 24, type: 'chocolate_frog', collected: false, color: '#5a2a0a', points: 25 },
  // Spell Books in corners
  { x: 5, y: 5, type: 'spell_book', collected: false, color: '#2244aa', points: 50 },
  { x: 40, y: 5, type: 'spell_book', collected: false, color: '#aa2244', points: 50 },
  { x: 5, y: 30, type: 'spell_book', collected: false, color: '#44aa22', points: 50 },
  { x: 40, y: 30, type: 'spell_book', collected: false, color: '#aa8822', points: 50 },
  // Deathly Hallows (rare)
  { x: 8, y: 8, type: 'deathly_hallow', collected: false, color: '#ddd', points: 100 },
  { x: 38, y: 24, type: 'deathly_hallow', collected: false, color: '#ddd', points: 100 },
];

export const SECRET_ZONES: SecretZone[] = [
  {
    x: 4, y: 4, w: 3, h: 3,
    discovered: false,
    name: 'Chamber of Secrets',
    message: '🐍 You found the Chamber of Secrets! Prakhar speaks Parseltongue (Python) too!',
  },
  {
    x: 38, y: 28, w: 3, h: 3,
    discovered: false,
    name: 'Shrieking Shack',
    message: '🏚️ You discovered the Shrieking Shack! Some say Prakhar debugs code here at midnight!',
  },
];

export const checkCollectibles = (px: number, py: number, collectibles: Collectible[]): Collectible | null => {
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

export const checkSecretZones = (px: number, py: number, zones: SecretZone[]): SecretZone | null => {
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

export const drawCollectible = (ctx: CanvasRenderingContext2D, c: Collectible, camX: number, camY: number, frame: number) => {
  if (c.collected) return;
  const sx = c.x * TILE_SIZE - camX;
  const sy = c.y * TILE_SIZE - camY;
  const bounce = Math.sin(frame * 0.06 + c.x + c.y) * 3;

  switch (c.type) {
    case 'snitch': {
      // Golden Snitch
      const w = 5 + Math.abs(Math.sin(frame * 0.1 + c.x)) * 3;
      ctx.fillStyle = '#ffd700';
      ctx.beginPath();
      ctx.ellipse(sx + 16, sy + 12 + bounce, w, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#daa520';
      ctx.beginPath();
      ctx.ellipse(sx + 16, sy + 12 + bounce, w - 2, 3, 0, 0, Math.PI * 2);
      ctx.fill();
      // Wings
      const wingFlap = Math.sin(frame * 0.2 + c.x) * 3;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.beginPath();
      ctx.ellipse(sx + 8, sy + 9 + bounce + wingFlap, 5, 2, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(sx + 24, sy + 9 + bounce - wingFlap, 5, 2, 0.3, 0, Math.PI * 2);
      ctx.fill();
      // Glow
      ctx.fillStyle = `rgba(255, 215, 0, ${0.15 + Math.sin(frame * 0.08) * 0.08})`;
      ctx.beginPath();
      ctx.arc(sx + 16, sy + 12 + bounce, 10, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'chocolate_frog': {
      // Chocolate Frog
      ctx.fillStyle = '#5a2a0a';
      ctx.fillRect(sx + 10, sy + 14 + bounce, 12, 8);
      ctx.fillRect(sx + 8, sy + 12 + bounce, 4, 4);
      ctx.fillRect(sx + 20, sy + 12 + bounce, 4, 4);
      // Eyes
      ctx.fillStyle = '#ffd700';
      ctx.fillRect(sx + 12, sy + 14 + bounce, 2, 2);
      ctx.fillRect(sx + 18, sy + 14 + bounce, 2, 2);
      // Legs
      ctx.fillStyle = '#4a1a00';
      const hop = Math.sin(frame * 0.1 + c.x * 3) > 0.5 ? -2 : 0;
      ctx.fillRect(sx + 8, sy + 20 + bounce + hop, 4, 4);
      ctx.fillRect(sx + 20, sy + 20 + bounce + hop, 4, 4);
      break;
    }
    case 'spell_book': {
      // Spell Book
      ctx.fillStyle = c.color;
      ctx.fillRect(sx + 8, sy + 8 + bounce, 16, 18);
      ctx.fillStyle = darkenCol(c.color, 0.7);
      ctx.fillRect(sx + 8, sy + 8 + bounce, 2, 18);
      ctx.fillRect(sx + 8, sy + 24 + bounce, 16, 2);
      // Pages
      ctx.fillStyle = '#e8e0d0';
      ctx.fillRect(sx + 10, sy + 10 + bounce, 12, 14);
      // Magical rune
      ctx.fillStyle = c.color;
      ctx.font = '8px "Press Start 2P"';
      ctx.textAlign = 'center';
      ctx.fillText('✦', sx + 16, sy + 20 + bounce);
      // Glow
      ctx.fillStyle = `rgba(100, 100, 255, ${0.1 + Math.sin(frame * 0.05 + c.y) * 0.06})`;
      ctx.beginPath();
      ctx.arc(sx + 16, sy + 16 + bounce, 12, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'deathly_hallow': {
      // Deathly Hallows symbol
      ctx.strokeStyle = '#ddd';
      ctx.lineWidth = 1.5;
      // Triangle
      ctx.beginPath();
      ctx.moveTo(sx + 16, sy + 4 + bounce);
      ctx.lineTo(sx + 24, sy + 22 + bounce);
      ctx.lineTo(sx + 8, sy + 22 + bounce);
      ctx.closePath();
      ctx.stroke();
      // Circle
      ctx.beginPath();
      ctx.arc(sx + 16, sy + 16 + bounce, 5, 0, Math.PI * 2);
      ctx.stroke();
      // Line
      ctx.beginPath();
      ctx.moveTo(sx + 16, sy + 4 + bounce);
      ctx.lineTo(sx + 16, sy + 22 + bounce);
      ctx.stroke();
      // Glow
      const rot = frame * 0.02;
      ctx.fillStyle = `rgba(255, 255, 255, ${0.08 + Math.sin(rot) * 0.05})`;
      ctx.beginPath();
      ctx.arc(sx + 16, sy + 14 + bounce, 14, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
  }
};

function darkenCol(hex: string, factor: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${Math.floor(r * factor)},${Math.floor(g * factor)},${Math.floor(b * factor)})`;
}

export const getScore = (collectibles: Collectible[]): number =>
  collectibles.filter(c => c.collected).reduce((sum, c) => sum + c.points, 0);

export const getCollectedCount = (collectibles: Collectible[]): number =>
  collectibles.filter(c => c.collected).length;
