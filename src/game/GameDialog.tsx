import { useEffect, useState } from 'react';

interface DialogContent {
  title: string;
  lines: string[];
}

interface GameDialogProps {
  content: DialogContent;
  onClose: () => void;
}

const GameDialog = ({ content, onClose }: GameDialogProps) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [shake, setShake] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShake(false), 150);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (visibleLines < content.lines.length) {
      const timer = setTimeout(() => setVisibleLines(v => v + 1), 35);
      return () => clearTimeout(timer);
    }
  }, [visibleLines, content.lines.length]);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'e') {
        if (visibleLines >= content.lines.length) {
          onClose();
        } else {
          setVisibleLines(content.lines.length);
        }
      }
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [visibleLines, content.lines.length, onClose]);

  const allVisible = visibleLines >= content.lines.length;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4" style={{ fontFamily: '"Press Start 2P", monospace' }}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" onClick={onClose} />

      {/* Dialog - parchment style */}
      <div
        className="relative max-w-lg w-full max-h-[80vh] overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #2a1a0a, #1a1020, #0d0818)',
          border: '3px solid #8b6914',
          boxShadow: '0 0 40px rgba(139, 105, 20, 0.2), inset 0 0 60px rgba(0,0,0,0.5)',
          transform: shake ? 'scale(1.02)' : 'scale(1)',
          transition: 'transform 0.15s ease-out',
        }}
      >
        {/* Corner decorations - golden */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#ffd700]" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#ffd700]" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#ffd700]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#ffd700]" />

        {/* Title bar - Hogwarts dark */}
        <div className="px-5 py-2.5 flex items-center justify-between" style={{ background: 'linear-gradient(90deg, #5a1020, #2a1040, #1a2050)' }}>
          <span className="text-[#ffd700] text-[10px] font-bold tracking-wider">{content.title}</span>
          <button
            onClick={onClose}
            className="text-[#ffd700] hover:text-white text-xs w-6 h-6 flex items-center justify-center hover:bg-white/10 transition-colors rounded-sm"
          >
            ✕
          </button>
        </div>

        {/* Magical scanline effect */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,215,0,0.1) 2px, rgba(255,215,0,0.1) 4px)',
          }}
        />

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[55vh]">
          <div className="space-y-1.5">
            {content.lines.slice(0, visibleLines).map((line, i) => (
              <p key={i} className="text-[#d4c4a0] text-[9px] sm:text-[10px] leading-relaxed whitespace-pre-wrap min-h-[14px]"
                style={{ textShadow: '0 0 8px rgba(139, 105, 20, 0.15)' }}>
                {line}
              </p>
            ))}
            {!allVisible && (
              <span className="inline-block text-[#ffd700] animate-pulse text-sm mt-1">⚡</span>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="px-5 py-2.5 flex justify-between items-center" style={{ borderTop: '1px solid rgba(139, 105, 20, 0.2)', background: '#0a0510' }}>
          <div className="flex gap-1.5">
            {['🔴', '🟡', '🟢', '🔵'].map((dot, i) => (
              <span key={i} className="text-[6px] opacity-40">{dot}</span>
            ))}
          </div>
          <button onClick={onClose} className="text-[#8b6914] text-[7px] hover:text-[#ffd700] transition-colors tracking-wider">
            {allVisible ? '[ SPACE ] Close' : '[ SPACE ] Skip'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameDialog;
