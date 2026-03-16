import { TILE_SIZE, MAP_W, MAP_H, gameMap, isWalkable } from './mapData';

export interface NPC {
  id: string;
  x: number;
  y: number;
  dir: 0 | 1 | 2 | 3;
  frame: number;
  frameTimer: number;
  moving: boolean;
  color: string;
  hairColor: string;
  shirtColor: string;
  name: string;
  dialog: string[];
  patrolPoints: { x: number; y: number }[];
  patrolIndex: number;
  waitTimer: number;
  speed: number;
}

const NPC_DEFS: Omit<NPC, 'frame' | 'frameTimer' | 'moving' | 'dir' | 'patrolIndex' | 'waitTimer'>[] = [
  {
    id: 'guide',
    x: 17 * TILE_SIZE,
    y: 13 * TILE_SIZE,
    color: '#f0c8a0',
    hairColor: '#d4a017',
    shirtColor: '#3498db',
    name: 'Guide',
    dialog: [
      "Hey there, adventurer! 👋",
      "",
      "Welcome to Prakhar's world!",
      "Each building holds a piece of",
      "his story. Go explore them all!",
      "",
      "💡 Tip: Walk up to doors and",
      "signs, then press SPACE!",
    ],
    patrolPoints: [
      { x: 17, y: 13 }, { x: 17, y: 16 }, { x: 22, y: 16 }, { x: 22, y: 13 },
    ],
    speed: 1.2,
  },
  {
    id: 'scholar',
    x: 14 * TILE_SIZE,
    y: 8 * TILE_SIZE,
    color: '#d4a07a',
    hairColor: '#1a1a2e',
    shirtColor: '#8e44ad',
    name: 'Scholar',
    dialog: [
      "I study at the Skills Academy! 📚",
      "",
      "Prakhar knows React, TypeScript,",
      "C++, Java, and more!",
      "",
      "💡 Tip: Check the Skills building",
      "to the north for the full list!",
    ],
    patrolPoints: [
      { x: 14, y: 8 }, { x: 19, y: 8 }, { x: 19, y: 3 }, { x: 14, y: 3 },
    ],
    speed: 1.0,
  },
  {
    id: 'artist',
    x: 25 * TILE_SIZE,
    y: 15 * TILE_SIZE,
    color: '#f0c8a0',
    hairColor: '#c0392b',
    shirtColor: '#27ae60',
    name: 'Artist',
    dialog: [
      "Have you seen Prakhar's projects? 🎨",
      "",
      "MindBloom, CoordiNet, BookPard...",
      "They're all built with modern tech!",
      "",
      "💡 Tip: Visit the Projects building",
      "on the east side of town!",
    ],
    patrolPoints: [
      { x: 25, y: 15 }, { x: 29, y: 15 }, { x: 29, y: 12 }, { x: 25, y: 12 },
    ],
    speed: 0.8,
  },
  {
    id: 'messenger',
    x: 15 * TILE_SIZE,
    y: 20 * TILE_SIZE,
    color: '#d4a07a',
    hairColor: '#2c3e50',
    shirtColor: '#e67e22',
    name: 'Messenger',
    dialog: [
      "Want to reach Prakhar? 📮",
      "",
      "He's always open to new",
      "collaborations and ideas!",
      "",
      "💡 Tip: Head to the Contact",
      "building to the south!",
    ],
    patrolPoints: [
      { x: 15, y: 20 }, { x: 19, y: 20 }, { x: 19, y: 24 }, { x: 15, y: 24 },
    ],
    speed: 1.1,
  },
];

export const createNPCs = (): NPC[] =>
  NPC_DEFS.map(def => ({
    ...def,
    dir: 0 as const,
    frame: 0,
    frameTimer: 0,
    moving: false,
    patrolIndex: 0,
    waitTimer: 60 + Math.random() * 60,
  }));

const canNPCWalk = (x: number, y: number): boolean => {
  const margin = 6;
  const corners = [
    [x + margin, y + margin],
    [x + TILE_SIZE - margin, y + margin],
    [x + margin, y + TILE_SIZE - margin],
    [x + TILE_SIZE - margin, y + TILE_SIZE - margin],
  ];
  return corners.every(([cx, cy]) => {
    const tx = Math.floor(cx / TILE_SIZE);
    const ty = Math.floor(cy / TILE_SIZE);
    if (tx < 0 || tx >= MAP_W || ty < 0 || ty >= MAP_H) return false;
    return isWalkable(gameMap[ty][tx]);
  });
};

export const updateNPC = (npc: NPC): void => {
  if (npc.waitTimer > 0) {
    npc.waitTimer--;
    npc.moving = false;
    npc.frame = 0;
    return;
  }

  const target = npc.patrolPoints[npc.patrolIndex];
  const tx = target.x * TILE_SIZE;
  const ty = target.y * TILE_SIZE;
  const dx = tx - npc.x;
  const dy = ty - npc.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < 4) {
    npc.x = tx;
    npc.y = ty;
    npc.patrolIndex = (npc.patrolIndex + 1) % npc.patrolPoints.length;
    npc.waitTimer = 90 + Math.random() * 120;
    npc.moving = false;
    return;
  }

  const mx = dist > 0 ? (dx / dist) * npc.speed : 0;
  const my = dist > 0 ? (dy / dist) * npc.speed : 0;

  if (Math.abs(dx) > Math.abs(dy)) {
    npc.dir = mx < 0 ? 2 : 3;
  } else {
    npc.dir = my < 0 ? 1 : 0;
  }

  const nx = npc.x + mx;
  const ny = npc.y + my;
  if (canNPCWalk(nx, ny)) {
    npc.x = nx;
    npc.y = ny;
  } else {
    // Skip to next patrol point
    npc.patrolIndex = (npc.patrolIndex + 1) % npc.patrolPoints.length;
    npc.waitTimer = 30;
  }

  npc.moving = true;
  npc.frameTimer++;
  if (npc.frameTimer > 10) {
    npc.frame = (npc.frame + 1) % 4;
    npc.frameTimer = 0;
  }
};

export const drawNPC = (ctx: CanvasRenderingContext2D, npc: NPC, camX: number, camY: number): void => {
  const x = npc.x - camX;
  const y = npc.y - camY;
  const s = 2;

  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.beginPath();
  ctx.ellipse(x + 16, y + 30, 9, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  // Head
  ctx.fillStyle = npc.color;
  ctx.fillRect(x + 5 * s, y + 1 * s, 6 * s, 6 * s);

  // Hair
  ctx.fillStyle = npc.hairColor;
  if (npc.dir === 0) {
    ctx.fillRect(x + 5 * s, y + 0, 6 * s, 2 * s);
    ctx.fillRect(x + 4 * s, y + 1 * s, 1 * s, 3 * s);
    ctx.fillRect(x + 11 * s, y + 1 * s, 1 * s, 3 * s);
    // Eyes
    ctx.fillStyle = '#222';
    ctx.fillRect(x + 6 * s, y + 4 * s, 2 * s, 1 * s);
    ctx.fillRect(x + 9 * s, y + 4 * s, 2 * s, 1 * s);
  } else if (npc.dir === 1) {
    ctx.fillRect(x + 4 * s, y + 0, 8 * s, 4 * s);
  } else if (npc.dir === 2) {
    ctx.fillRect(x + 5 * s, y + 0, 7 * s, 2 * s);
    ctx.fillRect(x + 11 * s, y + 1 * s, 1 * s, 3 * s);
    ctx.fillStyle = '#222';
    ctx.fillRect(x + 6 * s, y + 4 * s, 2 * s, 1 * s);
  } else {
    ctx.fillRect(x + 4 * s, y + 0, 7 * s, 2 * s);
    ctx.fillRect(x + 4 * s, y + 1 * s, 1 * s, 3 * s);
    ctx.fillStyle = '#222';
    ctx.fillRect(x + 9 * s, y + 4 * s, 2 * s, 1 * s);
  }

  // Body
  ctx.fillStyle = npc.shirtColor;
  ctx.fillRect(x + 4 * s, y + 7 * s, 8 * s, 5 * s);

  // Arms
  const darkShirt = darkenColor(npc.shirtColor, 0.8);
  ctx.fillStyle = darkShirt;
  if (npc.frame % 4 < 2 || !npc.moving) {
    ctx.fillRect(x + 3 * s, y + 7 * s, 1 * s, 4 * s);
    ctx.fillRect(x + 12 * s, y + 7 * s, 1 * s, 4 * s);
  } else {
    ctx.fillRect(x + 3 * s, y + 8 * s, 1 * s, 4 * s);
    ctx.fillRect(x + 12 * s, y + 6 * s, 1 * s, 4 * s);
  }

  // Legs
  ctx.fillStyle = '#2c3e50';
  if (npc.moving) {
    if (npc.frame % 4 < 2) {
      ctx.fillRect(x + 5 * s, y + 12 * s, 3 * s, 3 * s);
      ctx.fillRect(x + 9 * s, y + 12 * s, 3 * s, 2 * s);
    } else {
      ctx.fillRect(x + 5 * s, y + 12 * s, 3 * s, 2 * s);
      ctx.fillRect(x + 9 * s, y + 12 * s, 3 * s, 3 * s);
    }
  } else {
    ctx.fillRect(x + 5 * s, y + 12 * s, 3 * s, 3 * s);
    ctx.fillRect(x + 9 * s, y + 12 * s, 3 * s, 3 * s);
  }

  // Shoes
  ctx.fillStyle = '#555';
  ctx.fillRect(x + 4 * s, y + 14 * s, 4 * s, 1 * s);
  ctx.fillRect(x + 9 * s, y + 14 * s, 4 * s, 1 * s);

  // Name tag
  ctx.font = '7px "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffd700';
  ctx.shadowColor = '#000';
  ctx.shadowBlur = 3;
  ctx.fillText(npc.name, x + TILE_SIZE / 2, y - 6);
  ctx.shadowBlur = 0;

  // Exclamation bubble when idle
  if (!npc.moving) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(x + 12, y - 18, 10, 12);
    ctx.fillRect(x + 15, y - 7, 4, 4);
    ctx.fillStyle = '#e74c3c';
    ctx.font = '8px "Press Start 2P", monospace';
    ctx.fillText('!', x + 17, y - 9);
  }
};

function darkenColor(hex: string, factor: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${Math.floor(r * factor)},${Math.floor(g * factor)},${Math.floor(b * factor)})`;
}

export const isNearNPC = (playerX: number, playerY: number, npc: NPC): boolean => {
  const dx = (playerX + TILE_SIZE / 2) - (npc.x + TILE_SIZE / 2);
  const dy = (playerY + TILE_SIZE / 2) - (npc.y + TILE_SIZE / 2);
  return Math.sqrt(dx * dx + dy * dy) < TILE_SIZE * 2;
};
