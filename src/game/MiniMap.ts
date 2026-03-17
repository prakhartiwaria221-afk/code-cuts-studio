import { gameMap, TILE_SIZE, MAP_W, MAP_H, T, BUILDING_LABELS } from './mapData';

const MINIMAP_SCALE = 3; // pixels per tile
const MINIMAP_W = MAP_W * MINIMAP_SCALE;
const MINIMAP_H = MAP_H * MINIMAP_SCALE;
const PADDING = 8;
const BORDER = 2;

const TILE_COLORS: Record<number, string> = {
  [T.GRASS]: '#4a8c3f',
  [T.GRASS_DARK]: '#3d7a33',
  [T.PATH]: '#c4a87a',
  [T.WATER]: '#3d7ea6',
  [T.TREE]: '#2d6b1e',
  [T.WALL]: '#7a6b5a',
  [T.ROOF]: '#b84a3a',
  [T.DOOR_ABOUT]: '#daa520',
  [T.DOOR_SKILLS]: '#daa520',
  [T.DOOR_PROJECTS]: '#daa520',
  [T.DOOR_CONTACT]: '#daa520',
  [T.FLOWER]: '#e74c3c',
  [T.SIGN_ABOUT]: '#c4a87a',
  [T.SIGN_SKILLS]: '#c4a87a',
  [T.SIGN_PROJECTS]: '#c4a87a',
  [T.SIGN_CONTACT]: '#c4a87a',
  [T.FOUNTAIN]: '#5aafc8',
  [T.BENCH]: '#6b4423',
  [T.SAND]: '#d4c4a0',
  [T.LAMP]: '#ffd700',
};

// Pre-render the static minimap to an offscreen canvas
let cachedMinimap: HTMLCanvasElement | null = null;

const ensureMinimap = (): HTMLCanvasElement => {
  if (cachedMinimap) return cachedMinimap;
  cachedMinimap = document.createElement('canvas');
  cachedMinimap.width = MINIMAP_W;
  cachedMinimap.height = MINIMAP_H;
  const ctx = cachedMinimap.getContext('2d')!;

  for (let y = 0; y < MAP_H; y++) {
    for (let x = 0; x < MAP_W; x++) {
      const tile = gameMap[y][x];
      ctx.fillStyle = TILE_COLORS[tile] || '#4a8c3f';
      ctx.fillRect(x * MINIMAP_SCALE, y * MINIMAP_SCALE, MINIMAP_SCALE, MINIMAP_SCALE);
    }
  }
  return cachedMinimap;
};

export const drawMiniMap = (
  ctx: CanvasRenderingContext2D,
  cw: number,
  _ch: number,
  playerX: number,
  playerY: number,
  pulseFrame: number
) => {
  const minimap = ensureMinimap();
  const mx = cw - MINIMAP_W - PADDING - BORDER * 2;
  const my = PADDING;

  // Background + border
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(mx - BORDER, my - BORDER, MINIMAP_W + BORDER * 2 + PADDING, MINIMAP_H + BORDER * 2 + 18);
  ctx.strokeStyle = '#4a8c3f';
  ctx.lineWidth = 1;
  ctx.strokeRect(mx - BORDER, my - BORDER, MINIMAP_W + BORDER * 2 + PADDING, MINIMAP_H + BORDER * 2 + 18);

  // Draw pre-rendered minimap
  ctx.drawImage(minimap, mx + PADDING / 2, my + 14);

  // Title
  ctx.font = '7px "Press Start 2P", monospace';
  ctx.fillStyle = '#5aafc8';
  ctx.textAlign = 'center';
  ctx.fillText('MAP', mx + MINIMAP_W / 2 + PADDING / 2, my + 10);

  // Building labels as dots
  ctx.fillStyle = '#ffd700';
  BUILDING_LABELS.forEach(label => {
    const lx = mx + PADDING / 2 + label.x * MINIMAP_SCALE;
    const ly = my + 14 + label.y * MINIMAP_SCALE;
    ctx.fillRect(lx - 2, ly - 2, 4, 4);
  });

  // Player position (pulsing dot)
  const px = mx + PADDING / 2 + (playerX + TILE_SIZE / 2) / TILE_SIZE * MINIMAP_SCALE;
  const py = my + 14 + (playerY + TILE_SIZE / 2) / TILE_SIZE * MINIMAP_SCALE;
  const pulse = 2 + Math.sin(pulseFrame * 0.1) * 1;
  ctx.fillStyle = '#e74c3c';
  ctx.beginPath();
  ctx.arc(px, py, pulse, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(px, py, 1, 0, Math.PI * 2);
  ctx.fill();
};
