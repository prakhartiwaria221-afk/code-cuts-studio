import { useEffect, useRef, useState, useCallback } from "react";

const SpellEffects = () => {
  const [lumosFlash, setLumosFlash] = useState(false);
  const [patronus, setPatronus] = useState(false);
  const [patronusPos, setPatronusPos] = useState({ x: 0, y: 0 });
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{
    x: number; y: number; vx: number; vy: number;
    life: number; maxLife: number; size: number;
  }>>([]);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Lumos flash
  const castLumos = useCallback(() => {
    setLumosFlash(true);
    setTimeout(() => setLumosFlash(false), 600);
  }, []);

  // Patronus stag
  const castPatronus = useCallback((x: number, y: number) => {
    setPatronusPos({ x, y });
    setPatronus(true);
    // Spawn silver particles
    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1;
      particlesRef.current.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 80 + Math.random() * 40,
        maxLife: 80 + Math.random() * 40,
        size: Math.random() * 3 + 1,
      });
    }
    setTimeout(() => setPatronus(false), 3000);
  }, []);

  // Mouse/touch handlers
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onDown = (e: MouseEvent | TouchEvent) => {
      const pos = 'touches' in e
        ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
        : { x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY };

      // Ignore clicks on interactive elements
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, select, [role="button"]')) return;

      holdTimer.current = setTimeout(() => {
        castPatronus(pos.x, pos.y);
        holdTimer.current = null;
      }, 600);
    };

    const onUp = () => {
      if (holdTimer.current) {
        clearTimeout(holdTimer.current);
        holdTimer.current = null;
        // Short click = Lumos
        const target = document.activeElement as HTMLElement;
        if (!target?.closest('a, button, input, textarea, select, [role="button"]')) {
          castLumos();
        }
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("touchstart", onDown, { passive: true });
    document.addEventListener("touchend", onUp);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("touchend", onUp);
      if (holdTimer.current) clearTimeout(holdTimer.current);
    };
  }, [castLumos, castPatronus]);

  // Patronus particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const ps = particlesRef.current;

      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.02; // float up
        p.vx *= 0.99;
        p.life--;
        const alpha = p.life / p.maxLife;

        if (p.life <= 0) { ps.splice(i, 1); continue; }

        // Silver glow
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        glow.addColorStop(0, `rgba(200, 220, 255, ${alpha * 0.6})`);
        glow.addColorStop(1, `rgba(200, 220, 255, 0)`);
        ctx.fillStyle = glow;
        ctx.fillRect(p.x - p.size * 4, p.y - p.size * 4, p.size * 8, p.size * 8);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 235, 255, ${alpha})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      {/* Lumos flash overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[9998] transition-opacity duration-300"
        style={{
          opacity: lumosFlash ? 1 : 0,
          background: "radial-gradient(circle at center, rgba(255,255,240,0.9) 0%, rgba(255,215,0,0.3) 40%, transparent 70%)",
        }}
      />

      {/* Patronus stag SVG */}
      {patronus && (
        <div
          className="fixed pointer-events-none z-[9997] animate-fade-in"
          style={{
            left: patronusPos.x - 80,
            top: patronusPos.y - 100,
          }}
        >
          <svg width="160" height="160" viewBox="0 0 160 160" className="drop-shadow-[0_0_30px_rgba(200,220,255,0.8)]">
            {/* Stag body */}
            <g opacity="0.9" filter="url(#patronusGlow)">
              {/* Body */}
              <ellipse cx="80" cy="100" rx="30" ry="18" fill="rgba(200,220,255,0.7)" />
              {/* Neck */}
              <path d="M 65 90 Q 55 70 60 55" stroke="rgba(200,220,255,0.7)" strokeWidth="8" fill="none" strokeLinecap="round" />
              {/* Head */}
              <circle cx="58" cy="52" r="10" fill="rgba(200,220,255,0.7)" />
              {/* Antlers */}
              <path d="M 52 45 L 40 25 L 35 30 M 40 25 L 45 20" stroke="rgba(220,235,255,0.8)" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 62 43 L 70 22 L 75 28 M 70 22 L 65 18" stroke="rgba(220,235,255,0.8)" strokeWidth="3" fill="none" strokeLinecap="round" />
              {/* Legs */}
              <line x1="65" y1="115" x2="60" y2="145" stroke="rgba(200,220,255,0.6)" strokeWidth="5" strokeLinecap="round" />
              <line x1="75" y1="115" x2="72" y2="148" stroke="rgba(200,220,255,0.6)" strokeWidth="5" strokeLinecap="round" />
              <line x1="90" y1="113" x2="93" y2="145" stroke="rgba(200,220,255,0.6)" strokeWidth="5" strokeLinecap="round" />
              <line x1="98" y1="110" x2="103" y2="142" stroke="rgba(200,220,255,0.6)" strokeWidth="5" strokeLinecap="round" />
              {/* Tail */}
              <path d="M 110 95 Q 120 90 125 95" stroke="rgba(200,220,255,0.5)" strokeWidth="3" fill="none" strokeLinecap="round" />
              {/* Eye */}
              <circle cx="54" cy="50" r="2" fill="rgba(255,255,255,0.9)" />
            </g>
            <defs>
              <filter id="patronusGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>
          <p className="text-center text-xs font-['Cinzel'] tracking-widest mt-1" style={{ color: "rgba(200,220,255,0.7)" }}>
            Expecto Patronum
          </p>
        </div>
      )}

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9996]"
      />

      {/* Spell hint */}
      <div className="fixed bottom-4 left-4 z-[100] text-xs opacity-40 font-['Cinzel'] text-foreground pointer-events-none">
        Click: Lumos ✨ | Hold: Patronus 🦌
      </div>
    </>
  );
};

export default SpellEffects;
