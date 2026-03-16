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

  useEffect(() => {
    if (visibleLines < content.lines.length) {
      const timer = setTimeout(() => setVisibleLines(v => v + 1), 40);
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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4" style={{ fontFamily: '"Press Start 2P", monospace' }}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Dialog box */}
      <div className="relative bg-[#1a1a2e] border-4 border-[#4a8c3f] max-w-lg w-full max-h-[80vh] overflow-hidden">
        {/* Title bar */}
        <div className="bg-[#4a8c3f] px-4 py-2 flex items-center justify-between">
          <span className="text-[#1a1a2e] text-xs">{content.title}</span>
          <button onClick={onClose} className="text-[#1a1a2e] hover:text-white text-xs">✕</button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-1">
            {content.lines.slice(0, visibleLines).map((line, i) => (
              <p key={i} className="text-[#c4c4c4] text-[9px] sm:text-[10px] leading-relaxed whitespace-pre-wrap min-h-[14px]">
                {line}
              </p>
            ))}
            {visibleLines < content.lines.length && (
              <span className="text-[#4a8c3f] animate-pulse">▼</span>
            )}
          </div>
        </div>

        {/* Bottom hint */}
        <div className="border-t border-[#4a8c3f]/30 px-4 py-2 flex justify-end">
          <button onClick={onClose} className="text-[#6a6a6a] text-[7px] hover:text-[#4a8c3f] transition-colors">
            {visibleLines >= content.lines.length ? '[SPACE/ESC] Close' : '[SPACE] Skip'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameDialog;
