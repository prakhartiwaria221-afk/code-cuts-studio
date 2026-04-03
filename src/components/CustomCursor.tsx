import { useEffect, useState, useRef, useCallback } from 'react';

interface Sparkle {
  x: number;
  y: number;
  size: number;
  life: number;
  maxLife: number;
  vx: number;
  vy: number;
  hue: number;
}

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparklesRef = useRef<Sparkle[]>([]);
  const animIdRef = useRef<number>(0);
  const lastSpawnRef = useRef(0);

  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  const spawnSparkles = useCallback((x: number, y: number) => {
    const now = Date.now();
    if (now - lastSpawnRef.current < 30) return;
    lastSpawnRef.current = now;
    
    for (let i = 0; i < 3; i++) {
      sparklesRef.current.push({
        x, y,
        size: Math.random() * 3 + 1,
        life: 0,
        maxLife: Math.random() * 30 + 20,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2 - 1,
        hue: Math.random() > 0.5 ? 43 : 30,
      });
    }
    if (sparklesRef.current.length > 100) {
      sparklesRef.current = sparklesRef.current.slice(-80);
    }
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      sparklesRef.current = sparklesRef.current.filter(s => {
        s.life++;
        if (s.life > s.maxLife) return false;
        
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.02;
        
        const progress = s.life / s.maxLife;
        const alpha = 1 - progress;
        const size = s.size * (1 - progress * 0.5);
        
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.life * 0.1);
        ctx.fillStyle = `hsla(${s.hue}, 80%, 65%, ${alpha * 0.9})`;
        
        // 4-point star
        ctx.beginPath();
        for (let p = 0; p < 4; p++) {
          const a = (p * Math.PI) / 2;
          ctx.lineTo(Math.cos(a) * size * 2, Math.sin(a) * size * 2);
          ctx.lineTo(Math.cos(a + Math.PI / 4) * size * 0.4, Math.sin(a + Math.PI / 4) * size * 0.4);
        }
        ctx.closePath();
        ctx.fill();
        
        // Glow
        ctx.beginPath();
        ctx.arc(0, 0, size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 80%, 65%, ${alpha * 0.15})`;
        ctx.fill();
        ctx.restore();
        
        return true;
      });
      
      animIdRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animIdRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [isTouchDevice]);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      spawnSparkles(e.clientX, e.clientY);
      
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer'));
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.style.cursor = 'auto';
    };
  }, [isTouchDevice, spawnSparkles]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Sparkle trail canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9997]"
      />
      
      {/* Wand tip dot */}
      <div
        className={`fixed pointer-events-none z-[9999] transition-opacity duration-150 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ left: position.x, top: position.y, transform: 'translate(-50%, -50%)' }}
      >
        <div className={`rounded-full bg-primary transition-all duration-200 ${isHovering ? 'w-3 h-3 shadow-[0_0_12px_hsl(43,72%,55%)]' : 'w-2 h-2 shadow-[0_0_8px_hsl(43,72%,55%)]'}`} />
      </div>

      {/* Outer ring */}
      <div
        className={`fixed pointer-events-none z-[9998] transition-all duration-300 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{
          left: position.x, top: position.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
        }}
      >
        <div className={`rounded-full border-2 border-primary/40 transition-all duration-200 ${isHovering ? 'w-10 h-10 bg-primary/10' : 'w-8 h-8'}`} />
      </div>

      <style>{`*, *::before, *::after { cursor: none !important; }`}</style>
    </>
  );
};

export default CustomCursor;
