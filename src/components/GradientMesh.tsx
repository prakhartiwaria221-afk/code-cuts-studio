import { useEffect, useState } from "react";

const GradientMesh = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let frame: number;
    const animate = () => {
      setTime(t => t + 0.003);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[180px] opacity-[0.04]"
        style={{
          background: 'hsl(43 72% 55%)',
          left: `${30 + Math.sin(time) * 15}%`,
          top: `${20 + Math.cos(time * 0.7) * 15}%`,
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.03]"
        style={{
          background: 'hsl(0 55% 40%)',
          right: `${20 + Math.sin(time * 0.5) * 10}%`,
          bottom: `${30 + Math.cos(time * 0.8) * 10}%`,
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full blur-[140px] opacity-[0.02]"
        style={{
          background: 'hsl(200 60% 50%)',
          left: `${60 + Math.sin(time * 0.3) * 20}%`,
          top: `${60 + Math.cos(time * 0.6) * 15}%`,
        }}
      />
    </div>
  );
};

export default GradientMesh;
