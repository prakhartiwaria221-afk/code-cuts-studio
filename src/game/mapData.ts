export const TILE_SIZE = 32;
export const MAP_W = 40;
export const MAP_H = 30;

export const T = {
  GRASS: 0,
  PATH: 1,
  WATER: 2,
  TREE: 3,
  WALL: 4,
  ROOF: 5,
  DOOR_ABOUT: 6,
  DOOR_SKILLS: 7,
  DOOR_PROJECTS: 8,
  DOOR_CONTACT: 9,
  FLOWER: 10,
  SIGN_ABOUT: 11,
  SIGN_SKILLS: 12,
  SIGN_PROJECTS: 13,
  SIGN_CONTACT: 14,
  FOUNTAIN: 15,
  BENCH: 16,
  SAND: 17,
  GRASS_DARK: 18,
  LAMP: 19,
} as const;

const WALKABLE_TILES = [T.GRASS, T.PATH, T.FLOWER, T.SAND, T.GRASS_DARK] as number[];
const WALKABLE_SET = new Set(WALKABLE_TILES);
export const isWalkable = (tile: number) => WALKABLE_SET.has(tile);

export const isInteractive = (tile: number): string | null => {
  switch (tile) {
    case T.DOOR_ABOUT: case T.SIGN_ABOUT: return 'about';
    case T.DOOR_SKILLS: case T.SIGN_SKILLS: return 'skills';
    case T.DOOR_PROJECTS: case T.SIGN_PROJECTS: return 'projects';
    case T.DOOR_CONTACT: case T.SIGN_CONTACT: return 'contact';
    case T.FOUNTAIN: return 'welcome';
    default: return null;
  }
};

export const SPAWN = { x: 19, y: 16 };

const fill = (m: number[][], x1: number, y1: number, x2: number, y2: number, t: number) => {
  for (let y = y1; y <= y2; y++)
    for (let x = x1; x <= x2; x++)
      if (y >= 0 && y < MAP_H && x >= 0 && x < MAP_W) m[y][x] = t;
};

export const createMap = (): number[][] => {
  const m = Array.from({ length: MAP_H }, () => Array(MAP_W).fill(T.GRASS));

  // Border trees
  fill(m, 0, 0, MAP_W - 1, 1, T.TREE);
  fill(m, 0, MAP_H - 2, MAP_W - 1, MAP_H - 1, T.TREE);
  fill(m, 0, 0, 1, MAP_H - 1, T.TREE);
  fill(m, MAP_W - 2, 0, MAP_W - 1, MAP_H - 1, T.TREE);

  // Main paths - crossroads
  fill(m, 3, 14, 16, 15, T.PATH);   // horizontal left
  fill(m, 23, 14, 36, 15, T.PATH);  // horizontal right
  fill(m, 19, 3, 20, 11, T.PATH);   // vertical top
  fill(m, 19, 18, 20, 26, T.PATH);  // vertical bottom

  // Central plaza
  fill(m, 17, 12, 22, 17, T.PATH);

  // Fountain at center of plaza
  m[14][19] = T.FOUNTAIN;
  m[14][20] = T.FOUNTAIN;
  m[15][19] = T.FOUNTAIN;
  m[15][20] = T.FOUNTAIN;

  // === ABOUT building (West) ===
  fill(m, 4, 10, 9, 13, T.WALL);
  fill(m, 4, 10, 9, 10, T.ROOF);
  m[13][7] = T.DOOR_ABOUT;

  // === SKILLS building (North) ===
  fill(m, 16, 4, 23, 7, T.WALL);
  fill(m, 16, 4, 23, 4, T.ROOF);
  m[7][19] = T.DOOR_SKILLS;
  m[7][20] = T.DOOR_SKILLS;

  // === PROJECTS building (East) ===
  fill(m, 30, 10, 36, 13, T.WALL);
  fill(m, 30, 10, 36, 10, T.ROOF);
  m[13][30] = T.DOOR_PROJECTS;

  // === CONTACT building (South) ===
  fill(m, 16, 22, 23, 26, T.WALL);
  fill(m, 16, 22, 23, 22, T.ROOF);
  m[22][19] = T.DOOR_CONTACT;
  m[22][20] = T.DOOR_CONTACT;

  // Water pond (top-right corner area)
  fill(m, 28, 3, 33, 6, T.WATER);
  fill(m, 27, 2, 34, 2, T.SAND);
  fill(m, 27, 7, 34, 7, T.SAND);
  fill(m, 27, 3, 27, 6, T.SAND);
  fill(m, 34, 3, 34, 6, T.SAND);

  // Signs near buildings
  m[13][10] = T.SIGN_ABOUT;
  m[8][21] = T.SIGN_SKILLS;
  m[13][29] = T.SIGN_PROJECTS;
  m[21][21] = T.SIGN_CONTACT;

  // Lamps along paths
  m[14][11] = T.LAMP;
  m[14][28] = T.LAMP;
  m[10][19] = T.LAMP;
  m[20][20] = T.LAMP;

  // Benches
  m[12][18] = T.BENCH;
  m[17][21] = T.BENCH;

  // Flowers scattered
  const flowers = [[4,16],[5,20],[8,24],[12,5],[15,26],[24,6],[26,15],[25,24],[10,32],[22,35],[6,15],[20,8]];
  flowers.forEach(([y, x]) => { if (m[y]?.[x] === T.GRASS) m[y][x] = T.FLOWER; });

  // Dark grass patches
  const darkGrass = [[6,4],[8,14],[16,6],[22,9],[24,33],[18,35],[10,27],[4,25],[26,12]];
  darkGrass.forEach(([y, x]) => { if (m[y]?.[x] === T.GRASS) m[y][x] = T.GRASS_DARK; });

  // Extra trees for decoration
  const trees = [[6,13],[10,25],[22,8],[24,32],[5,30],[18,6],[25,35],[10,3],[16,34],[24,5]];
  trees.forEach(([y, x]) => { if (m[y]?.[x] === T.GRASS) m[y][x] = T.TREE; });

  return m;
};

export const gameMap = createMap();

// Building label positions (for rendering text on map)
export const BUILDING_LABELS = [
  { text: 'ABOUT ME', x: 6.5, y: 9.5 },
  { text: 'SKILLS', x: 19.5, y: 3.5 },
  { text: 'PROJECTS', x: 33, y: 9.5 },
  { text: 'CONTACT', x: 19.5, y: 27 },
];

// Portfolio content for dialogs
export const PORTFOLIO_CONTENT = {
  welcome: {
    title: '⛲ Welcome!',
    lines: [
      "Welcome to Prakhar's World!",
      '',
      'Walk around and explore the buildings',
      'to learn about me, my skills,',
      'projects, and how to contact me.',
      '',
      'Use WASD or Arrow Keys to move.',
      'Press SPACE near doors & signs!',
    ],
  },
  about: {
    title: '🏠 About Me',
    lines: [
      "Hey! I'm Prakhar Tiwari.",
      '',
      '🎓 B.Tech CSE @ Lovely Professional',
      '   University (2024-2028)',
      '📍 Lucknow, India',
      '',
      '▸ Front-End Developer',
      '▸ Video Editor & Content Creator',
      '▸ Tech Enthusiast & Problem Solver',
      '',
      '10+ Projects | 6+ Technologies',
      '500+ Hours of Coding',
    ],
  },
  skills: {
    title: '⚔️ Skills & Abilities',
    lines: [
      '── TECHNICAL ──',
      'Front-End Dev  ████████░░ 80%',
      'C++            ██████░░░░ 60%',
      'React          █████░░░░░ 50%',
      'Java           █████░░░░░ 50%',
      'Web Design     ██████░░░░ 60%',
      '',
      '── CREATIVE ──',
      'Video Editing  ███████░░░ 70%',
      'Graphic Design █████░░░░░ 50%',
      '',
      '── TOOLS ──',
      'React ⚛️ | TypeScript 📘 | Tailwind 🎨',
      'Git 🔀 | VS Code 💻 | Figma 🎯',
    ],
  },
  projects: {
    title: '🏰 Projects',
    lines: [
      '╔══════════════════════════╗',
      '║ 1. MindBloom             ║',
      '║ AI adaptive learning     ║',
      '║ React + TS + Supabase    ║',
      '╠══════════════════════════╣',
      '║ 2. CoordiNet             ║',
      '║ Emergency coordination   ║',
      '║ React + TS + Supabase    ║',
      '╠══════════════════════════╣',
      '║ 3. BookPard              ║',
      '║ Full-stack book store    ║',
      '║ React + TS + Supabase    ║',
      '╠══════════════════════════╣',
      '║ 4. Library Management    ║',
      '║ Console app  │ C++ + OOP ║',
      '╚══════════════════════════╝',
      '',
      'github.com/prakhartiwaria221-afk',
    ],
  },
  contact: {
    title: '📮 Contact Me',
    lines: [
      "Let's connect!",
      '',
      '📧 Email:',
      '   prakhartiwari6038@gmail.com',
      '',
      '🔗 Links:',
      '   github.com/prakhartiwaria221-afk',
      '   linkedin.com/in/prakhar-tiwari',
      '   instagram.com/prakhar6038',
      '',
      'Feel free to reach out for',
      'collaborations or just to say hi!',
    ],
  },
};
