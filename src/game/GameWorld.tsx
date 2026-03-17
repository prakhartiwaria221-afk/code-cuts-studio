import { useRef, useEffect, useState, useCallback } from 'react';
import { gameMap, TILE_SIZE, MAP_W, MAP_H, T, isWalkable, isInteractive, SPAWN, BUILDING_LABELS, PORTFOLIO_CONTENT } from './mapData';
import { createNPCs, updateNPC, drawNPC, isNearNPC, NPC } from './npcs';
import { playStep, playInteract, playDialogOpen, playDialogClose, playMenuSelect, startMusic, toggleMusic, initAudio } from './audioEngine';
import { getLightingState, drawLightingOverlay, LightingState } from './dayNightCycle';
import { drawEnhancedTile } from './tileRenderer';
import { spawnEnvironmentParticles, spawnFootstepDust, spawnWaterBubble, spawnInteractionSparkle, updateParticles, drawParticles } from './particles';
import { COLLECTIBLES, SECRET_ZONES, checkCollectibles, checkSecretZones, drawCollectible, getScore, getCollectedCount, Collectible, SecretZone } from './collectibles';
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
  const [score, setScore] = useState(0);
  const [collected, setCollected] = useState(0);
  const [discoveryMsg, setDiscoveryMsg] = useState('');
  const [discoveryTimer, setDiscoveryTimer] = useState(0);
  const [zonesFound, setZonesFound] = useState(0);
  const [stepCount, setStepCount] = useState(0);

  const playerRef = useRef({
    x: SPAWN.x * TILE_SIZE, y: SPAWN.y * TILE_SIZE,
    dir: 0 as Direction, frame: 0, frameTimer: 0, moving: false,
    bobTimer: 0,
  });
  const keysRef = useRef(new Set<string>());
  const cameraRef = useRef({ x: 0, y: 0 });
  const waterFrameRef = useRef(0);
  const waterTimerRef = useRef(0);
  const npcsRef = useRef<NPC[]>(createNPCs());
  const cycleStartRef = useRef(Date.now());
  const lightingRef = useRef<LightingState>(getLightingState(0));
  const globalFrameRef = useRef(0);
  const collectiblesRef = useRef<Collectible[]>(COLLECTIBLES.map(c => ({ ...c })));
  const secretZonesRef = useRef<SecretZone[]>(SECRET_ZONES.map(z => ({ ...z })));
  const screenShakeRef = useRef({ x: 0, y: 0, intensity: 0 });

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

    for (const npc of npcsRef.current) {
      if (isNearNPC(p.x, p.y, npc)) {
        playInteract();
        setNpcDialog({ title: `💬 ${npc.name}`, lines: npc.dialog });
        setGameState('dialog');
        return;
      }
    }

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

  // Discovery message timer
  useEffect(() => {
    if (discoveryTimer > 0) {
      const t = setTimeout(() => {
        setDiscoveryTimer(prev => prev - 1);
        if (discoveryTimer <= 1) setDiscoveryMsg('');
      }, 50);
      return () => clearTimeout(t);
    }
  }, [discoveryTimer]);

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

    // Diagonal normalization
    if (dx !== 0 && dy !== 0) {
      dx *= 0.707;
      dy *= 0.707;
    }

    p.moving = dx !== 0 || dy !== 0;
    if (dx !== 0 && canWalk(p.x + dx, p.y)) p.x += dx;
    if (dy !== 0 && canWalk(p.x, p.y + dy)) p.y += dy;

    if (p.moving) {
      playStep();
      p.frameTimer++;
      p.bobTimer += 0.15;
      if (p.frameTimer > 7) { p.frame = (p.frame + 1) % 4; p.frameTimer = 0; }
      spawnFootstepDust(p.x, p.y);
      setStepCount(prev => prev + 1);
    } else {
      p.frame = 0;
      p.bobTimer = 0;
    }

    // Update NPCs
    npcsRef.current.forEach(updateNPC);

    // Water animation
    waterTimerRef.current++;
    if (waterTimerRef.current > 25) {
      waterFrameRef.current = (waterFrameRef.current + 1) % 3;
      waterTimerRef.current = 0;
    }

    // Day/night cycle
    globalFrameRef.current++;
    lightingRef.current = getLightingState(Date.now() - cycleStartRef.current);

    // Screen shake decay
    const shake = screenShakeRef.current;
    if (shake.intensity > 0) {
      shake.x = (Math.random() - 0.5) * shake.intensity;
      shake.y = (Math.random() - 0.5) * shake.intensity;
      shake.intensity *= 0.9;
      if (shake.intensity < 0.1) shake.intensity = 0;
    }

    // Collectibles
    const item = checkCollectibles(p.x, p.y, collectiblesRef.current);
    if (item) {
      playInteract();
      screenShakeRef.current.intensity = 3;
      setScore(getScore(collectiblesRef.current));
      setCollected(getCollectedCount(collectiblesRef.current));
      const names = { coin: '🪙 Coin', gem: '💎 Gem', star: '⭐ Star', scroll: '📜 Scroll' };
      setDiscoveryMsg(`${names[item.type]} collected! +${item.points} pts`);
      setDiscoveryTimer(50);
    }

    // Secret zones
    const secret = checkSecretZones(p.x, p.y, secretZonesRef.current);
    if (secret) {
      screenShakeRef.current.intensity = 5;
      setZonesFound(prev => prev + 1);
      setDiscoveryMsg(secret.message);
      setDiscoveryTimer(80);
    }

    // Particles
    const cam = cameraRef.current;
    spawnEnvironmentParticles(cam.x, cam.y, window.innerWidth, window.innerHeight, lightingRef.current.timeOfDay);
    updateParticles();

    // Water bubbles for visible water tiles
    const startX = Math.floor(cam.x / TILE_SIZE);
    const startY = Math.floor(cam.y / TILE_SIZE);
    const endX = Math.min(MAP_W, startX + Math.ceil(window.innerWidth / TILE_SIZE) + 2);
    const endY = Math.min(MAP_H, startY + Math.ceil(window.innerHeight / TILE_SIZE) + 2);
    for (let y = startY; y < endY; y++) {
      for (let x = startX; x < endX; x++) {
        if (gameMap[y]?.[x] === T.WATER) spawnWaterBubble(x * TILE_SIZE, y * TILE_SIZE);
        if (isInteractive(gameMap[y]?.[x])) spawnInteractionSparkle(x * TILE_SIZE, y * TILE_SIZE);
      }
    }

    // Hint
    const cx = Math.floor((p.x + TILE_SIZE / 2) / TILE_SIZE);
    const cy = Math.floor((p.y + TILE_SIZE / 2) / TILE_SIZE);
    let foundHint = '';

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
    const shake = screenShakeRef.current;

    // Smooth camera follow
    const targetCamX = p.x + TILE_SIZE / 2 - cw / 2;
    const targetCamY = p.y + TILE_SIZE / 2 - ch / 2;
    cam.x += (targetCamX - cam.x) * 0.1;
    cam.y += (targetCamY - cam.y) * 0.1;
    cam.x = Math.max(0, Math.min(cam.x, MAP_W * TILE_SIZE - cw));
    cam.y = Math.max(0, Math.min(cam.y, MAP_H * TILE_SIZE - ch));

    // Apply screen shake
    const offsetX = cam.x + shake.x;
    const offsetY = cam.y + shake.y;

    ctx.clearRect(0, 0, cw, ch);

    const startX = Math.floor(offsetX / TILE_SIZE);
    const startY = Math.floor(offsetY / TILE_SIZE);
    const endX = Math.min(MAP_W, startX + Math.ceil(cw / TILE_SIZE) + 2);
    const endY = Math.min(MAP_H, startY + Math.ceil(ch / TILE_SIZE) + 2);

    const gf = globalFrameRef.current;

    // Draw tiles with enhanced renderer
    for (let y = startY; y < endY; y++) {
      for (let x = startX; x < endX; x++) {
        const tile = gameMap[y]?.[x];
        if (tile === undefined) continue;
        drawEnhancedTile(ctx, tile, x * TILE_SIZE - offsetX, y * TILE_SIZE - offsetY, x, y, waterFrameRef.current, gf);
      }
    }

    // Draw collectibles
    for (const c of collectiblesRef.current) {
      drawCollectible(ctx, c, offsetX, offsetY, gf);
    }

    // Building labels with shadow
    ctx.font = '10px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    BUILDING_LABELS.forEach(label => {
      const lx = label.x * TILE_SIZE - offsetX;
      const ly = label.y * TILE_SIZE - offsetY;
      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillText(label.text, lx + 1, ly + 1);
      // Text
      ctx.fillStyle = '#fff';
      ctx.shadowColor = '#000';
      ctx.shadowBlur = 6;
      ctx.fillText(label.text, lx, ly);
      ctx.shadowBlur = 0;
    });

    // Draw NPCs
    npcsRef.current.forEach(npc => drawNPC(ctx, npc, offsetX, offsetY));

    // Particles behind player
    drawParticles(ctx, offsetX, offsetY);

    // Draw player with bob
    const bobY = p.moving ? Math.sin(p.bobTimer) * 1.5 : 0;
    drawPlayer(ctx, p.x - offsetX, p.y - offsetY + bobY, p.dir, p.frame);

    // Player name tag with glow
    ctx.font = '8px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.shadowColor = '#000';
    ctx.shadowBlur = 4;
    ctx.fillText('Prakhar', p.x - offsetX + TILE_SIZE / 2, p.y - offsetY - 8 + bobY);
    ctx.shadowBlur = 0;

    // Lighting overlay
    const lighting = lightingRef.current;
    const lampPositions: { sx: number; sy: number }[] = [];
    for (let y = startY; y < endY; y++) {
      for (let x = startX; x < endX; x++) {
        if (gameMap[y]?.[x] === T.LAMP) {
          lampPositions.push({ sx: x * TILE_SIZE - offsetX + TILE_SIZE / 2, sy: y * TILE_SIZE - offsetY + TILE_SIZE / 2 });
        }
      }
    }
    drawLightingOverlay(ctx, cw, ch, lighting, lampPositions);

    // === HUD ===
    drawHUD(ctx, cw, ch, lighting);
  };

  const drawHUD = (ctx: CanvasRenderingContext2D, cw: number, ch: number, lighting: LightingState) => {
    const gf = globalFrameRef.current;

    // Top-left: Game title with styled frame
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    roundRect(ctx, 8, 8, 200, 44, 4);
    ctx.fill();
    ctx.strokeStyle = '#4a8c3f';
    ctx.lineWidth = 2;
    roundRect(ctx, 8, 8, 200, 44, 4);
    ctx.stroke();
    // Green bar accent
    ctx.fillStyle = '#4a8c3f';
    ctx.fillRect(12, 12, 3, 36);

    ctx.font = '9px "Press Start 2P", monospace';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#4a8c3f';
    ctx.fillText("Prakhar's World", 22, 28);
    ctx.font = '6px "Press Start 2P", monospace';
    ctx.fillStyle = '#888';
    ctx.fillText('Portfolio Adventure', 22, 42);

    // Top-right: Score panel
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    roundRect(ctx, cw - 216, 8, 208, 68, 4);
    ctx.fill();
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 1;
    roundRect(ctx, cw - 216, 8, 208, 68, 4);
    ctx.stroke();

    // Score
    ctx.font = '7px "Press Start 2P", monospace';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffd700';
    ctx.fillText(`SCORE: ${score}`, cw - 204, 26);

    // Items collected bar
    ctx.fillStyle = '#888';
    ctx.fillText(`ITEMS: ${collected}/${COLLECTIBLES.length}`, cw - 204, 40);
    // Progress bar
    const barW = 140;
    const progress = collected / COLLECTIBLES.length;
    ctx.fillStyle = '#333';
    ctx.fillRect(cw - 204, 46, barW, 6);
    ctx.fillStyle = '#4a8c3f';
    ctx.fillRect(cw - 204, 46, barW * progress, 6);
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(cw - 204, 46, barW, 6);

    // Secrets found
    ctx.fillStyle = '#9b59b6';
    ctx.fillText(`SECRETS: ${zonesFound}/${SECRET_ZONES.length}`, cw - 204, 66);

    // Time of day (bottom-left)
    const timeIcons: Record<string, string> = { dawn: '🌅', day: '☀️', dusk: '🌇', night: '🌙' };
    ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
    roundRect(ctx, 8, ch - 38, 120, 30, 4);
    ctx.fill();
    ctx.strokeStyle = '#5aafc8';
    ctx.lineWidth = 1;
    roundRect(ctx, 8, ch - 38, 120, 30, 4);
    ctx.stroke();
    ctx.font = '8px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#5aafc8';
    ctx.fillText(`${timeIcons[lighting.timeOfDay]} ${lighting.timeOfDay.toUpperCase()}`, 68, ch - 18);

    // Steps counter (bottom-left, above time)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    roundRect(ctx, 8, ch - 62, 100, 20, 3);
    ctx.fill();
    ctx.font = '6px "Press Start 2P", monospace';
    ctx.fillStyle = '#aaa';
    ctx.textAlign = 'left';
    ctx.fillText(`👣 ${Math.floor(stepCount / 20)} steps`, 16, ch - 48);
  };

  const drawPlayer = (ctx: CanvasRenderingContext2D, x: number, y: number, dir: Direction, frame: number) => {
    const s = 2;

    // Enhanced shadow
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath();
    ctx.ellipse(x + 16, y + 30, 10, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Skin
    ctx.fillStyle = '#f0c8a0';
    if (dir === 0) {
      ctx.fillRect(x + 5*s, y + 1*s, 6*s, 6*s);
      // Hair
      ctx.fillStyle = '#3d2b1f';
      ctx.fillRect(x + 5*s, y, 6*s, 2*s);
      ctx.fillRect(x + 4*s, y + 1*s, 1*s, 3*s);
      ctx.fillRect(x + 11*s, y + 1*s, 1*s, 3*s);
      // Eyes with blink
      const blink = globalFrameRef.current % 180 < 5;
      ctx.fillStyle = blink ? '#f0c8a0' : '#222';
      ctx.fillRect(x + 6*s, y + 4*s, 2*s, blink ? 0.5*s : 1*s);
      ctx.fillRect(x + 9*s, y + 4*s, 2*s, blink ? 0.5*s : 1*s);
      // Eye highlights
      if (!blink) {
        ctx.fillStyle = '#fff';
        ctx.fillRect(x + 6*s, y + 4*s, 1*s, 0.5*s);
        ctx.fillRect(x + 9*s, y + 4*s, 1*s, 0.5*s);
      }
      // Mouth
      ctx.fillStyle = '#c0968a';
      ctx.fillRect(x + 7*s, y + 6*s, 2*s, 0.5*s);
    } else if (dir === 1) {
      ctx.fillRect(x + 5*s, y + 1*s, 6*s, 6*s);
      ctx.fillStyle = '#3d2b1f';
      ctx.fillRect(x + 4*s, y, 8*s, 4*s);
    } else if (dir === 2) {
      ctx.fillRect(x + 5*s, y + 1*s, 6*s, 6*s);
      ctx.fillStyle = '#3d2b1f';
      ctx.fillRect(x + 5*s, y, 7*s, 2*s);
      ctx.fillRect(x + 11*s, y + 1*s, 1*s, 3*s);
      ctx.fillStyle = '#222';
      ctx.fillRect(x + 6*s, y + 4*s, 2*s, 1*s);
      ctx.fillStyle = '#fff';
      ctx.fillRect(x + 6*s, y + 4*s, 0.5*s, 0.5*s);
    } else {
      ctx.fillRect(x + 5*s, y + 1*s, 6*s, 6*s);
      ctx.fillStyle = '#3d2b1f';
      ctx.fillRect(x + 4*s, y, 7*s, 2*s);
      ctx.fillRect(x + 4*s, y + 1*s, 1*s, 3*s);
      ctx.fillStyle = '#222';
      ctx.fillRect(x + 9*s, y + 4*s, 2*s, 1*s);
      ctx.fillStyle = '#fff';
      ctx.fillRect(x + 10.5*s, y + 4*s, 0.5*s, 0.5*s);
    }

    // Body with detail
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(x + 4*s, y + 7*s, 8*s, 5*s);
    // Shirt collar
    ctx.fillStyle = '#c0392b';
    ctx.fillRect(x + 6*s, y + 7*s, 4*s, 1*s);

    // Arms with swing
    ctx.fillStyle = '#c0392b';
    const armSwing = playerRef.current.moving ? Math.sin(playerRef.current.bobTimer * 2) * 2 : 0;
    ctx.fillRect(x + 3*s, y + 7*s + armSwing, 1*s, 4*s);
    ctx.fillRect(x + 12*s, y + 7*s - armSwing, 1*s, 4*s);

    // Legs with smoother walk
    ctx.fillStyle = '#2c3e50';
    if (playerRef.current.moving) {
      const legPhase = Math.sin(playerRef.current.bobTimer * 2);
      ctx.fillRect(x + 5*s, y + 12*s + legPhase, 3*s, 3*s - Math.abs(legPhase) * 0.5);
      ctx.fillRect(x + 9*s, y + 12*s - legPhase, 3*s, 3*s - Math.abs(legPhase) * 0.5);
    } else {
      ctx.fillRect(x + 5*s, y + 12*s, 3*s, 3*s);
      ctx.fillRect(x + 9*s, y + 12*s, 3*s, 3*s);
    }

    // Shoes
    ctx.fillStyle = '#6b3a1a';
    ctx.fillRect(x + 4*s, y + 14.5*s, 4*s, 1.5*s);
    ctx.fillRect(x + 9*s, y + 14.5*s, 4*s, 1.5*s);
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
      <div className="fixed inset-0 bg-[#0d0d1a] flex flex-col items-center justify-center z-50" style={{ fontFamily: '"Press Start 2P", monospace' }}>
        {/* Animated border */}
        <div className="absolute inset-4 border-4 border-[#4a8c3f]/80 pointer-events-none animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute inset-6 border-2 border-[#4a8c3f]/30 pointer-events-none" />
        <div className="absolute inset-8 border border-[#5aafc8]/20 pointer-events-none" />

        {/* Stars background */}
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="absolute animate-pulse"
            style={{
              left: `${5 + (i * 47) % 90}%`,
              top: `${3 + (i * 31) % 85}%`,
              width: i % 3 === 0 ? '2px' : '1.5px',
              height: i % 3 === 0 ? '2px' : '1.5px',
              backgroundColor: i % 5 === 0 ? '#ffd700' : '#fff',
              animationDelay: `${(i * 0.3) % 2}s`,
              animationDuration: `${1.5 + (i % 3)}s`,
            }} />
        ))}

        {/* Pixel art character preview */}
        <div className="relative mb-8">
          <div className="w-16 h-16 relative" style={{ imageRendering: 'pixelated' }}>
            <svg viewBox="0 0 32 32" width="64" height="64">
              {/* Hair */}
              <rect x="10" y="1" width="12" height="4" fill="#3d2b1f"/>
              <rect x="8" y="3" width="2" height="6" fill="#3d2b1f"/>
              <rect x="22" y="3" width="2" height="6" fill="#3d2b1f"/>
              {/* Face */}
              <rect x="10" y="3" width="12" height="10" fill="#f0c8a0"/>
              {/* Eyes */}
              <rect x="12" y="7" width="2" height="2" fill="#222"/>
              <rect x="18" y="7" width="2" height="2" fill="#222"/>
              <rect x="12" y="7" width="1" height="1" fill="#fff"/>
              <rect x="18" y="7" width="1" height="1" fill="#fff"/>
              {/* Mouth */}
              <rect x="14" y="11" width="4" height="1" fill="#c0968a"/>
              {/* Shirt */}
              <rect x="8" y="13" width="16" height="8" fill="#e74c3c"/>
              <rect x="12" y="13" width="8" height="2" fill="#c0392b"/>
              {/* Arms */}
              <rect x="6" y="14" width="2" height="6" fill="#c0392b"/>
              <rect x="24" y="14" width="2" height="6" fill="#c0392b"/>
              {/* Pants */}
              <rect x="10" y="21" width="5" height="6" fill="#2c3e50"/>
              <rect x="17" y="21" width="5" height="6" fill="#2c3e50"/>
              {/* Shoes */}
              <rect x="9" y="27" width="6" height="3" fill="#6b3a1a"/>
              <rect x="17" y="27" width="6" height="3" fill="#6b3a1a"/>
            </svg>
          </div>
        </div>

        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-[#4a8c3f] text-3xl sm:text-5xl mb-3 leading-relaxed tracking-wider" style={{ textShadow: '0 0 20px rgba(74,140,63,0.3)' }}>PRAKHAR</h1>
          <h1 className="text-[#5aafc8] text-3xl sm:text-5xl mb-5 leading-relaxed tracking-wider" style={{ textShadow: '0 0 20px rgba(90,175,200,0.3)' }}>TIWARI</h1>
          <div className="flex items-center gap-3 justify-center mb-3">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#c4a87a]" />
            <p className="text-[#c4a87a] text-xs tracking-[0.3em]">PORTFOLIO RPG</p>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#c4a87a]" />
          </div>
          <p className="text-[#888] text-[8px] sm:text-[10px] leading-relaxed max-w-md mx-auto px-4">
            Explore • Discover • Collect
          </p>
        </div>

        <button onClick={handleStart}
          className="group relative bg-[#e74c3c] hover:bg-[#c0392b] text-white px-12 py-4 text-sm tracking-widest transition-all duration-200 hover:scale-105 border-b-4 border-[#962d22] active:border-b-0 active:mt-1 mb-6"
          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
          <span className="relative z-10">▶ PLAY</span>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10" />
        </button>

        <div className="text-[#666] text-[7px] text-center space-y-1.5 mb-4">
          <p className="text-[#888]">━━ CONTROLS ━━</p>
          <p>WASD / Arrows — Move</p>
          <p>SPACE / E — Interact</p>
          <p>M — Toggle Music</p>
        </div>

        <div className="flex gap-6 text-[7px] text-[#555]">
          <span>🪙 {COLLECTIBLES.length} Items</span>
          <span>🏠 4 Buildings</span>
          <span>🗝️ {SECRET_ZONES.length} Secrets</span>
          <span>👥 4 NPCs</span>
        </div>

        <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-4">
          <p className="text-[#555] text-[7px]">Skip the adventure?</p>
          <a href="https://linkedin.com/in/prakhar-tiwari-8b04a7296" target="_blank" rel="noopener noreferrer"
            className="bg-[#0077b5] text-white px-4 py-1.5 text-[8px] hover:bg-[#005f8d] transition-colors border-b-2 border-[#005a8a] active:border-b-0">LinkedIn</a>
          <a href="https://github.com/prakhartiwaria221-afk" target="_blank" rel="noopener noreferrer"
            className="bg-[#333] text-white px-4 py-1.5 text-[8px] hover:bg-[#444] transition-colors border-b-2 border-[#222] active:border-b-0">GitHub</a>
        </div>
      </div>
    );
  }

  const dialogContent = npcDialog || (dialogKey ? PORTFOLIO_CONTENT[dialogKey as keyof typeof PORTFOLIO_CONTENT] : null);

  return (
    <div className="fixed inset-0 bg-[#0d0d1a]" style={{ fontFamily: '"Press Start 2P", monospace' }}>
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Music toggle (floating) */}
      <button onClick={handleToggleMusic}
        className="absolute top-16 left-3 bg-black/60 px-2 py-1.5 border border-[#5aafc8]/40 text-[#5aafc8] text-[7px] hover:bg-black/80 transition-colors rounded-sm">
        {musicOn ? '🔊' : '🔇'} [M]
      </button>

      {/* Discovery notification */}
      {discoveryMsg && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-black/85 px-6 py-3 border-2 border-[#ffd700] animate-scale-in"
          style={{ opacity: discoveryTimer > 10 ? 1 : discoveryTimer / 10 }}>
          <p className="text-[#ffd700] text-[10px] whitespace-nowrap">{discoveryMsg}</p>
        </div>
      )}

      {/* Interaction hint */}
      {hint && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-black/80 px-6 py-3 border-2 border-[#ffd700]/80 rounded-sm">
          <p className="text-[#ffd700] text-[10px] whitespace-nowrap animate-pulse">{hint}</p>
        </div>
      )}

      {/* Mobile controls */}
      {isMobile && (
        <>
          <div className="absolute bottom-8 left-8 grid grid-cols-3 grid-rows-3 gap-1" style={{ width: '130px', height: '130px' }}>
            <div />
            <button onTouchStart={() => mobilePress('arrowup')} onTouchEnd={() => mobileRelease('arrowup')}
              className="bg-black/70 border-2 border-white/30 text-white text-lg flex items-center justify-center active:bg-white/20 active:scale-95 select-none rounded-sm transition-transform">▲</button>
            <div />
            <button onTouchStart={() => mobilePress('arrowleft')} onTouchEnd={() => mobileRelease('arrowleft')}
              className="bg-black/70 border-2 border-white/30 text-white text-lg flex items-center justify-center active:bg-white/20 active:scale-95 select-none rounded-sm transition-transform">◄</button>
            <div className="bg-black/30 border border-white/10 rounded-sm" />
            <button onTouchStart={() => mobilePress('arrowright')} onTouchEnd={() => mobileRelease('arrowright')}
              className="bg-black/70 border-2 border-white/30 text-white text-lg flex items-center justify-center active:bg-white/20 active:scale-95 select-none rounded-sm transition-transform">►</button>
            <div />
            <button onTouchStart={() => mobilePress('arrowdown')} onTouchEnd={() => mobileRelease('arrowdown')}
              className="bg-black/70 border-2 border-white/30 text-white text-lg flex items-center justify-center active:bg-white/20 active:scale-95 select-none rounded-sm transition-transform">▼</button>
            <div />
          </div>
          <button onTouchStart={() => { keysRef.current.add(' '); tryInteract(); }} onTouchEnd={() => keysRef.current.delete(' ')}
            className="absolute bottom-12 right-12 w-18 h-18 rounded-full bg-[#e74c3c]/90 border-3 border-[#ffd700] text-white text-sm flex items-center justify-center active:scale-90 select-none shadow-lg shadow-[#e74c3c]/30 transition-transform"
            style={{ width: '72px', height: '72px' }}>A</button>
        </>
      )}

      {/* Dialog */}
      {gameState === 'dialog' && dialogContent && (
        <GameDialog content={dialogContent} onClose={closeDialog} />
      )}
    </div>
  );
};

// Helper: draw rounded rectangle
const roundRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
};

export default GameWorld;
