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
  const [house, setHouse] = useState<string>('Gryffindor');

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
        setNpcDialog({ title: `⚡ ${npc.name}`, lines: npc.dialog });
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

  useEffect(() => {
    if (discoveryTimer > 0) {
      const t = setTimeout(() => {
        setDiscoveryTimer(prev => prev - 1);
        if (discoveryTimer <= 1) setDiscoveryMsg('');
      }, 50);
      return () => clearTimeout(t);
    }
  }, [discoveryTimer]);

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

    if (dx !== 0 && dy !== 0) { dx *= 0.707; dy *= 0.707; }

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

    npcsRef.current.forEach(updateNPC);

    waterTimerRef.current++;
    if (waterTimerRef.current > 25) {
      waterFrameRef.current = (waterFrameRef.current + 1) % 3;
      waterTimerRef.current = 0;
    }

    globalFrameRef.current++;
    lightingRef.current = getLightingState(Date.now() - cycleStartRef.current);

    const shake = screenShakeRef.current;
    if (shake.intensity > 0) {
      shake.x = (Math.random() - 0.5) * shake.intensity;
      shake.y = (Math.random() - 0.5) * shake.intensity;
      shake.intensity *= 0.9;
      if (shake.intensity < 0.1) shake.intensity = 0;
    }

    const item = checkCollectibles(p.x, p.y, collectiblesRef.current);
    if (item) {
      playInteract();
      screenShakeRef.current.intensity = 3;
      setScore(getScore(collectiblesRef.current));
      setCollected(getCollectedCount(collectiblesRef.current));
      const names: Record<string, string> = { snitch: '⚡ Golden Snitch', chocolate_frog: '🐸 Chocolate Frog', spell_book: '📖 Spell Book', deathly_hallow: '△ Deathly Hallow' };
      setDiscoveryMsg(`${names[item.type]} collected! +${item.points} pts`);
      setDiscoveryTimer(50);
    }

    const secret = checkSecretZones(p.x, p.y, secretZonesRef.current);
    if (secret) {
      screenShakeRef.current.intensity = 5;
      setZonesFound(prev => prev + 1);
      setDiscoveryMsg(secret.message);
      setDiscoveryTimer(80);
    }

    const cam = cameraRef.current;
    spawnEnvironmentParticles(cam.x, cam.y, window.innerWidth, window.innerHeight, lightingRef.current.timeOfDay);
    updateParticles();

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

    const cx = Math.floor((p.x + TILE_SIZE / 2) / TILE_SIZE);
    const cy = Math.floor((p.y + TILE_SIZE / 2) / TILE_SIZE);
    let foundHint = '';
    for (const npc of npcsRef.current) {
      if (isNearNPC(p.x, p.y, npc)) {
        foundHint = isMobile ? `Tap [A] to speak with ${npc.name}` : `Press SPACE to speak with ${npc.name}`;
        break;
      }
    }
    if (!foundHint) {
      const dirs = [[0, -1], [0, 1], [-1, 0], [1, 0]];
      for (const [ddx, ddy] of dirs) {
        const tile = gameMap[cy + ddy]?.[cx + ddx];
        if (tile !== undefined && isInteractive(tile)) {
          foundHint = isMobile ? 'Tap [A] to cast Alohomora' : 'Press SPACE to cast Alohomora';
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

    const targetCamX = p.x + TILE_SIZE / 2 - cw / 2;
    const targetCamY = p.y + TILE_SIZE / 2 - ch / 2;
    cam.x += (targetCamX - cam.x) * 0.1;
    cam.y += (targetCamY - cam.y) * 0.1;
    cam.x = Math.max(0, Math.min(cam.x, MAP_W * TILE_SIZE - cw));
    cam.y = Math.max(0, Math.min(cam.y, MAP_H * TILE_SIZE - ch));

    const offsetX = cam.x + shake.x;
    const offsetY = cam.y + shake.y;

    ctx.clearRect(0, 0, cw, ch);

    const startX = Math.floor(offsetX / TILE_SIZE);
    const startY = Math.floor(offsetY / TILE_SIZE);
    const endX = Math.min(MAP_W, startX + Math.ceil(cw / TILE_SIZE) + 2);
    const endY = Math.min(MAP_H, startY + Math.ceil(ch / TILE_SIZE) + 2);

    const gf = globalFrameRef.current;

    for (let y = startY; y < endY; y++) {
      for (let x = startX; x < endX; x++) {
        const tile = gameMap[y]?.[x];
        if (tile === undefined) continue;
        drawEnhancedTile(ctx, tile, x * TILE_SIZE - offsetX, y * TILE_SIZE - offsetY, x, y, waterFrameRef.current, gf);
      }
    }

    for (const c of collectiblesRef.current) {
      drawCollectible(ctx, c, offsetX, offsetY, gf);
    }

    // Building labels with magical glow
    ctx.font = '9px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    BUILDING_LABELS.forEach(label => {
      const lx = label.x * TILE_SIZE - offsetX;
      const ly = label.y * TILE_SIZE - offsetY;
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillText(label.text, lx + 1, ly + 1);
      ctx.fillStyle = '#ffd700';
      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur = 6;
      ctx.fillText(label.text, lx, ly);
      ctx.shadowBlur = 0;
    });

    npcsRef.current.forEach(npc => drawNPC(ctx, npc, offsetX, offsetY));
    drawParticles(ctx, offsetX, offsetY);

    const bobY = p.moving ? Math.sin(p.bobTimer) * 1.5 : 0;
    drawPlayer(ctx, p.x - offsetX, p.y - offsetY + bobY, p.dir, p.frame);

    // Player name tag
    ctx.font = '8px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffd700';
    ctx.shadowColor = '#ffd700';
    ctx.shadowBlur = 3;
    ctx.fillText('Prakhar', p.x - offsetX + TILE_SIZE / 2, p.y - offsetY - 12 + bobY);
    ctx.shadowBlur = 0;

    // Lighting
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

    drawHUD(ctx, cw, ch, lighting);
  };

  const drawHUD = (ctx: CanvasRenderingContext2D, cw: number, ch: number, lighting: LightingState) => {
    // Top-left: Hogwarts crest area
    ctx.fillStyle = 'rgba(10, 5, 20, 0.8)';
    roundRect(ctx, 8, 8, 210, 48, 4);
    ctx.fill();
    ctx.strokeStyle = '#8b6914';
    ctx.lineWidth = 2;
    roundRect(ctx, 8, 8, 210, 48, 4);
    ctx.stroke();
    // Gold accent bar
    ctx.fillStyle = '#8b6914';
    ctx.fillRect(12, 12, 3, 40);

    ctx.font = '9px "Press Start 2P", monospace';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffd700';
    ctx.fillText("⚡ Hogwarts", 22, 28);
    ctx.font = '6px "Press Start 2P", monospace';
    ctx.fillStyle = '#8b6914';
    ctx.fillText(`${house} · Portfolio`, 22, 44);

    // Top-right: Score (House Points)
    ctx.fillStyle = 'rgba(10, 5, 20, 0.8)';
    roundRect(ctx, cw - 220, 8, 212, 72, 4);
    ctx.fill();
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 1;
    roundRect(ctx, cw - 220, 8, 212, 72, 4);
    ctx.stroke();

    ctx.font = '7px "Press Start 2P", monospace';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffd700';
    ctx.fillText(`HOUSE PTS: ${score}`, cw - 208, 26);

    ctx.fillStyle = '#c4a87a';
    ctx.fillText(`ITEMS: ${collected}/${COLLECTIBLES.length}`, cw - 208, 40);
    const barW = 140;
    const progress = collected / COLLECTIBLES.length;
    ctx.fillStyle = '#1a1020';
    ctx.fillRect(cw - 208, 46, barW, 6);
    ctx.fillStyle = '#8b6914';
    ctx.fillRect(cw - 208, 46, barW * progress, 6);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(cw - 208, 46, barW, 6);

    ctx.fillStyle = '#9b59b6';
    ctx.fillText(`SECRETS: ${zonesFound}/${SECRET_ZONES.length}`, cw - 208, 68);

    // Time of day (bottom-left)
    const timeIcons: Record<string, string> = { dawn: '🌅', day: '☀️', dusk: '🌇', night: '🌙' };
    ctx.fillStyle = 'rgba(10, 5, 20, 0.7)';
    roundRect(ctx, 8, ch - 38, 130, 30, 4);
    ctx.fill();
    ctx.strokeStyle = '#4a3080';
    ctx.lineWidth = 1;
    roundRect(ctx, 8, ch - 38, 130, 30, 4);
    ctx.stroke();
    ctx.font = '8px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#aaddff';
    ctx.fillText(`${timeIcons[lighting.timeOfDay]} ${lighting.timeOfDay.toUpperCase()}`, 73, ch - 18);

    // Steps
    ctx.fillStyle = 'rgba(10, 5, 20, 0.5)';
    roundRect(ctx, 8, ch - 62, 110, 20, 3);
    ctx.fill();
    ctx.font = '6px "Press Start 2P", monospace';
    ctx.fillStyle = '#8b6914';
    ctx.textAlign = 'left';
    ctx.fillText(`🧹 ${Math.floor(stepCount / 20)} steps`, 16, ch - 48);
  };

  const drawPlayer = (ctx: CanvasRenderingContext2D, x: number, y: number, dir: Direction, frame: number) => {
    const s = 2;

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.beginPath();
    ctx.ellipse(x + 16, y + 30, 10, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Wizard hat
    const houseColor = '#7a1020';
    ctx.fillStyle = '#1a1020';
    ctx.fillRect(x + 4*s, y - 2*s, 8*s, 2*s);
    ctx.fillRect(x + 6*s, y - 5*s, 4*s, 3*s);
    ctx.fillRect(x + 7*s, y - 7*s, 2*s, 2*s);
    // Hat band
    ctx.fillStyle = houseColor;
    ctx.fillRect(x + 4*s, y - 1*s, 8*s, 1*s);

    // Skin
    ctx.fillStyle = '#f0c8a0';
    if (dir === 0) {
      ctx.fillRect(x + 5*s, y + 1*s, 6*s, 6*s);
      ctx.fillStyle = '#3d2b1f';
      ctx.fillRect(x + 5*s, y, 6*s, 2*s);
      ctx.fillRect(x + 4*s, y + 1*s, 1*s, 3*s);
      ctx.fillRect(x + 11*s, y + 1*s, 1*s, 3*s);
      const blink = globalFrameRef.current % 180 < 5;
      ctx.fillStyle = blink ? '#f0c8a0' : '#222';
      ctx.fillRect(x + 6*s, y + 4*s, 2*s, blink ? 0.5*s : 1*s);
      ctx.fillRect(x + 9*s, y + 4*s, 2*s, blink ? 0.5*s : 1*s);
      if (!blink) {
        ctx.fillStyle = '#fff';
        ctx.fillRect(x + 6*s, y + 4*s, 1*s, 0.5*s);
        ctx.fillRect(x + 9*s, y + 4*s, 1*s, 0.5*s);
      }
      // Lightning scar
      ctx.fillStyle = '#ffd700';
      ctx.fillRect(x + 7.5*s, y + 2*s, 0.5*s, 0.5*s);
      ctx.fillRect(x + 7*s, y + 2.5*s, 0.5*s, 0.5*s);
      ctx.fillRect(x + 7.5*s, y + 3*s, 0.5*s, 0.5*s);
      // Glasses
      ctx.strokeStyle = '#444';
      ctx.lineWidth = 0.8;
      ctx.strokeRect(x + 5.5*s, y + 3.5*s, 3*s, 2*s);
      ctx.strokeRect(x + 8.5*s, y + 3.5*s, 3*s, 2*s);
      ctx.beginPath();
      ctx.moveTo(x + 8.5*s, y + 4.5*s);
      ctx.lineTo(x + 8.5*s, y + 4.5*s);
      ctx.stroke();
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

    // Wizard robe (Gryffindor-colored)
    ctx.fillStyle = '#1a1020';
    ctx.fillRect(x + 4*s, y + 7*s, 8*s, 5*s);
    // House stripe
    ctx.fillStyle = houseColor;
    ctx.fillRect(x + 6*s, y + 7*s, 4*s, 1*s);
    // Gold trim
    ctx.fillStyle = '#8b6914';
    ctx.fillRect(x + 4*s, y + 7*s, 8*s, 0.5*s);

    // Arms (robe sleeves)
    ctx.fillStyle = '#0e0818';
    const armSwing = playerRef.current.moving ? Math.sin(playerRef.current.bobTimer * 2) * 2 : 0;
    ctx.fillRect(x + 3*s, y + 7*s + armSwing, 1*s, 4*s);
    ctx.fillRect(x + 12*s, y + 7*s - armSwing, 1*s, 4*s);

    // Wand in right hand
    ctx.fillStyle = '#6b4423';
    if (dir === 3) {
      ctx.fillRect(x + 13*s, y + 9*s - armSwing, 1*s, 3*s);
      // Wand tip sparkle
      if (globalFrameRef.current % 30 < 10) {
        ctx.fillStyle = '#ffd700';
        ctx.fillRect(x + 13*s, y + 8*s - armSwing, 1*s, 1*s);
      }
    }

    // Legs (dark robes)
    ctx.fillStyle = '#0a0510';
    if (playerRef.current.moving) {
      const legPhase = Math.sin(playerRef.current.bobTimer * 2);
      ctx.fillRect(x + 5*s, y + 12*s + legPhase, 3*s, 3*s);
      ctx.fillRect(x + 9*s, y + 12*s - legPhase, 3*s, 3*s);
    } else {
      ctx.fillRect(x + 5*s, y + 12*s, 3*s, 3*s);
      ctx.fillRect(x + 9*s, y + 12*s, 3*s, 3*s);
    }

    // Shoes
    ctx.fillStyle = '#222';
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
      <div className="fixed inset-0 flex flex-col items-center justify-center z-50" style={{
        fontFamily: '"Press Start 2P", monospace',
        background: 'linear-gradient(180deg, #0a0510, #1a1030, #0d0818)',
      }}>
        {/* Magical border */}
        <div className="absolute inset-4 border-2 border-[#8b6914]/50 pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute inset-6 border border-[#ffd700]/20 pointer-events-none" />

        {/* Floating magical particles */}
        {Array.from({ length: 25 }, (_, i) => (
          <div key={i} className="absolute animate-pulse"
            style={{
              left: `${5 + (i * 47) % 90}%`,
              top: `${3 + (i * 31) % 85}%`,
              width: i % 4 === 0 ? '3px' : '2px',
              height: i % 4 === 0 ? '3px' : '2px',
              backgroundColor: i % 3 === 0 ? '#ffd700' : i % 5 === 0 ? '#aaddff' : '#8b6914',
              animationDelay: `${(i * 0.3) % 2}s`,
              animationDuration: `${2 + (i % 3)}s`,
              borderRadius: '50%',
              boxShadow: i % 3 === 0 ? '0 0 6px #ffd700' : 'none',
            }} />
        ))}

        {/* Sorting Hat icon */}
        <div className="relative mb-6">
          <svg viewBox="0 0 48 48" width="80" height="80" style={{ imageRendering: 'pixelated' }}>
            {/* Hat brim */}
            <rect x="6" y="30" width="36" height="6" fill="#3a2010"/>
            {/* Hat body */}
            <rect x="12" y="12" width="24" height="20" fill="#2a1508"/>
            {/* Hat tip */}
            <rect x="16" y="4" width="16" height="10" fill="#3a2010"/>
            <rect x="24" y="0" width="8" height="6" fill="#2a1508"/>
            <rect x="30" y="-2" width="4" height="4" fill="#3a2010"/>
            {/* Face crease */}
            <rect x="16" y="26" width="16" height="2" fill="#1a0a00"/>
            {/* Eyes */}
            <rect x="18" y="22" width="3" height="3" fill="#ffd700"/>
            <rect x="27" y="22" width="3" height="3" fill="#ffd700"/>
            {/* Patch */}
            <rect x="22" y="14" width="4" height="4" fill="#4a2a10"/>
          </svg>
        </div>

        <div className="text-center mb-6 animate-fade-in">
          <h1 className="text-[#ffd700] text-2xl sm:text-4xl mb-2 tracking-widest" style={{ textShadow: '0 0 20px rgba(255,215,0,0.3)' }}>
            ⚡ HOGWARTS ⚡
          </h1>
          <h2 className="text-[#c4a87a] text-xl sm:text-3xl mb-4 tracking-wider" style={{ textShadow: '0 0 15px rgba(196,168,122,0.2)' }}>
            PORTFOLIO
          </h2>
          <div className="flex items-center gap-3 justify-center mb-2">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#8b6914]" />
            <p className="text-[#8b6914] text-[9px] tracking-[0.3em]">PRAKHAR TIWARI</p>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#8b6914]" />
          </div>
          <p className="text-[#666] text-[8px] sm:text-[9px] leading-relaxed max-w-sm mx-auto px-4 mt-2">
            "It is our choices that show what we truly are,<br/>far more than our abilities."
          </p>
          <p className="text-[#555] text-[7px] mt-1">— Albus Dumbledore</p>
        </div>

        {/* House selection */}
        <div className="flex gap-2 mb-5">
          {[
            { name: 'Gryffindor', color: '#7a1020', emoji: '🦁' },
            { name: 'Slytherin', color: '#1a5030', emoji: '🐍' },
            { name: 'Ravenclaw', color: '#1a2060', emoji: '🦅' },
            { name: 'Hufflepuff', color: '#6a5a10', emoji: '🦡' },
          ].map(h => (
            <button key={h.name} onClick={() => setHouse(h.name)}
              className={`px-3 py-2 text-[7px] border transition-all duration-300 ${
                house === h.name
                  ? 'border-[#ffd700] text-[#ffd700] scale-110'
                  : 'border-[#333] text-[#666] hover:border-[#8b6914] hover:text-[#8b6914]'
              }`}
              style={{ backgroundColor: house === h.name ? h.color : 'rgba(10,5,20,0.8)' }}>
              {h.emoji} {h.name}
            </button>
          ))}
        </div>

        <button onClick={handleStart}
          className="group relative px-14 py-4 text-sm tracking-widest transition-all duration-300 hover:scale-105 mb-5"
          style={{
            background: 'linear-gradient(180deg, #8b6914, #5a4010)',
            border: '2px solid #ffd700',
            color: '#fff',
            boxShadow: '0 0 20px rgba(139,105,20,0.3)',
            textShadow: '0 1px 2px rgba(0,0,0,0.5)',
          }}>
          <span className="relative z-10">⚡ ENTER ⚡</span>
        </button>

        <div className="text-[#555] text-[7px] text-center space-y-1.5 mb-4">
          <p className="text-[#8b6914]">━━ SPELL CONTROLS ━━</p>
          <p>WASD / Arrows — Move</p>
          <p>SPACE / E — Cast Alohomora</p>
          <p>M — Toggle Music</p>
        </div>

        <div className="flex gap-6 text-[7px] text-[#555]">
          <span>⚡ {COLLECTIBLES.length} Items</span>
          <span>🏰 4 Locations</span>
          <span>🗝️ {SECRET_ZONES.length} Secrets</span>
          <span>🧙 4 Characters</span>
        </div>

        <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-4">
          <p className="text-[#444] text-[7px]">Skip the magic?</p>
          <a href="https://linkedin.com/in/prakhar-tiwari-8b04a7296" target="_blank" rel="noopener noreferrer"
            className="text-white px-4 py-1.5 text-[8px] transition-colors border border-[#0077b5] hover:bg-[#0077b5]/20"
            style={{ background: 'rgba(0,119,181,0.15)' }}>LinkedIn</a>
          <a href="https://github.com/prakhartiwaria221-afk" target="_blank" rel="noopener noreferrer"
            className="text-white px-4 py-1.5 text-[8px] transition-colors border border-[#555] hover:bg-white/10"
            style={{ background: 'rgba(50,50,50,0.3)' }}>GitHub</a>
        </div>
      </div>
    );
  }

  const dialogContent = npcDialog || (dialogKey ? PORTFOLIO_CONTENT[dialogKey as keyof typeof PORTFOLIO_CONTENT] : null);

  return (
    <div className="fixed inset-0" style={{ fontFamily: '"Press Start 2P", monospace', background: '#0a0510' }}>
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Music toggle */}
      <button onClick={handleToggleMusic}
        className="absolute top-16 left-3 px-2 py-1.5 border text-[7px] transition-colors rounded-sm"
        style={{ background: 'rgba(10,5,20,0.7)', borderColor: '#8b6914', color: '#ffd700' }}>
        {musicOn ? '🔊' : '🔇'} [M]
      </button>

      {/* Discovery notification */}
      {discoveryMsg && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 px-6 py-3 border-2 animate-scale-in"
          style={{ background: 'rgba(10,5,20,0.9)', borderColor: '#ffd700', opacity: discoveryTimer > 10 ? 1 : discoveryTimer / 10 }}>
          <p className="text-[#ffd700] text-[10px] whitespace-nowrap">{discoveryMsg}</p>
        </div>
      )}

      {/* Interaction hint */}
      {hint && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 px-6 py-3 border-2 rounded-sm"
          style={{ background: 'rgba(10,5,20,0.85)', borderColor: '#ffd700' }}>
          <p className="text-[#ffd700] text-[10px] whitespace-nowrap animate-pulse">{hint}</p>
        </div>
      )}

      {/* Mobile controls */}
      {isMobile && (
        <>
          <div className="absolute bottom-8 left-8 grid grid-cols-3 grid-rows-3 gap-1" style={{ width: '130px', height: '130px' }}>
            <div />
            <button onTouchStart={() => mobilePress('arrowup')} onTouchEnd={() => mobileRelease('arrowup')}
              className="flex items-center justify-center active:scale-95 select-none text-lg text-white"
              style={{ background: 'rgba(10,5,20,0.7)', border: '2px solid rgba(139,105,20,0.5)' }}>▲</button>
            <div />
            <button onTouchStart={() => mobilePress('arrowleft')} onTouchEnd={() => mobileRelease('arrowleft')}
              className="flex items-center justify-center active:scale-95 select-none text-lg text-white"
              style={{ background: 'rgba(10,5,20,0.7)', border: '2px solid rgba(139,105,20,0.5)' }}>◄</button>
            <div style={{ background: 'rgba(10,5,20,0.3)', border: '1px solid rgba(139,105,20,0.2)' }} />
            <button onTouchStart={() => mobilePress('arrowright')} onTouchEnd={() => mobileRelease('arrowright')}
              className="flex items-center justify-center active:scale-95 select-none text-lg text-white"
              style={{ background: 'rgba(10,5,20,0.7)', border: '2px solid rgba(139,105,20,0.5)' }}>►</button>
            <div />
            <button onTouchStart={() => mobilePress('arrowdown')} onTouchEnd={() => mobileRelease('arrowdown')}
              className="flex items-center justify-center active:scale-95 select-none text-lg text-white"
              style={{ background: 'rgba(10,5,20,0.7)', border: '2px solid rgba(139,105,20,0.5)' }}>▼</button>
            <div />
          </div>
          <button onTouchStart={() => { keysRef.current.add(' '); tryInteract(); }} onTouchEnd={() => keysRef.current.delete(' ')}
            className="absolute bottom-12 right-12 rounded-full flex items-center justify-center active:scale-90 select-none text-sm text-white"
            style={{ width: '72px', height: '72px', background: 'rgba(139,105,20,0.8)', border: '3px solid #ffd700', boxShadow: '0 0 15px rgba(255,215,0,0.2)' }}>⚡</button>
        </>
      )}

      {gameState === 'dialog' && dialogContent && (
        <GameDialog content={dialogContent} onClose={closeDialog} />
      )}
    </div>
  );
};

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
