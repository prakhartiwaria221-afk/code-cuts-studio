import { useState, useEffect } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'reveal'>('loading');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setPhase('reveal');
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + Math.random() * 8 + 2;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center transition-all duration-700 ${
        phase === 'reveal' ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-particle ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Logo */}
      <div className="relative mb-8">
        <div className="text-5xl sm:text-7xl font-black text-foreground tracking-tight" style={{ fontFamily: "'Cinzel', serif" }}>
          P<span className="text-primary animate-pulse">⚡</span>T
        </div>
        <div className="absolute -inset-8 rounded-full bg-primary/5 blur-3xl animate-pulse" />
      </div>

      {/* Loading text */}
      <p
        className="text-muted-foreground text-sm tracking-[0.4em] uppercase mb-8 animate-pulse"
        style={{ fontFamily: "'Crimson Text', serif" }}
      >
        Casting spells...
      </p>

      {/* Progress bar */}
      <div className="w-48 sm:w-64 h-1 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-200 relative overflow-hidden"
          style={{
            width: `${Math.min(progress, 100)}%`,
            background: 'linear-gradient(90deg, hsl(43 72% 55%), hsl(43 80% 70%))',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_1s_linear_infinite]" />
        </div>
      </div>

      <p className="mt-4 text-xs text-muted-foreground/60 font-mono">
        {Math.min(Math.round(progress), 100)}%
      </p>
    </div>
  );
};

export default LoadingScreen;
