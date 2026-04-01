import { TILE_SIZE, T, gameMap } from './mapData';

// Harry Potter themed tile renderer
export const drawEnhancedTile = (
  ctx: CanvasRenderingContext2D,
  tile: number,
  x: number,
  y: number,
  tx: number,
  ty: number,
  waterFrame: number,
  globalFrame: number
) => {
  const s = TILE_SIZE;

  switch (tile) {
    case T.GRASS: {
      // Hogwarts grounds - muted, mystical greens
      const shade = ((tx * 7 + ty * 13) % 5);
      const colors = ['#2d5a27', '#335e2e', '#2a5524', '#38632f', '#2f5826'];
      ctx.fillStyle = colors[shade];
      ctx.fillRect(x, y, s, s);
      // Magical shimmer grass blades
      ctx.fillStyle = '#3d7a35';
      const seed = tx * 31 + ty * 17;
      if (seed % 3 === 0) {
        ctx.fillRect(x + 6, y + 12, 1, 4);
        ctx.fillRect(x + 22, y + 6, 1, 3);
      }
      if (seed % 7 === 0) {
        // Tiny magical sparkle in grass
        const sparkle = Math.sin(globalFrame * 0.05 + tx * 3 + ty * 7) > 0.85;
        if (sparkle) {
          ctx.fillStyle = 'rgba(255, 215, 100, 0.4)';
          ctx.fillRect(x + 14, y + 10, 2, 2);
        }
      }
      if (gameMap[ty - 1]?.[tx] === T.TREE) {
        ctx.fillStyle = 'rgba(0,0,0,0.12)';
        ctx.fillRect(x, y, s, 10);
      }
      break;
    }
    case T.GRASS_DARK: {
      // Forbidden Forest floor
      ctx.fillStyle = '#1a3a15';
      ctx.fillRect(x, y, s, s);
      ctx.fillStyle = '#152e12';
      ctx.fillRect(x + 4, y + 6, 3, 3);
      ctx.fillRect(x + 18, y + 20, 4, 2);
      // Glowing mushroom
      if ((tx + ty) % 7 === 0) {
        ctx.fillStyle = '#4a3a2a';
        ctx.fillRect(x + 20, y + 22, 2, 4);
        ctx.fillStyle = '#8855cc';
        ctx.fillRect(x + 18, y + 20, 6, 3);
        // Bioluminescent glow
        const glow = 0.15 + Math.sin(globalFrame * 0.04 + tx) * 0.08;
        ctx.fillStyle = `rgba(136, 85, 204, ${glow})`;
        ctx.beginPath();
        ctx.arc(x + 21, y + 21, 6, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }
    case T.PATH: {
      // Castle cobblestone
      ctx.fillStyle = '#5a5060';
      ctx.fillRect(x, y, s, s);
      // Stone blocks
      ctx.fillStyle = '#6a6070';
      const px = (tx * 5 + ty * 3) % 4;
      ctx.fillRect(x + 1 + px * 3, y + 2, 7, 6);
      ctx.fillRect(x + 16 + px * 2, y + 18, 9, 7);
      ctx.fillStyle = '#7a7080';
      ctx.fillRect(x + 3 + px * 2, y + 10, 5, 5);
      ctx.fillRect(x + 22, y + 4, 6, 5);
      // Mortar lines
      ctx.fillStyle = '#4a4550';
      if (gameMap[ty]?.[tx - 1] !== T.PATH && gameMap[ty]?.[tx - 1] !== undefined) {
        ctx.fillRect(x, y, 1, s);
      }
      if (gameMap[ty - 1]?.[tx] !== T.PATH && gameMap[ty - 1]?.[tx] !== undefined) {
        ctx.fillRect(x, y, s, 1);
      }
      break;
    }
    case T.WATER: {
      // Black Lake - dark mysterious water
      const wf = waterFrame;
      const base = wf === 0 ? '#1a2a4a' : wf === 1 ? '#1e2e4e' : '#162642';
      ctx.fillStyle = base;
      ctx.fillRect(x, y, s, s);
      // Dark ripples
      ctx.fillStyle = '#2a3a5a';
      const off1 = (wf * 10 + tx * 7) % s;
      ctx.fillRect(x + off1, y + 6, 10, 2);
      ctx.fillRect(x + (off1 + 14) % s, y + 18, 8, 2);
      // Mysterious glow from beneath
      const glowPhase = Math.sin(globalFrame * 0.02 + tx + ty) * 0.05 + 0.05;
      ctx.fillStyle = `rgba(100, 180, 255, ${glowPhase})`;
      ctx.fillRect(x + 8, y + 8, 16, 16);
      // Shore foam
      if (gameMap[ty - 1]?.[tx] !== T.WATER && gameMap[ty - 1]?.[tx] !== undefined) {
        ctx.fillStyle = 'rgba(150, 170, 200, 0.3)';
        ctx.fillRect(x, y, s, 3);
      }
      break;
    }
    case T.TREE: {
      // Forbidden Forest / Whomping Willow style trees
      ctx.fillStyle = '#1a3a15';
      ctx.fillRect(x, y, s, s);
      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.beginPath();
      ctx.ellipse(x + 16, y + 28, 12, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      // Gnarled trunk
      ctx.fillStyle = '#2a1a0a';
      ctx.fillRect(x + 11, y + 14, 10, 16);
      ctx.fillStyle = '#3a2a1a';
      ctx.fillRect(x + 12, y + 15, 8, 14);
      // Knots
      ctx.fillStyle = '#1a0a00';
      ctx.fillRect(x + 14, y + 20, 3, 2);
      // Dark canopy
      ctx.fillStyle = '#0a2a06';
      ctx.fillRect(x + 2, y + 4, 28, 12);
      ctx.fillStyle = '#0e3008';
      ctx.fillRect(x + 4, y + 2, 24, 12);
      ctx.fillStyle = '#12380c';
      ctx.fillRect(x + 7, y + 0, 18, 10);
      // Leaf highlights - more muted
      ctx.fillStyle = '#1a4510';
      ctx.fillRect(x + 10, y + 2, 4, 3);
      ctx.fillRect(x + 18, y + 4, 3, 2);
      break;
    }
    case T.WALL: {
      // Hogwarts castle stone walls
      ctx.fillStyle = '#3a3545';
      ctx.fillRect(x, y, s, s);
      // Stone brick pattern
      for (let row = 0; row < 4; row++) {
        const offset = row % 2 === 0 ? 0 : 8;
        for (let col = 0; col < 3; col++) {
          ctx.fillStyle = '#4a4555';
          ctx.fillRect(x + offset + col * 11 + 1, y + row * 8 + 1, 9, 6);
          ctx.fillStyle = '#524d5e';
          ctx.fillRect(x + offset + col * 11 + 1, y + row * 8 + 1, 9, 1);
        }
      }
      // Enchanted window with warm glow
      ctx.fillStyle = '#1a1520';
      ctx.fillRect(x + 8, y + 6, 16, 14);
      // Gothic arch top
      ctx.fillStyle = '#ffcc44';
      ctx.fillRect(x + 9, y + 7, 14, 12);
      // Window glow
      ctx.fillStyle = 'rgba(255, 200, 80, 0.08)';
      ctx.fillRect(x + 4, y + 2, 24, 24);
      // Window cross (gothic style)
      ctx.fillStyle = '#3a3545';
      ctx.fillRect(x + 15, y + 7, 2, 12);
      ctx.fillRect(x + 9, y + 12, 14, 2);
      break;
    }
    case T.ROOF: {
      // Castle turret roof - dark slate blue
      ctx.fillStyle = '#2a2540';
      ctx.fillRect(x, y, s, s);
      // Shingle detail
      for (let row = 0; row < 4; row++) {
        const offset = row % 2 === 0 ? 0 : 4;
        for (let col = 0; col < 5; col++) {
          const shade = (row + col) % 2 === 0 ? '#352f4d' : '#3f385a';
          ctx.fillStyle = shade;
          ctx.fillRect(x + offset + col * 7, y + row * 8, 6, 7);
        }
      }
      // Ridge highlight
      ctx.fillStyle = '#4a4570';
      ctx.fillRect(x, y, s, 2);
      // Battlements hint
      if ((tx + ty) % 3 === 0) {
        ctx.fillStyle = '#3a3550';
        ctx.fillRect(x + 4, y, 4, 4);
        ctx.fillRect(x + 20, y, 4, 4);
      }
      break;
    }
    case T.DOOR_ABOUT: case T.DOOR_SKILLS: case T.DOOR_PROJECTS: case T.DOOR_CONTACT: {
      // Enchanted castle doors
      ctx.fillStyle = '#3a3545';
      ctx.fillRect(x, y, s, s);
      // Door frame - dark wood
      ctx.fillStyle = '#1a0a00';
      ctx.fillRect(x + 4, y + 1, 24, 30);
      // Door panels - rich wood
      ctx.fillStyle = '#3a1a0a';
      ctx.fillRect(x + 6, y + 2, 20, 28);
      // Panel details
      ctx.fillStyle = '#4a2a1a';
      ctx.fillRect(x + 7, y + 3, 18, 11);
      ctx.fillRect(x + 7, y + 17, 18, 11);
      // Iron studs
      ctx.fillStyle = '#888';
      ctx.fillRect(x + 8, y + 5, 2, 2);
      ctx.fillRect(x + 22, y + 5, 2, 2);
      ctx.fillRect(x + 8, y + 25, 2, 2);
      ctx.fillRect(x + 22, y + 25, 2, 2);
      // Golden handle
      ctx.fillStyle = '#ffd700';
      ctx.fillRect(x + 20, y + 14, 3, 4);
      ctx.fillStyle = '#daa520';
      ctx.fillRect(x + 21, y + 15, 1, 2);
      // Magical glow at threshold
      const pulse = Math.sin(globalFrame * 0.05) * 0.12 + 0.2;
      ctx.fillStyle = `rgba(200, 160, 80, ${pulse})`;
      ctx.fillRect(x + 4, y + s - 4, 24, 4);
      // House color accent based on door type
      const houseColors: Record<number, string> = {
        [T.DOOR_ABOUT]: 'rgba(180, 50, 50, 0.2)',   // Gryffindor red
        [T.DOOR_SKILLS]: 'rgba(50, 50, 180, 0.2)',   // Ravenclaw blue
        [T.DOOR_PROJECTS]: 'rgba(200, 180, 50, 0.2)', // Hufflepuff yellow
        [T.DOOR_CONTACT]: 'rgba(50, 180, 80, 0.2)',  // Slytherin green
      };
      ctx.fillStyle = houseColors[tile] || 'rgba(255,215,0,0.15)';
      ctx.fillRect(x + 6, y + 2, 20, 28);
      break;
    }
    case T.FLOWER: {
      // Magical Herbology plants
      ctx.fillStyle = '#2d5a27';
      ctx.fillRect(x, y, s, s);
      // Mandrake-style plant
      ctx.fillStyle = '#1a4a12';
      ctx.fillRect(x + 10, y + 16, 2, 10);
      ctx.fillRect(x + 14, y + 14, 2, 12);
      // Glowing petals
      const glowColors = ['#9b59b6', '#8e44ad', '#6c3483', '#bb44dd'];
      const c = glowColors[(tx + ty) % glowColors.length];
      ctx.fillStyle = c;
      ctx.fillRect(x + 7, y + 10, 4, 4);
      ctx.fillRect(x + 13, y + 8, 4, 4);
      ctx.fillRect(x + 10, y + 12, 4, 4);
      // Magical glow
      const fGlow = 0.1 + Math.sin(globalFrame * 0.04 + tx * 2 + ty * 3) * 0.06;
      ctx.fillStyle = `rgba(155, 89, 182, ${fGlow})`;
      ctx.beginPath();
      ctx.arc(x + 14, y + 14, 8, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case T.SIGN_ABOUT: case T.SIGN_SKILLS: case T.SIGN_PROJECTS: case T.SIGN_CONTACT: {
      ctx.fillStyle = '#2d5a27';
      ctx.fillRect(x, y, s, s);
      // Magical signpost
      ctx.fillStyle = 'rgba(0,0,0,0.1)';
      ctx.fillRect(x + 16, y + 16, 4, 16);
      ctx.fillStyle = '#2a1a0a';
      ctx.fillRect(x + 14, y + 14, 4, 18);
      // Sign board with parchment color
      ctx.fillStyle = '#4a2a0a';
      ctx.fillRect(x + 2, y + 2, 28, 14);
      ctx.fillStyle = '#c4a87a';
      ctx.fillRect(x + 3, y + 3, 26, 12);
      // House crest hint
      const signColors: Record<number, string> = {
        [T.SIGN_ABOUT]: '#b83030',
        [T.SIGN_SKILLS]: '#3030b8',
        [T.SIGN_PROJECTS]: '#b8a030',
        [T.SIGN_CONTACT]: '#30b850',
      };
      ctx.fillStyle = signColors[tile] || '#ffd700';
      ctx.font = 'bold 10px "Press Start 2P", monospace';
      ctx.textAlign = 'center';
      const bounce = Math.sin(globalFrame * 0.06 + tx) * 2;
      ctx.fillText('⚡', x + 16, y + 14 + bounce);
      break;
    }
    case T.FOUNTAIN: {
      // Sorting Hat Pedestal
      ctx.fillStyle = '#5a5060';
      ctx.fillRect(x, y, s, s);
      // Stone pedestal
      ctx.fillStyle = '#707080';
      ctx.fillRect(x + 4, y + 12, 24, 18);
      ctx.fillStyle = '#808090';
      ctx.fillRect(x + 2, y + 10, 28, 4);
      // Sorting Hat shape
      ctx.fillStyle = '#3a2010';
      // Hat brim
      ctx.fillRect(x + 5, y + 8, 22, 4);
      // Hat body
      ctx.fillRect(x + 8, y + 2, 16, 8);
      ctx.fillRect(x + 10, y, 12, 4);
      // Hat tip bent
      ctx.fillRect(x + 18, y - 2, 6, 4);
      ctx.fillRect(x + 22, y - 4, 4, 3);
      // Hat details
      ctx.fillStyle = '#2a1508';
      ctx.fillRect(x + 5, y + 8, 22, 1);
      ctx.fillRect(x + 10, y + 4, 4, 2);
      // Magical aura
      const aura = 0.08 + Math.sin(globalFrame * 0.03) * 0.04;
      ctx.fillStyle = `rgba(255, 200, 50, ${aura})`;
      ctx.beginPath();
      ctx.arc(x + 16, y + 6, 18, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case T.BENCH: {
      ctx.fillStyle = '#2d5a27';
      ctx.fillRect(x, y, s, s);
      ctx.fillStyle = 'rgba(0,0,0,0.1)';
      ctx.fillRect(x + 5, y + 24, 22, 4);
      // Stone bench (castle style)
      ctx.fillStyle = '#555566';
      ctx.fillRect(x + 6, y + 16, 3, 10);
      ctx.fillRect(x + 23, y + 16, 3, 10);
      ctx.fillStyle = '#666677';
      ctx.fillRect(x + 4, y + 12, 24, 5);
      ctx.fillStyle = '#707088';
      ctx.fillRect(x + 4, y + 8, 24, 4);
      break;
    }
    case T.SAND: {
      // Gravel shore
      ctx.fillStyle = '#8a7a6a';
      ctx.fillRect(x, y, s, s);
      ctx.fillStyle = '#7a6a5a';
      if ((tx + ty) % 3 === 0) {
        ctx.fillRect(x + 4, y + 8, 3, 2);
        ctx.fillRect(x + 18, y + 20, 4, 2);
      }
      if (gameMap[ty - 1]?.[tx] === T.WATER || gameMap[ty + 1]?.[tx] === T.WATER) {
        ctx.fillStyle = 'rgba(26, 42, 74, 0.2)';
        ctx.fillRect(x, y, s, s);
      }
      break;
    }
    case T.LAMP: {
      // Floating candle / magical torch
      const nearPath = gameMap[ty]?.[tx - 1] === T.PATH || gameMap[ty]?.[tx + 1] === T.PATH;
      ctx.fillStyle = nearPath ? '#5a5060' : '#2d5a27';
      ctx.fillRect(x, y, s, s);
      // Torch bracket
      ctx.fillStyle = '#333';
      ctx.fillRect(x + 14, y + 12, 4, 18);
      // Torch head
      ctx.fillStyle = '#4a2a0a';
      ctx.fillRect(x + 12, y + 8, 8, 6);
      // Flame with flicker
      const flicker = Math.sin(globalFrame * 0.15 + tx * 5) * 2;
      ctx.fillStyle = '#ff6600';
      ctx.fillRect(x + 13, y + 4 + flicker, 6, 5);
      ctx.fillStyle = '#ffcc00';
      ctx.fillRect(x + 14, y + 2 + flicker, 4, 4);
      ctx.fillStyle = '#fff8e0';
      ctx.fillRect(x + 15, y + 3 + flicker, 2, 2);
      // Warm glow
      const glowPulse = 0.12 + Math.sin(globalFrame * 0.06 + tx) * 0.04;
      ctx.fillStyle = `rgba(255, 150, 50, ${glowPulse})`;
      ctx.beginPath();
      ctx.arc(x + 16, y + 6, 18, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    default:
      ctx.fillStyle = '#2d5a27';
      ctx.fillRect(x, y, s, s);
  }
};
