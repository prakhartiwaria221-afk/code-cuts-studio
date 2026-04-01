export const TILE_SIZE = 32;
export const MAP_W = 45;
export const MAP_H = 35;

export const T = {
  GRASS: 0,
  PATH: 1,         // Cobblestone castle paths
  WATER: 2,        // Black Lake
  TREE: 3,         // Forbidden Forest trees
  WALL: 4,         // Castle stone walls
  ROOF: 5,         // Castle turrets/roofs
  DOOR_ABOUT: 6,   // Great Hall door
  DOOR_SKILLS: 7,  // Library door
  DOOR_PROJECTS: 8, // Room of Requirement door
  DOOR_CONTACT: 9,  // Owlery door
  FLOWER: 10,       // Magical plants
  SIGN_ABOUT: 11,
  SIGN_SKILLS: 12,
  SIGN_PROJECTS: 13,
  SIGN_CONTACT: 14,
  FOUNTAIN: 15,     // Sorting Hat pedestal
  BENCH: 16,        // Stone bench
  SAND: 17,         // Gravel/shore
  GRASS_DARK: 18,   // Forbidden Forest floor
  LAMP: 19,         // Floating candles / torches
  TOWER: 20,        // Castle tower base
  BRIDGE: 21,       // Covered bridge
} as const;

const WALKABLE_TILES = [T.GRASS, T.PATH, T.FLOWER, T.SAND, T.GRASS_DARK, T.BRIDGE] as number[];
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

export const SPAWN = { x: 22, y: 18 };

const fill = (m: number[][], x1: number, y1: number, x2: number, y2: number, t: number) => {
  for (let y = y1; y <= y2; y++)
    for (let x = x1; x <= x2; x++)
      if (y >= 0 && y < MAP_H && x >= 0 && x < MAP_W) m[y][x] = t;
};

export const createMap = (): number[][] => {
  const m = Array.from({ length: MAP_H }, () => Array(MAP_W).fill(T.GRASS));

  // Border - Forbidden Forest
  fill(m, 0, 0, MAP_W - 1, 1, T.TREE);
  fill(m, 0, MAP_H - 2, MAP_W - 1, MAP_H - 1, T.TREE);
  fill(m, 0, 0, 1, MAP_H - 1, T.TREE);
  fill(m, MAP_W - 2, 0, MAP_W - 1, MAP_H - 1, T.TREE);
  // Extra forest depth
  fill(m, 2, 2, MAP_W - 3, 2, T.TREE);
  fill(m, 2, MAP_H - 3, MAP_W - 3, MAP_H - 3, T.TREE);
  fill(m, 2, 2, 2, MAP_H - 3, T.TREE);
  fill(m, MAP_W - 3, 2, MAP_W - 3, MAP_H - 3, T.TREE);

  // Main castle pathways - grand cross pattern
  fill(m, 5, 17, 18, 18, T.PATH);    // West corridor
  fill(m, 26, 17, 40, 18, T.PATH);   // East corridor
  fill(m, 21, 5, 23, 15, T.PATH);    // North corridor
  fill(m, 21, 21, 23, 30, T.PATH);   // South corridor

  // Central courtyard (large)
  fill(m, 18, 15, 26, 20, T.PATH);

  // Sorting Hat Pedestal (center of courtyard)
  m[17][22] = T.FOUNTAIN;
  m[17][23] = T.FOUNTAIN;
  m[18][22] = T.FOUNTAIN;
  m[18][23] = T.FOUNTAIN;

  // === GREAT HALL (West) - About Me ===
  fill(m, 4, 12, 11, 16, T.WALL);
  fill(m, 4, 12, 11, 12, T.ROOF);
  fill(m, 3, 11, 12, 11, T.ROOF);
  m[16][8] = T.DOOR_ABOUT;
  m[16][9] = T.DOOR_ABOUT;
  // Tower corners
  fill(m, 3, 12, 3, 14, T.WALL);
  fill(m, 12, 12, 12, 14, T.WALL);

  // === LIBRARY (North) - Skills ===
  fill(m, 18, 4, 26, 8, T.WALL);
  fill(m, 18, 4, 26, 4, T.ROOF);
  fill(m, 17, 3, 27, 3, T.ROOF);
  m[8][22] = T.DOOR_SKILLS;
  m[8][23] = T.DOOR_SKILLS;
  // Tower corners
  fill(m, 17, 4, 17, 6, T.WALL);
  fill(m, 27, 4, 27, 6, T.WALL);

  // === ROOM OF REQUIREMENT (East) - Projects ===
  fill(m, 33, 12, 40, 16, T.WALL);
  fill(m, 33, 12, 40, 12, T.ROOF);
  fill(m, 32, 11, 41, 11, T.ROOF);
  m[16][33] = T.DOOR_PROJECTS;
  m[16][34] = T.DOOR_PROJECTS;
  // Tower corners
  fill(m, 32, 12, 32, 14, T.WALL);
  fill(m, 41, 12, 41, 14, T.WALL);

  // === OWLERY (South) - Contact ===
  fill(m, 18, 26, 26, 30, T.WALL);
  fill(m, 18, 26, 26, 26, T.ROOF);
  fill(m, 17, 25, 27, 25, T.ROOF);
  m[26][22] = T.DOOR_CONTACT;
  m[26][23] = T.DOOR_CONTACT;

  // Black Lake (northeast)
  fill(m, 32, 4, 38, 8, T.WATER);
  fill(m, 31, 3, 39, 3, T.SAND);
  fill(m, 31, 9, 39, 9, T.SAND);
  fill(m, 31, 4, 31, 8, T.SAND);
  fill(m, 39, 4, 39, 8, T.SAND);

  // Signs near buildings
  m[16][12] = T.SIGN_ABOUT;
  m[9][25] = T.SIGN_SKILLS;
  m[16][32] = T.SIGN_PROJECTS;
  m[25][25] = T.SIGN_CONTACT;

  // Floating candle torches along paths
  m[17][13] = T.LAMP;
  m[17][31] = T.LAMP;
  m[12][22] = T.LAMP;
  m[23][22] = T.LAMP;
  m[17][19] = T.LAMP;
  m[17][25] = T.LAMP;
  m[15][10] = T.LAMP;
  m[15][35] = T.LAMP;

  // Benches in courtyard
  m[15][20] = T.BENCH;
  m[20][24] = T.BENCH;
  m[15][24] = T.BENCH;

  // Magical plants (Herbology-inspired)
  const flowers = [
    [6, 5], [8, 28], [12, 36], [14, 7], [20, 6], [24, 8],
    [28, 15], [28, 30], [10, 16], [24, 38], [6, 40], [30, 10],
  ];
  flowers.forEach(([y, x]) => { if (m[y]?.[x] === T.GRASS) m[y][x] = T.FLOWER; });

  // Forbidden Forest dark patches
  const darkGrass = [
    [4, 4], [6, 8], [4, 38], [30, 6], [30, 38], [8, 3],
    [26, 4], [14, 40], [20, 40], [10, 30], [24, 14], [28, 22],
  ];
  darkGrass.forEach(([y, x]) => { if (m[y]?.[x] === T.GRASS) m[y][x] = T.GRASS_DARK; });

  // Extra trees scattered
  const trees = [
    [5, 6], [7, 14], [10, 38], [25, 6], [28, 36], [6, 30],
    [14, 28], [20, 4], [24, 40], [8, 40], [30, 14], [30, 30],
    [4, 14], [4, 30], [12, 3], [22, 40],
  ];
  trees.forEach(([y, x]) => { if (m[y]?.[x] === T.GRASS) m[y][x] = T.TREE; });

  return m;
};

export const gameMap = createMap();

export const BUILDING_LABELS = [
  { text: 'GREAT HALL', x: 7.5, y: 11 },
  { text: 'LIBRARY', x: 22, y: 3 },
  { text: 'ROOM OF REQ.', x: 36.5, y: 11 },
  { text: 'OWLERY', x: 22, y: 31 },
];

export const PORTFOLIO_CONTENT = {
  welcome: {
    title: '🧙 The Sorting Hat Speaks!',
    lines: [
      "Ah, welcome young wizard!",
      '',
      'You have arrived at Hogwarts.',
      'Explore the castle grounds to',
      'discover the magical portfolio',
      'of Prakhar Tiwari.',
      '',
      'Visit the Great Hall, Library,',
      'Room of Requirement & Owlery.',
      '',
      '⚡ Use WASD to move.',
      '⚡ Press SPACE near doors!',
    ],
  },
  about: {
    title: '🏰 The Great Hall — About Me',
    lines: [
      "Welcome to the Great Hall!",
      '',
      "I'm Prakhar Tiwari ⚡",
      '',
      '🎓 B.Tech CSE @ Lovely Professional',
      '   University (2024-2028)',
      '📍 Lucknow, India',
      '',
      '▸ Front-End Developer (Gryffindor courage!)',
      '▸ Video Editor & Content Creator',
      '▸ Tech Enthusiast & Problem Solver',
      '',
      '🏆 10+ Projects | 6+ Technologies',
      '📚 500+ Hours of Coding',
      '',
      '"It does not do to dwell on dreams',
      ' and forget to live." — Dumbledore',
    ],
  },
  skills: {
    title: '📚 The Library — Skills & Spells',
    lines: [
      '══ SPELL MASTERY ══',
      '',
      '⚡ Front-End Dev  ████████░░ 80%',
      '⚡ C++            ██████░░░░ 60%',
      '⚡ React          █████░░░░░ 50%',
      '⚡ Java           █████░░░░░ 50%',
      '⚡ Web Design     ██████░░░░ 60%',
      '',
      '══ DARK ARTS DEFENSE ══',
      '🎨 Video Editing  ███████░░░ 70%',
      '🎨 Graphic Design █████░░░░░ 50%',
      '',
      '══ MAGICAL ARTIFACTS ══',
      'React ⚛️ | TypeScript 📘 | Tailwind 🎨',
      'Git 🔀 | VS Code 💻 | Figma 🎯',
    ],
  },
  projects: {
    title: '🚪 Room of Requirement — Projects',
    lines: [
      '╔══════════════════════════╗',
      '║ 🧠 1. MindBloom           ║',
      '║ AI adaptive learning     ║',
      '║ React + TS + Supabase    ║',
      '╠══════════════════════════╣',
      '║ 🌐 2. CoordiNet           ║',
      '║ Emergency coordination   ║',
      '║ React + TS + Supabase    ║',
      '╠══════════════════════════╣',
      '║ 📖 3. BookPard            ║',
      '║ Full-stack book store    ║',
      '║ React + TS + Supabase    ║',
      '╠══════════════════════════╣',
      '║ 📚 4. Library Management  ║',
      '║ Console app  │ C++ + OOP ║',
      '╚══════════════════════════╝',
      '',
      'github.com/prakhartiwaria221-afk',
    ],
  },
  contact: {
    title: '🦉 The Owlery — Send an Owl',
    lines: [
      "Send me an owl! 🦉",
      '',
      '📧 Owl Post:',
      '   prakhartiwari6038@gmail.com',
      '',
      '🔗 Floo Network:',
      '   github.com/prakhartiwaria221-afk',
      '   linkedin.com/in/prakhar-tiwari',
      '   instagram.com/prakhar6038',
      '',
      '"After all this time?" "Always."',
      '   — Snape',
    ],
  },
};
