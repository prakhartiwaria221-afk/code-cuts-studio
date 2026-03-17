import { useRef, useEffect, useState, useCallback } from 'react';
import { gameMap, TILE_SIZE, MAP_W, MAP_H, T, isWalkable, isInteractive, SPAWN, BUILDING_LABELS, PORTFOLIO_CONTENT } from './mapData';
import { createNPCs, updateNPC, drawNPC, isNearNPC, NPC } from './npcs';
import { playStep, playInteract, playDialogOpen, playDialogClose, playMenuSelect, startMusic, stopMusic, toggleMusic, initAudio } from './audioEngine';
import { getLightingState, drawLightingOverlay, LightingState } from './dayNightCycle';
import { drawMiniMap } from './MiniMap';
import GameDialog from './GameDialog';

type Direction = 0 | 1 | 2 | 3;

const GameWorld = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'dialog'>('start');
  const [dialogKey, setDialogKey] = useState<string | null>(null);
  const [npcDialog, setNpcDialog] = useState<{ title: string; lines: string[] } | null>(null);
  const [hint, setHint] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [musicOn, setMusicOn] = useState(true);

  const playerRef = useRef({
    x: SPAWN.x * TILE_SIZE, y: SPAWN.y * TILE_SIZE,
    dir: 0 as Direction, frame: 0, frameTimer: 0, moving: false,
  });
  const keysRef = useRef(new Set<string>());
  const cameraRef = useRef({ x: 0, y: 0 });
  const waterFrameRef = useRef(0);
  const waterTimerRef = useRef(0);
  const npcsRef = useRef<NPC[]>(createNPCs());
  const cycleStartRef = useRef(Date.now());
  const pulseFrameRef = useRef(0);
  const lightingRef = useRef<LightingState>(getLightingState(0));

  useEffect(() => {
    setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    const resize = () => {
      const c = canvasRef.current;
      if (c) { c.width = window.innerWidth; c.height = window.innerHeight; }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const tryInteract = useCallback(() => {
    const p = playerRef.current;
    const cx = Math.floor((p.x + TILE_SIZE / 2) / TILE_SIZE);
    const cy = Math.floor((p.y + TILE_SIZE / 2) / TILE_SIZE);

    // Check NPCs first
    for (const npc of npcsRef.current) {
      if (isNearNPC(p.x, p.y, npc)) {
        playInteract();
        setNpcDialog({ title: `💬 ${npc.name}`, lines: npc.dialog });
        setGameState('dialog');
        return;
      }
    }

    // Check tiles
    const dirs = [[0, -1], [0, 1], [-1, 0], [1, 0], [0, 0]];
    for (const [dx, dy] of dirs) {
      const tile = gameMap[cy + dy]?.[cx + dx];
      if (tile !== undefined) {
        const zone = isInteractive(tile);
        if (zone && PORTFOLIO_CONTENT[zone as keyof typeof PORTFOLIO_CONTENT]) {
          playDialogOpen();
          setDialogKey(zone);
          setGameState('dialog');
          return;
        }
      }
    }
  }, []);

  const closeDialog = useCallback(() => {
    playDialogClose();
    setDialogKey(null);
    setNpcDialog(null);
    setGameState('playing');
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      keysRef.current.add(k);
      if (k === ' ' || k === 'e') { e.preventDefault(); if (gameState === 'playing') tryInteract(); }
      if (k === 'escape' && gameState === 'dialog') closeDialog();
      if (k === 'm' && gameState === 'playing') setMusicOn(toggleMusic());
    };
    const up = (e: KeyboardEvent) => keysRef.current.delete(e.key.toLowerCase());
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); };
  }, [gameState, tryInteract, closeDialog]);

  const mobilePress = useCallback((key: string) => { keysRef.current.add(key); }, []);
  const mobileRelease = useCallback((key: string) => { keysRef.current.delete(key); }, []);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    ctx.imageSmoothingEnabled = false;

    let animId: number;
    const loop = () => {
      update();
      render(ctx, canvas.width, canvas.height);
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [gameState]);

  const canWalk = (x: number, y: number) => {
    const margin = 6;
    const corners = [
      [x + margin, y + margin], [x + TILE_SIZE - margin, y + margin],
      [x + margin, y + TILE_SIZE - margin], [x + TILE_SIZE - margin, y + TILE_SIZE - margin],
    ];
    return corners.every(([cx, cy]) => {
      const tx = Math.floor(cx / TILE_SIZE);
      const ty = Math.floor(cy / TILE_SIZE);
      return gameMap[ty]?.[tx] !== undefined && isWalkable(gameMap[ty][tx]);
    });
  };

  const update = () => {
    const p = playerRef.current;
    const keys = keysRef.current;
    const speed = 2.5;
    let dx = 0, dy = 0;

    if (keys.has('arrowup') || keys.has('w')) { dy = -speed; p.dir = 1; }
    if (keys.has('arrowdown') || keys.has('s')) { dy = speed; p.dir = 0; }
    if (keys.has('arrowleft') || keys.has('a')) { dx = -speed; p.dir = 2; }
    if (keys.has('arrowright') || keys.has('d')) { dx = speed; p.dir = 3; }

    p.moving = dx !== 0 || dy !== 0;
    if (dx !== 0 && canWalk(p.x + dx, p.y)) p.x += dx;
    if (dy !== 0 && canWalk(p.x, p.y + dy)) p.y += dy;

    if (p.moving) {
      playStep();
      p.frameTimer++;
      if (p.frameTimer > 8) { p.frame = (p.frame + 1) % 4; p.frameTimer = 0; }
    } else {
      p.frame = 0;
    }

    // Update NPCs
    npcsRef.current.forEach(updateNPC);

    // Water animation
    waterTimerRef.current++;
    if (waterTimerRef.current > 30) {
      waterFrameRef.current = (waterFrameRef.current + 1) % 3;
      waterTimerRef.current = 0;
    }

    // Day/night cycle
    pulseFrameRef.current++;
    lightingRef.current = getLightingState(Date.now() - cycleStartRef.current);

    // Hint
    const cx = Math.floor((p.x + TILE_SIZE / 2) / TILE_SIZE);
    const cy = Math.floor((p.y + TILE_SIZE / 2) / TILE_SIZE);
    let foundHint = '';

    // NPC hint
    for (const npc of npcsRef.current) {
      if (isNearNPC(p.x, p.y, npc)) {
        foundHint = isMobile ? `Tap [A] to talk to ${npc.name}` : `Press SPACE to talk to ${npc.name}`;
        break;
      }
    }

    if (!foundHint) {
      const dirs = [[0, -1], [0, 1], [-1, 0], [1, 0]];
      for (const [ddx, ddy] of dirs) {
        const tile = gameMap[cy + ddy]?.[cx + ddx];
        if (tile !== undefined && isInteractive(tile)) {
          foundHint = isMobile ? 'Tap [A] to interact' : 'Press SPACE to interact';
          break;
        }
      }
    }
    setHint(foundHint);
  };

  const render = (ctx: CanvasRenderingContext2D, cw: number, ch: number) => {
    const p = playerRef.current;
    const cam = cameraRef.current;
    cam.x = p.x + TILE_SIZE / 2 - cw / 2;
    cam.y = p.y + TILE_SIZE / 2 - ch / 2;
    cam.x = Math.max(0, Math.min(cam.x, MAP_W * TILE_SIZE - cw));
    cam.y = Math.max(0, Math.min(cam.y, MAP_H * TILE_SIZE - ch));

    ctx.clearRect(0, 0, cw, ch);

    const startX = Math.floor(cam.x / TILE_SIZE);
    const startY = Math.floor(cam.y / TILE_SIZE);
    const endX = Math.min(MAP_W, startX + Math.ceil(cw / TILE_SIZE) + 2);
    const endY = Math.min(MAP_H, startY + Math.ceil(ch / TILE_SIZE) + 2);

    for (let y = startY; y < endY; y++) {
      for (let x = startX; x < endX; x++) {
        const tile = gameMap[y]?.[x];
        if (tile === undefined) continue;
        drawTile(ctx, tile, x * TILE_SIZE - cam.x, y * TILE_SIZE - cam.y, x, y);
      }
    }

    // Building labels
    ctx.font = '10px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.shadowColor = '#000';
    ctx.shadowBlur = 4;
    BUILDING_LABELS.forEach(label => {
      ctx.fillText(label.text, label.x * TILE_SIZE - cam.x, label.y * TILE_SIZE - cam.y);
    });
    ctx.shadowBlur = 0;

    // Draw NPCs
    npcsRef.current.forEach(npc => drawNPC(ctx, npc, cam.x, cam.y));

    // Draw player
    drawPlayer(ctx, p.x - cam.x, p.y - cam.y, p.dir, p.frame);

    // Player name tag
    ctx.font = '8px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.shadowColor = '#000';
    ctx.shadowBlur = 3;
    ctx.fillText('Prakhar', p.x - cam.x + TILE_SIZE / 2, p.y - cam.y - 6);
    ctx.shadowBlur = 0;
  };

  const drawTile = (ctx: CanvasRenderingContext2D, tile: number, x: number, y: number, tx: number, ty: number) => {
    const s = TILE_SIZE;
    switch (tile) {
      case T.GRASS:
        ctx.fillStyle = '#4a8c3f'; ctx.fillRect(x, y, s, s);
        ctx.fillStyle = '#5a9c4f';
        if ((tx + ty) % 3 === 0) { ctx.fillRect(x + 8, y + 12, 2, 4); ctx.fillRect(x + 20, y + 6, 2, 4); }
        break;
      case T.GRASS_DARK:
        ctx.fillStyle = '#3d7a33'; ctx.fillRect(x, y, s, s);
        ctx.fillStyle = '#4a8c3f'; ctx.fillRect(x + 10, y + 8, 3, 3);
        break;
      case T.PATH:
        ctx.fillStyle = '#c4a87a'; ctx.fillRect(x, y, s, s);
        ctx.fillStyle = '#b89e6e';
        if ((tx + ty) % 2 === 0) { ctx.fillRect(x + 2, y + 2, 6, 6); ctx.fillRect(x + 18, y + 20, 8, 6); }
        ctx.strokeStyle = '#b89e6e'; ctx.lineWidth = 0.5; ctx.strokeRect(x, y, s, s);
        break;
      case T.WATER: {
        const wf = waterFrameRef.current;
        ctx.fillStyle = wf === 0 ? '#3d7ea6' : wf === 1 ? '#4a8eb6' : '#357496';
        ctx.fillRect(x, y, s, s);
        ctx.fillStyle = '#5aa0c8';
        const off = (wf * 8 + tx * 5) % s;
        ctx.fillRect(x + off, y + 8, 8, 2); ctx.fillRect(x + (off + 16) % s, y + 22, 6, 2);
        break;
      }
      case T.TREE:
        ctx.fillStyle = '#4a8c3f'; ctx.fillRect(x, y, s, s);
        ctx.fillStyle = '#6b4423'; ctx.fillRect(x + 12, y + 18, 8, 14);
        ctx.fillStyle = '#2d6b1e'; ctx.fillRect(x + 4, y + 2, 24, 18);
        ctx.fillStyle = '#3a8a2a'; ctx.fillRect(x + 8, y + 0, 16, 14);
        ctx.fillStyle = '#1d5b0e'; ctx.fillRect(x + 6, y + 10, 4, 4); ctx.fillRect(x + 22, y + 6, 4, 4);
        break;
      case T.WALL:
        ctx.fillStyle = '#7a6b5a'; ctx.fillRect(x, y, s, s);
        ctx.fillStyle = '#8a7b6a'; ctx.fillRect(x + 1, y + 1, s - 2, s - 2);
        ctx.fillStyle = '#5aafc8'; ctx.fillRect(x + 10, y + 8, 12, 10);
        ctx.fillStyle = '#4a9fb8'; ctx.fillRect(x + 15, y + 8, 2, 10); ctx.fillRect(x + 10, y + 12, 12, 2);
        break;
      case T.ROOF:
        ctx.fillStyle = '#b84a3a'; ctx.fillRect(x, y, s, s);
        ctx.fillStyle = '#c85a4a';
        for (let i = 0; i < s; i += 8) ctx.fillRect(x + i, y + ((i / 8) % 2) * 4, 8, 4);
        break;
      case T.DOOR_ABOUT: case T.DOOR_SKILLS: case T.DOOR_PROJECTS: case T.DOOR_CONTACT:
        ctx.fillStyle = '#7a6b5a'; ctx.fillRect(x, y, s, s);
        ctx.fillStyle = '#5a3a1a'; ctx.fillRect(x + 8, y + 2, 16, 28);
        ctx.fillStyle = '#7a5a2a'; ctx.fillRect(x + 10, y + 4, 12, 24);
        ctx.fillStyle = '#daa520'; ctx.fillRect(x + 18, y + 14, 3, 3);
        ctx.fillStyle = 'rgba(255, 215, 0, 0.3)'; ctx.fillRect(x + 6, y, 20, s);
        break;
      case T.FLOWER: {
        ctx.fillStyle = '#4a8c3f'; ctx.fillRect(x, y, s, s);
        const colors = ['#e74c3c', '#f1c40f', '#e67e22', '#9b59b6'];
        const fc = colors[(tx + ty) % colors.length];
        ctx.fillStyle = '#3a7a2f'; ctx.fillRect(x + 14, y + 16, 3, 10);
        ctx.fillStyle = fc;
        ctx.fillRect(x + 10, y + 10, 4, 4); ctx.fillRect(x + 18, y + 10, 4, 4);
        ctx.fillRect(x + 14, y + 6, 4, 4); ctx.fillRect(x + 14, y + 14, 4, 4);
        ctx.fillStyle = '#f1c40f'; ctx.fillRect(x + 14, y + 10, 4, 4);
        break;
      }
      case T.SIGN_ABOUT: case T.SIGN_SKILLS: case T.SIGN_PROJECTS: case T.SIGN_CONTACT:
        ctx.fillStyle = '#4a8c3f'; ctx.fillRect(x, y, s, s);
        ctx.fillStyle = '#6b4423'; ctx.fillRect(x + 14, y + 16, 4, 16);
        ctx.fillStyle = '#c4a87a'; ctx.fillRect(x + 4, y + 4, 24, 14);
        ctx.strokeStyle = '#5a3a1a'; ctx.lineWidth = 1; ctx.strokeRect(x + 4, y + 4, 24, 14);
        ctx.fillStyle = '#e74c3c'; ctx.font = '10px "Press Start 2P", monospace'; ctx.textAlign = 'center';
        ctx.fillText('!', x + 16, y + 15);
        break;
      case T.FOUNTAIN:
        ctx.fillStyle = '#c4a87a'; ctx.fillRect(x, y, s, s);
        ctx.fillStyle = '#8a8a8a'; ctx.fillRect(x + 4, y + 4, 24, 24);
        ctx.fillStyle = '#a0a0a0'; ctx.fillRect(x + 6, y + 6, 20, 20);
        ctx.fillStyle = '#5aafc8'; ctx.fillRect(x + 8, y + 8, 16, 16);
        ctx.fillStyle = '#c0c0c0'; ctx.fillRect(x + 13, y + 10, 6, 12); ctx.fillRect(x + 11, y + 8, 10, 4);
        break;
      case T.BENCH:
        ctx.fillStyle = '#4a8c3f'; ctx.fillRect(x, y, s, s);
        ctx.fillStyle = '#6b4423'; ctx.fillRect(x + 4, y + 12, 24, 4);
        ctx.fillRect(x + 6, y + 16, 4, 8); ctx.fillRect(x + 22, y + 16, 4, 8);
        ctx.fillStyle = '#8a6a3a'; ctx.fillRect(x + 4, y + 10, 24, 3);
        break;
      case T.SAND:
        ctx.fillStyle = '#d4c4a0'; ctx.fillRect(x, y, s, s);
        ctx.fillStyle = '#c4b490';
        if ((tx + ty) % 2 === 0) ctx.fillRect(x + 6, y + 10, 4, 2);
        break;
      case T.LAMP:
        ctx.fillStyle = T.PATH === gameMap[ty]?.[tx - 1] || T.PATH === gameMap[ty]?.[tx + 1] ? '#c4a87a' : '#4a8c3f';
        ctx.fillRect(x, y, s, s);
        ctx.fillStyle = '#555'; ctx.fillRect(x + 14, y + 8, 4, 22);
        ctx.fillStyle = '#ffd700'; ctx.fillRect(x + 10, y + 4, 12, 6);
        ctx.fillStyle = 'rgba(255, 215, 0, 0.15)';
        ctx.beginPath(); ctx.arc(x + 16, y + 7, 14, 0, Math.PI * 2); ctx.fill();
        break;
      default:
        ctx.fillStyle = '#4a8c3f'; ctx.fillRect(x, y, s, s);
    }
  };

  const drawPlayer = (ctx: CanvasRenderingContext2D, x: number, y: number, dir: Direction, frame: number) => {
    const s = 2;
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.beginPath(); ctx.ellipse(x + 16, y + 30, 10, 4, 0, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = '#f0c8a0';
    if (dir === 0) {
      ctx.fillRect(x + 5*s, y + 1*s, 6*s, 6*s);
      ctx.fillStyle = '#3d2b1f';
      ctx.fillRect(x + 5*s, y, 6*s, 2*s); ctx.fillRect(x + 4*s, y + 1*s, 1*s, 3*s); ctx.fillRect(x + 11*s, y + 1*s, 1*s, 3*s);
      ctx.fillStyle = '#222'; ctx.fillRect(x + 6*s, y + 4*s, 2*s, 1*s); ctx.fillRect(x + 9*s, y + 4*s, 2*s, 1*s);
      ctx.fillStyle = '#c0968a'; ctx.fillRect(x + 7*s, y + 6*s, 2*s, 1*s);
    } else if (dir === 1) {
      ctx.fillRect(x + 5*s, y + 1*s, 6*s, 6*s);
      ctx.fillStyle = '#3d2b1f'; ctx.fillRect(x + 4*s, y, 8*s, 4*s);
    } else if (dir === 2) {
      ctx.fillRect(x + 5*s, y + 1*s, 6*s, 6*s);
      ctx.fillStyle = '#3d2b1f'; ctx.fillRect(x + 5*s, y, 7*s, 2*s); ctx.fillRect(x + 11*s, y + 1*s, 1*s, 3*s);
      ctx.fillStyle = '#222'; ctx.fillRect(x + 6*s, y + 4*s, 2*s, 1*s);
    } else {
      ctx.fillRect(x + 5*s, y + 1*s, 6*s, 6*s);
      ctx.fillStyle = '#3d2b1f'; ctx.fillRect(x + 4*s, y, 7*s, 2*s); ctx.fillRect(x + 4*s, y + 1*s, 1*s, 3*s);
      ctx.fillStyle = '#222'; ctx.fillRect(x + 9*s, y + 4*s, 2*s, 1*s);
    }

    ctx.fillStyle = '#e74c3c'; ctx.fillRect(x + 4*s, y + 7*s, 8*s, 5*s);
    ctx.fillStyle = '#c0392b';
    if (frame % 4 < 2 || !playerRef.current.moving) {
      ctx.fillRect(x + 3*s, y + 7*s, 1*s, 4*s); ctx.fillRect(x + 12*s, y + 7*s, 1*s, 4*s);
    } else {
      ctx.fillRect(x + 3*s, y + 8*s, 1*s, 4*s); ctx.fillRect(x + 12*s, y + 6*s, 1*s, 4*s);
    }

    ctx.fillStyle = '#2c3e50';
    if (playerRef.current.moving) {
      if (frame % 4 < 2) {
        ctx.fillRect(x + 5*s, y + 12*s, 3*s, 3*s); ctx.fillRect(x + 9*s, y + 12*s, 3*s, 2*s);
      } else {
        ctx.fillRect(x + 5*s, y + 12*s, 3*s, 2*s); ctx.fillRect(x + 9*s, y + 12*s, 3*s, 3*s);
      }
    } else {
      ctx.fillRect(x + 5*s, y + 12*s, 3*s, 3*s); ctx.fillRect(x + 9*s, y + 12*s, 3*s, 3*s);
    }

    ctx.fillStyle = '#8b4513';
    ctx.fillRect(x + 4*s, y + 14*s, 4*s, 1*s); ctx.fillRect(x + 9*s, y + 14*s, 4*s, 1*s);
  };

  const handleStart = () => {
    initAudio();
    playMenuSelect();
    startMusic();
    setGameState('playing');
  };

  const handleToggleMusic = () => {
    setMusicOn(toggleMusic());
  };

  if (gameState === 'start') {
    return (
      <div className="fixed inset-0 bg-[#1a1a2e] flex flex-col items-center justify-center z-50" style={{ fontFamily: '"Press Start 2P", monospace' }}>
        <div className="absolute inset-4 border-4 border-[#4a8c3f] pointer-events-none" />
        <div className="absolute inset-6 border-2 border-[#4a8c3f]/50 pointer-events-none" />

        <div className="absolute top-16 left-16 w-2 h-2 bg-[#ffd700] animate-pulse" />
        <div className="absolute top-24 right-32 w-1.5 h-1.5 bg-[#ffd700] animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-32 left-24 w-2 h-2 bg-[#ffd700] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-40 left-[40%] w-1 h-1 bg-white animate-pulse" style={{ animationDelay: '0.3s' }} />
        <div className="absolute bottom-20 right-20 w-1.5 h-1.5 bg-white animate-pulse" style={{ animationDelay: '0.8s' }} />

        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-[#4a8c3f] text-3xl sm:text-5xl mb-4 leading-relaxed tracking-wider">PRAKHAR</h1>
          <h1 className="text-[#5aafc8] text-3xl sm:text-5xl mb-6 leading-relaxed tracking-wider">TIWARI</h1>
          <div className="flex items-center gap-3 justify-center mb-4">
            <div className="w-8 h-0.5 bg-[#c4a87a]" />
            <p className="text-[#c4a87a] text-xs tracking-[0.3em]">PORTFOLIO</p>
            <div className="w-8 h-0.5 bg-[#c4a87a]" />
          </div>
          <p className="text-[#8a8a8a] text-[8px] sm:text-[10px] leading-relaxed max-w-md mx-auto px-4">
            Front-End Developer, Video Editor<br />& Tech Creator
          </p>
        </div>

        <button onClick={handleStart}
          className="bg-[#e74c3c] hover:bg-[#c0392b] text-white px-10 py-3 text-sm tracking-widest transition-all duration-200 hover:scale-105 border-b-4 border-[#962d22] active:border-b-0 active:mt-1 mb-8">
          PLAY
        </button>

        <div className="text-[#6a6a6a] text-[8px] text-center space-y-2">
          <p>WASD / Arrow Keys to move</p>
          <p>SPACE to interact | M toggle music</p>
        </div>

        <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-4">
          <p className="text-[#6a6a6a] text-[7px]">No time to explore?</p>
          <a href="https://linkedin.com/in/prakhar-tiwari-8b04a7296" target="_blank" rel="noopener noreferrer"
            className="bg-[#0077b5] text-white px-4 py-1.5 text-[8px] hover:bg-[#005f8d] transition-colors">LinkedIn</a>
        </div>
      </div>
    );
  }

  const dialogContent = npcDialog || (dialogKey ? PORTFOLIO_CONTENT[dialogKey as keyof typeof PORTFOLIO_CONTENT] : null);

  return (
    <div className="fixed inset-0 bg-[#1a1a2e]" style={{ fontFamily: '"Press Start 2P", monospace' }}>
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* HUD */}
      <div className="absolute top-4 left-4 bg-black/70 px-4 py-2 border border-[#4a8c3f]/50">
        <p className="text-[#4a8c3f] text-[8px]">🎮 Prakhar's World</p>
      </div>

      {/* Music toggle */}
      <button onClick={handleToggleMusic}
        className="absolute top-4 right-4 bg-black/70 px-3 py-2 border border-[#5aafc8]/50 text-[#5aafc8] text-[8px] hover:bg-black/90 transition-colors sm:right-auto sm:left-1/2 sm:-translate-x-1/2">
        {musicOn ? '🔊 Music ON' : '🔇 Music OFF'} [M]
      </button>

      {/* Controls hint */}
      <div className="absolute top-4 right-4 bg-black/70 px-4 py-2 border border-[#5aafc8]/50 hidden sm:block">
        <p className="text-[#5aafc8] text-[7px]">WASD Move | SPACE Interact | M Music</p>
      </div>

      {/* Interaction hint */}
      {hint && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-black/80 px-6 py-3 border-2 border-[#ffd700] animate-pulse">
          <p className="text-[#ffd700] text-[10px] whitespace-nowrap">{hint}</p>
        </div>
      )}

      {/* Mobile controls */}
      {isMobile && (
        <>
          <div className="absolute bottom-8 left-8 grid grid-cols-3 grid-rows-3 gap-1" style={{ width: '120px', height: '120px' }}>
            <div />
            <button onTouchStart={() => mobilePress('arrowup')} onTouchEnd={() => mobileRelease('arrowup')}
              className="bg-black/60 border border-white/30 text-white text-lg flex items-center justify-center active:bg-white/20 select-none">▲</button>
            <div />
            <button onTouchStart={() => mobilePress('arrowleft')} onTouchEnd={() => mobileRelease('arrowleft')}
              className="bg-black/60 border border-white/30 text-white text-lg flex items-center justify-center active:bg-white/20 select-none">◄</button>
            <div className="bg-black/30 border border-white/10" />
            <button onTouchStart={() => mobilePress('arrowright')} onTouchEnd={() => mobileRelease('arrowright')}
              className="bg-black/60 border border-white/30 text-white text-lg flex items-center justify-center active:bg-white/20 select-none">►</button>
            <div />
            <button onTouchStart={() => mobilePress('arrowdown')} onTouchEnd={() => mobileRelease('arrowdown')}
              className="bg-black/60 border border-white/30 text-white text-lg flex items-center justify-center active:bg-white/20 select-none">▼</button>
            <div />
          </div>
          <button onTouchStart={() => { keysRef.current.add(' '); tryInteract(); }} onTouchEnd={() => keysRef.current.delete(' ')}
            className="absolute bottom-12 right-12 w-16 h-16 rounded-full bg-[#e74c3c]/80 border-2 border-[#e74c3c] text-white text-sm flex items-center justify-center active:scale-90 select-none">A</button>
        </>
      )}

      {/* Dialog */}
      {gameState === 'dialog' && dialogContent && (
        <GameDialog content={dialogContent} onClose={closeDialog} />
      )}
    </div>
  );
};

export default GameWorld;
