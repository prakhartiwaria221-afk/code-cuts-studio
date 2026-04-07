import { useEffect, useRef, useState } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

const AnimatedText = ({ text, className = "", style, delay = 0, as: Tag = 'span' }: AnimatedTextProps) => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const letters = text.split("");

  return (
    <Tag ref={ref as any} className={`inline-block ${className}`} style={style} aria-label={text}>
      {letters.map((letter, i) => (
        <span
          key={i}
          className="inline-block transition-all duration-500"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: `${delay + i * 30}ms`,
          }}
          aria-hidden="true"
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </Tag>
  );
};

export default AnimatedText;
