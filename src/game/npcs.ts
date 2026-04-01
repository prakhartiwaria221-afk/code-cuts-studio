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
    id: 'dumbledore',
    x: 20 * TILE_SIZE,
    y: 16 * TILE_SIZE,
    color: '#f0d0b0',
    hairColor: '#c0c0c0',
    shirtColor: '#4a2080',
    name: 'Dumbledore',
    dialog: [
      "Ah, welcome to Hogwarts! 🧙‍♂️",
      "",
      "I am Professor Dumbledore.",
      "Explore the castle to discover",
      "Prakhar's magical portfolio!",
      "",
      "💡 Happiness can be found even",
      "in the darkest of times, if one",
      "only remembers to turn on the light.",
      "",
      "⚡ Walk to doors & press SPACE!",
    ],
    patrolPoints: [
      { x: 20, y: 16 }, { x: 20, y: 19 }, { x: 24, y: 19 }, { x: 24, y: 16 },
    ],
    speed: 0.8,
  },
  {
    id: 'mcgonagall',
    x: 14 * TILE_SIZE,
    y: 10 * TILE_SIZE,
    color: '#e8c8a8',
    hairColor: '#2a2a2a',
    shirtColor: '#006644',
    name: 'McGonagall',
    dialog: [
      "Good day, student! 📚",
      "",
      "I'm Professor McGonagall.",
      "Prakhar has mastered many spells—",
      "React, TypeScript, C++, and more!",
      "",
      "💡 Visit the Library to the north",
      "for the complete spell book!",
      "",
      "Mind your step in the corridors.",
    ],
    patrolPoints: [
      { x: 14, y: 10 }, { x: 18, y: 10 }, { x: 18, y: 14 }, { x: 14, y: 14 },
    ],
    speed: 1.0,
  },
  {
    id: 'hagrid',
    x: 28 * TILE_SIZE,
    y: 18 * TILE_SIZE,
    color: '#c8a080',
    hairColor: '#3a2010',
    shirtColor: '#5a3a20',
    name: 'Hagrid',
    dialog: [
      "Blimey! A new student! 🎉",
      "",
      "I'm Hagrid, Keeper of Keys.",
      "Prakhar's built some amazin'",
      "projects — MindBloom, CoordiNet...",
      "",
      "💡 Head east to the Room of",
      "Requirement to see 'em all!",
      "",
      "Yer a wizard, visitor!",
    ],
    patrolPoints: [
      { x: 28, y: 18 }, { x: 32, y: 18 }, { x: 32, y: 14 }, { x: 28, y: 14 },
    ],
    speed: 0.7,
  },
  {
    id: 'hedwig',
    x: 18 * TILE_SIZE,
    y: 24 * TILE_SIZE,
    color: '#e8e8f0',
    hairColor: '#d0d0dd',
    shirtColor: '#c0c0d0',
    name: 'Hedwig',
    dialog: [
      "Hoot hoot! 🦉",
      "",
      "I'm Hedwig, the messenger owl.",
      "Want to send Prakhar a message?",
      "",
      "💡 Fly south to the Owlery",
      "to find all contact details!",
      "",
      "prakhartiwari6038@gmail.com",
      "*ruffles feathers proudly*",
    ],
    patrolPoints: [
      { x: 18, y: 24 }, { x: 22, y: 24 }, { x: 22, y: 28 }, { x: 18, y: 28 },
    ],
    speed: 1.3,
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
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
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

  // Wizard hat for Dumbledore
  if (npc.id === 'dumbledore') {
    ctx.fillStyle = '#4a2080';
    ctx.fillRect(x + 4 * s, y - 2 * s, 8 * s, 2 * s);
    ctx.fillRect(x + 6 * s, y - 5 * s, 4 * s, 3 * s);
    ctx.fillRect(x + 7 * s, y - 7 * s, 2 * s, 2 * s);
    // Star on hat
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(x + 7.5 * s, y - 6 * s, 1 * s, 1 * s);
  }

  // Robe/Body
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

  // Legs (robes)
  ctx.fillStyle = darkenColor(npc.shirtColor, 0.6);
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
  ctx.fillStyle = '#222';
  ctx.fillRect(x + 4 * s, y + 14 * s, 4 * s, 1 * s);
  ctx.fillRect(x + 9 * s, y + 14 * s, 4 * s, 1 * s);

  // Name tag with magical glow
  ctx.font = '7px "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffd700';
  ctx.shadowColor = '#ffd700';
  ctx.shadowBlur = 4;
  ctx.fillText(npc.name, x + TILE_SIZE / 2, y - (npc.id === 'dumbledore' ? 18 : 6));
  ctx.shadowBlur = 0;

  // Speech bubble when idle (wand sparkle for wizards, feather for Hedwig)
  if (!npc.moving) {
    if (npc.id === 'hedwig') {
      ctx.fillStyle = '#fff';
      ctx.font = '10px "Press Start 2P", monospace';
      ctx.fillText('🦉', x + 18, y - 14);
    } else {
      ctx.fillStyle = '#ffd700';
      ctx.font = '10px "Press Start 2P", monospace';
      ctx.fillText('⚡', x + 18, y - 10);
    }
  }
};

function darkenColor(hex: string, factor: number): string {
  if (hex.startsWith('#')) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${Math.floor(r * factor)},${Math.floor(g * factor)},${Math.floor(b * factor)})`;
  }
  return hex;
}

export const isNearNPC = (playerX: number, playerY: number, npc: NPC): boolean => {
  const dx = (playerX + TILE_SIZE / 2) - (npc.x + TILE_SIZE / 2);
  const dy = (playerY + TILE_SIZE / 2) - (npc.y + TILE_SIZE / 2);
  return Math.sqrt(dx * dx + dy * dy) < TILE_SIZE * 2;
};
