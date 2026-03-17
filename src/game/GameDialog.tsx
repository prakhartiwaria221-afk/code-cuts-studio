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

  // Entry animation
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
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" onClick={onClose} />

      {/* Dialog box with entry animation */}
      <div
        className="relative bg-[#12122a] max-w-lg w-full max-h-[80vh] overflow-hidden animate-scale-in"
        style={{
          border: '3px solid #4a8c3f',
          boxShadow: '0 0 30px rgba(74, 140, 63, 0.15), inset 0 0 60px rgba(0,0,0,0.5)',
          transform: shake ? 'scale(1.02)' : 'scale(1)',
          transition: 'transform 0.15s ease-out',
        }}
      >
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#ffd700]" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#ffd700]" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#ffd700]" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#ffd700]" />

        {/* Title bar */}
        <div className="bg-gradient-to-r from-[#4a8c3f] to-[#3a7a2f] px-5 py-2.5 flex items-center justify-between">
          <span className="text-[#0d0d1a] text-[10px] font-bold tracking-wider">{content.title}</span>
          <button
            onClick={onClose}
            className="text-[#0d0d1a] hover:text-white text-xs w-6 h-6 flex items-center justify-center hover:bg-black/20 transition-colors rounded-sm"
          >
            ✕
          </button>
        </div>

        {/* Scanline effect */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
          }}
        />

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[55vh]">
          <div className="space-y-1.5">
            {content.lines.slice(0, visibleLines).map((line, i) => (
              <p key={i} className="text-[#d0d0d0] text-[9px] sm:text-[10px] leading-relaxed whitespace-pre-wrap min-h-[14px]"
                style={{ textShadow: '0 0 8px rgba(74, 140, 63, 0.1)' }}>
                {line}
              </p>
            ))}
            {!allVisible && (
              <span className="inline-block text-[#4a8c3f] animate-pulse text-sm mt-1">▼</span>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#4a8c3f]/20 px-5 py-2.5 flex justify-between items-center bg-[#0d0d18]">
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-[#4a8c3f]/40 rounded-full" />
            ))}
          </div>
          <button onClick={onClose} className="text-[#666] text-[7px] hover:text-[#4a8c3f] transition-colors tracking-wider">
            {allVisible ? '[ SPACE ] Close' : '[ SPACE ] Skip'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameDialog;
