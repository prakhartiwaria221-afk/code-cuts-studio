import { useEffect, useRef } from "react";

interface SparkleCanvasProps {
  count?: number;
  color?: string;
  className?: string;
}

const SparkleCanvas = ({ count = 15, color = "gold", className = "" }: SparkleCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const parent = canvas.parentElement;
    
    const resize = () => {
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    if (parent) ro.observe(parent);

    const sparkles: Array<{
      x: number; y: number; size: number; maxSize: number;
      speed: number; angle: number; life: number; maxLife: number;
    }> = [];

    const createSparkle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 0,
      maxSize: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.2,
      angle: Math.random() * Math.PI * 2,
      life: 0,
      maxLife: Math.random() * 120 + 60,
    });

    for (let i = 0; i < count; i++) {
      const s = createSparkle();
      s.life = Math.random() * s.maxLife;
      sparkles.push(s);
    }

    const hue = color === "gold" ? 43 : color === "red" ? 0 : 230;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparkles.forEach((s, i) => {
        s.life++;
        if (s.life > s.maxLife) {
          sparkles[i] = createSparkle();
          return;
        }

        const progress = s.life / s.maxLife;
        const alpha = progress < 0.5 ? progress * 2 : (1 - progress) * 2;
        s.size = s.maxSize * alpha;
        s.y -= s.speed * 0.3;
        s.x += Math.sin(s.life * 0.02) * 0.3;

        // Draw 4-point star
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.angle + s.life * 0.01);
        ctx.fillStyle = `hsla(${hue}, 72%, 65%, ${alpha * 0.8})`;
        
        ctx.beginPath();
        for (let p = 0; p < 4; p++) {
          const a = (p * Math.PI) / 2;
          ctx.lineTo(Math.cos(a) * s.size * 2, Math.sin(a) * s.size * 2);
          ctx.lineTo(Math.cos(a + Math.PI / 4) * s.size * 0.5, Math.sin(a + Math.PI / 4) * s.size * 0.5);
        }
        ctx.closePath();
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(0, 0, s.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 72%, 65%, ${alpha * 0.1})`;
        ctx.fill();

        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      ro.disconnect();
    };
  }, [count, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  );
};

export default SparkleCanvas;
