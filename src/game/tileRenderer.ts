import { TILE_SIZE, T, gameMap } from './mapData';

// Enhanced tile renderer with shadows, depth, and detail
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
      // Multi-shade grass with variation
      const shade = ((tx * 7 + ty * 13) % 5);
      const colors = ['#4a8c3f', '#4e9043', '#468837', '#529445', '#488a3b'];
      ctx.fillStyle = colors[shade];
      ctx.fillRect(x, y, s, s);
      // Detailed grass blades
      ctx.fillStyle = '#5a9c4f';
      const seed = tx * 31 + ty * 17;
      if (seed % 3 === 0) {
        ctx.fillRect(x + 6, y + 10, 1, 5);
        ctx.fillRect(x + 7, y + 9, 1, 3);
        ctx.fillRect(x + 22, y + 5, 1, 4);
        ctx.fillRect(x + 23, y + 4, 1, 3);
      }
      if (seed % 5 === 0) {
        ctx.fillRect(x + 14, y + 18, 1, 4);
        ctx.fillRect(x + 26, y + 14, 1, 5);
      }
      // Subtle shadow from adjacent trees
      if (gameMap[ty - 1]?.[tx] === T.TREE) {
        ctx.fillStyle = 'rgba(0,0,0,0.08)';
        ctx.fillRect(x, y, s, 8);
      }
      break;
    }
    case T.GRASS_DARK: {
      ctx.fillStyle = '#3d7a33';
      ctx.fillRect(x, y, s, s);
      ctx.fillStyle = '#356d2b';
      ctx.fillRect(x + 4, y + 6, 3, 3);
      ctx.fillRect(x + 18, y + 20, 4, 2);
      ctx.fillStyle = '#4a8c3f';
      ctx.fillRect(x + 10, y + 8, 1, 4);
      ctx.fillRect(x + 24, y + 2, 1, 3);
      // Small mushroom
      if ((tx + ty) % 7 === 0) {
        ctx.fillStyle = '#8a6a3a';
        ctx.fillRect(x + 20, y + 22, 2, 4);
        ctx.fillStyle = '#c0392b';
        ctx.fillRect(x + 18, y + 20, 6, 3);
        ctx.fillStyle = '#fff';
        ctx.fillRect(x + 19, y + 20, 1, 1);
        ctx.fillRect(x + 22, y + 21, 1, 1);
      }
      break;
    }
    case T.PATH: {
      ctx.fillStyle = '#c4a87a';
      ctx.fillRect(x, y, s, s);
      // Cobblestone pattern
      ctx.fillStyle = '#b89e6e';
      const px = (tx * 5 + ty * 3) % 4;
      ctx.fillRect(x + 1 + px * 3, y + 2, 7, 6);
      ctx.fillRect(x + 16 + px * 2, y + 18, 9, 7);
      ctx.fillStyle = '#d4b88a';
      ctx.fillRect(x + 3 + px * 2, y + 10, 5, 5);
      ctx.fillRect(x + 22, y + 4, 6, 5);
      // Edge detail
      ctx.fillStyle = '#a89060';
      if (gameMap[ty]?.[tx - 1] !== T.PATH && gameMap[ty]?.[tx - 1] !== undefined) {
        ctx.fillRect(x, y, 1, s);
      }
      if (gameMap[ty - 1]?.[tx] !== T.PATH && gameMap[ty - 1]?.[tx] !== undefined) {
        ctx.fillRect(x, y, s, 1);
      }
      break;
    }
    case T.WATER: {
      const wf = waterFrame;
      const base = wf === 0 ? '#3078a0' : wf === 1 ? '#3882aa' : '#2a6e96';
      ctx.fillStyle = base;
      ctx.fillRect(x, y, s, s);
      // Animated waves
      ctx.fillStyle = '#4a9cc0';
      const off1 = (wf * 10 + tx * 7) % s;
      const off2 = (wf * 6 + ty * 5) % s;
      ctx.fillRect(x + off1, y + 6, 10, 2);
      ctx.fillRect(x + (off1 + 14) % s, y + 18, 8, 2);
      // Deeper water highlight
      ctx.fillStyle = '#5ab0d8';
      ctx.fillRect(x + off2, y + 12, 6, 1);
      // Foam at shore edges
      if (gameMap[ty - 1]?.[tx] !== T.WATER && gameMap[ty - 1]?.[tx] !== undefined) {
        ctx.fillStyle = 'rgba(200, 230, 255, 0.4)';
        ctx.fillRect(x, y, s, 3);
      }
      if (gameMap[ty + 1]?.[tx] !== T.WATER && gameMap[ty + 1]?.[tx] !== undefined) {
        ctx.fillStyle = 'rgba(200, 230, 255, 0.3)';
        ctx.fillRect(x, y + s - 3, s, 3);
      }
      break;
    }
    case T.TREE: {
      // Ground underneath
      ctx.fillStyle = '#4a8c3f';
      ctx.fillRect(x, y, s, s);
      // Tree shadow
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.beginPath();
      ctx.ellipse(x + 16, y + 28, 12, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      // Trunk with bark detail
      ctx.fillStyle = '#5a3a1a';
      ctx.fillRect(x + 12, y + 16, 8, 14);
      ctx.fillStyle = '#6b4423';
      ctx.fillRect(x + 13, y + 17, 6, 12);
      ctx.fillStyle = '#4a2a10';
      ctx.fillRect(x + 14, y + 20, 2, 3);
      ctx.fillRect(x + 16, y + 24, 1, 2);
      // Multi-layered canopy
      ctx.fillStyle = '#1d5b0e';
      ctx.fillRect(x + 2, y + 4, 28, 14);
      ctx.fillStyle = '#2d6b1e';
      ctx.fillRect(x + 4, y + 2, 24, 14);
      ctx.fillStyle = '#3a8a2a';
      ctx.fillRect(x + 7, y + 0, 18, 12);
      // Leaf highlights
      ctx.fillStyle = '#4ca036';
      ctx.fillRect(x + 10, y + 2, 4, 3);
      ctx.fillRect(x + 18, y + 4, 3, 2);
      ctx.fillRect(x + 8, y + 8, 2, 2);
      // Leaf shadows
      ctx.fillStyle = '#1a5010';
      ctx.fillRect(x + 5, y + 12, 5, 3);
      ctx.fillRect(x + 22, y + 8, 4, 3);
      break;
    }
    case T.WALL: {
      // Stone wall with brick pattern
      ctx.fillStyle = '#6a5b4a';
      ctx.fillRect(x, y, s, s);
      // Brick rows
      for (let row = 0; row < 4; row++) {
        const offset = row % 2 === 0 ? 0 : 8;
        for (let col = 0; col < 3; col++) {
          ctx.fillStyle = '#7a6b5a';
          ctx.fillRect(x + offset + col * 11 + 1, y + row * 8 + 1, 9, 6);
          // Highlight
          ctx.fillStyle = '#8a7b6a';
          ctx.fillRect(x + offset + col * 11 + 1, y + row * 8 + 1, 9, 1);
        }
      }
      // Window with glow
      ctx.fillStyle = '#2a4a6a';
      ctx.fillRect(x + 9, y + 7, 14, 12);
      ctx.fillStyle = '#5aafc8';
      ctx.fillRect(x + 10, y + 8, 12, 10);
      // Window cross
      ctx.fillStyle = '#6a5b4a';
      ctx.fillRect(x + 15, y + 8, 2, 10);
      ctx.fillRect(x + 10, y + 12, 12, 2);
      // Window glow
      ctx.fillStyle = 'rgba(90, 175, 200, 0.1)';
      ctx.fillRect(x + 6, y + 4, 20, 20);
      break;
    }
    case T.ROOF: {
      ctx.fillStyle = '#a83a2a';
      ctx.fillRect(x, y, s, s);
      // Detailed shingles
      for (let row = 0; row < 4; row++) {
        const offset = row % 2 === 0 ? 0 : 4;
        for (let col = 0; col < 5; col++) {
          const shade = (row + col) % 2 === 0 ? '#b84a3a' : '#c85a4a';
          ctx.fillStyle = shade;
          ctx.fillRect(x + offset + col * 7, y + row * 8, 6, 7);
        }
      }
      // Ridge highlight
      ctx.fillStyle = '#d86a5a';
      ctx.fillRect(x, y, s, 2);
      break;
    }
    case T.DOOR_ABOUT: case T.DOOR_SKILLS: case T.DOOR_PROJECTS: case T.DOOR_CONTACT: {
      // Wall base
      ctx.fillStyle = '#6a5b4a';
      ctx.fillRect(x, y, s, s);
      ctx.fillStyle = '#7a6b5a';
      ctx.fillRect(x + 1, y + 1, s - 2, s - 2);
      // Door frame
      ctx.fillStyle = '#4a2a0a';
      ctx.fillRect(x + 6, y + 1, 20, 30);
      // Door panels
      ctx.fillStyle = '#5a3a1a';
      ctx.fillRect(x + 8, y + 3, 16, 26);
      // Panel details
      ctx.fillStyle = '#6a4a2a';
      ctx.fillRect(x + 9, y + 4, 14, 10);
      ctx.fillRect(x + 9, y + 17, 14, 10);
      // Handle
      ctx.fillStyle = '#ffd700';
      ctx.fillRect(x + 19, y + 14, 3, 3);
      ctx.fillStyle = '#daa520';
      ctx.fillRect(x + 20, y + 15, 1, 1);
      // Glowing welcome mat effect
      const pulse = Math.sin(globalFrame * 0.06) * 0.15 + 0.25;
      ctx.fillStyle = `rgba(255, 215, 0, ${pulse})`;
      ctx.fillRect(x + 4, y + s - 4, 24, 4);
      break;
    }
    case T.FLOWER: {
      ctx.fillStyle = '#4a8c3f';
      ctx.fillRect(x, y, s, s);
      // Multiple flowers
      const flowerColors = ['#e74c3c', '#f1c40f', '#e67e22', '#9b59b6', '#3498db'];
      const c1 = flowerColors[(tx + ty) % flowerColors.length];
      const c2 = flowerColors[(tx * 3 + ty * 2) % flowerColors.length];
      // Flower 1 - larger
      ctx.fillStyle = '#3a7a2f';
      ctx.fillRect(x + 10, y + 16, 2, 10);
      ctx.fillStyle = c1;
      ctx.fillRect(x + 7, y + 10, 3, 3);
      ctx.fillRect(x + 13, y + 10, 3, 3);
      ctx.fillRect(x + 10, y + 7, 3, 3);
      ctx.fillRect(x + 10, y + 13, 3, 3);
      ctx.fillStyle = '#fff';
      ctx.fillRect(x + 10, y + 10, 3, 3);
      // Flower 2 - smaller
      ctx.fillStyle = '#3a7a2f';
      ctx.fillRect(x + 22, y + 20, 1, 6);
      ctx.fillStyle = c2;
      ctx.fillRect(x + 20, y + 18, 2, 2);
      ctx.fillRect(x + 24, y + 18, 2, 2);
      ctx.fillRect(x + 22, y + 16, 2, 2);
      ctx.fillRect(x + 22, y + 20, 2, 2);
      ctx.fillStyle = '#f1c40f';
      ctx.fillRect(x + 22, y + 18, 2, 2);
      break;
    }
    case T.SIGN_ABOUT: case T.SIGN_SKILLS: case T.SIGN_PROJECTS: case T.SIGN_CONTACT: {
      ctx.fillStyle = '#4a8c3f';
      ctx.fillRect(x, y, s, s);
      // Post with shadow
      ctx.fillStyle = 'rgba(0,0,0,0.1)';
      ctx.fillRect(x + 16, y + 16, 4, 16);
      ctx.fillStyle = '#5a3a1a';
      ctx.fillRect(x + 14, y + 14, 4, 18);
      // Sign board
      ctx.fillStyle = '#8a6a3a';
      ctx.fillRect(x + 3, y + 3, 26, 14);
      ctx.fillStyle = '#c4a87a';
      ctx.fillRect(x + 4, y + 4, 24, 12);
      // Border detail
      ctx.strokeStyle = '#5a3a1a';
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 4, y + 4, 24, 12);
      // Exclamation with bounce effect
      const bounce = Math.sin(globalFrame * 0.08 + tx) * 2;
      ctx.fillStyle = '#e74c3c';
      ctx.font = 'bold 10px "Press Start 2P", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('!', x + 16, y + 14 + bounce);
      break;
    }
    case T.FOUNTAIN: {
      ctx.fillStyle = '#c4a87a';
      ctx.fillRect(x, y, s, s);
      // Stone base with shadow
      ctx.fillStyle = 'rgba(0,0,0,0.1)';
      ctx.beginPath();
      ctx.ellipse(x + 16, y + 28, 14, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#707070';
      ctx.fillRect(x + 3, y + 3, 26, 26);
      ctx.fillStyle = '#909090';
      ctx.fillRect(x + 5, y + 5, 22, 22);
      // Water in fountain
      const wShift = Math.sin(globalFrame * 0.05) * 2;
      ctx.fillStyle = '#4a9cc0';
      ctx.fillRect(x + 7, y + 7, 18, 18);
      ctx.fillStyle = '#5ab0d8';
      ctx.fillRect(x + 9 + wShift, y + 10, 6, 2);
      ctx.fillRect(x + 15 - wShift, y + 18, 5, 2);
      // Center pillar
      ctx.fillStyle = '#b0b0b0';
      ctx.fillRect(x + 13, y + 9, 6, 14);
      ctx.fillStyle = '#c8c8c8';
      ctx.fillRect(x + 11, y + 7, 10, 4);
      // Water spray animation
      ctx.fillStyle = `rgba(120, 200, 255, ${0.4 + Math.sin(globalFrame * 0.1) * 0.2})`;
      ctx.fillRect(x + 14, y + 4 - Math.abs(wShift), 4, 4);
      break;
    }
    case T.BENCH: {
      ctx.fillStyle = '#4a8c3f';
      ctx.fillRect(x, y, s, s);
      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.1)';
      ctx.fillRect(x + 5, y + 24, 22, 4);
      // Bench legs
      ctx.fillStyle = '#4a2a10';
      ctx.fillRect(x + 6, y + 16, 3, 10);
      ctx.fillRect(x + 23, y + 16, 3, 10);
      // Seat
      ctx.fillStyle = '#6b4423';
      ctx.fillRect(x + 4, y + 12, 24, 5);
      // Seat planks
      ctx.fillStyle = '#7a5433';
      ctx.fillRect(x + 4, y + 12, 24, 1);
      ctx.fillRect(x + 4, y + 15, 24, 1);
      // Backrest
      ctx.fillStyle = '#6b4423';
      ctx.fillRect(x + 4, y + 8, 24, 4);
      ctx.fillStyle = '#7a5433';
      ctx.fillRect(x + 4, y + 9, 24, 1);
      break;
    }
    case T.SAND: {
      ctx.fillStyle = '#d4c4a0';
      ctx.fillRect(x, y, s, s);
      ctx.fillStyle = '#c4b490';
      if ((tx + ty) % 3 === 0) {
        ctx.fillRect(x + 4, y + 8, 3, 2);
        ctx.fillRect(x + 18, y + 20, 4, 2);
      }
      // Small shells
      if ((tx * 7 + ty * 3) % 11 === 0) {
        ctx.fillStyle = '#e8d8c0';
        ctx.fillRect(x + 12, y + 14, 3, 2);
        ctx.fillRect(x + 13, y + 13, 1, 1);
      }
      // Water-sand transition
      if (gameMap[ty - 1]?.[tx] === T.WATER || gameMap[ty + 1]?.[tx] === T.WATER) {
        ctx.fillStyle = 'rgba(90, 175, 200, 0.15)';
        ctx.fillRect(x, y, s, s);
      }
      break;
    }
    case T.LAMP: {
      // Ground
      const nearPath = gameMap[ty]?.[tx - 1] === T.PATH || gameMap[ty]?.[tx + 1] === T.PATH;
      ctx.fillStyle = nearPath ? '#c4a87a' : '#4a8c3f';
      ctx.fillRect(x, y, s, s);
      // Lamp shadow
      ctx.fillStyle = 'rgba(0,0,0,0.1)';
      ctx.beginPath();
      ctx.ellipse(x + 16, y + 30, 8, 3, 0, 0, Math.PI * 2);
      ctx.fill();
      // Post
      ctx.fillStyle = '#444';
      ctx.fillRect(x + 14, y + 8, 4, 22);
      ctx.fillStyle = '#555';
      ctx.fillRect(x + 15, y + 9, 2, 20);
      // Lamp head
      ctx.fillStyle = '#666';
      ctx.fillRect(x + 10, y + 4, 12, 6);
      ctx.fillStyle = '#ffd700';
      ctx.fillRect(x + 11, y + 5, 10, 4);
      // Light glow
      const glowPulse = 0.12 + Math.sin(globalFrame * 0.04) * 0.03;
      ctx.fillStyle = `rgba(255, 215, 0, ${glowPulse})`;
      ctx.beginPath();
      ctx.arc(x + 16, y + 7, 16, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    default:
      ctx.fillStyle = '#4a8c3f';
      ctx.fillRect(x, y, s, s);
  }
};
