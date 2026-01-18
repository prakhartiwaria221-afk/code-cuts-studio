import { useRef, useEffect, useState, ReactNode } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
}

const ParallaxSection = ({ 
  children, 
  className = '', 
  speed = 0.3,
  direction = 'up' 
}: ParallaxSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const parallaxOffset = (scrollProgress - 0.5) * 100 * speed;
        setOffset(direction === 'up' ? -parallaxOffset : parallaxOffset);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction]);

  return (
    <div ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      <div
        style={{
          transform: `translateY(${offset}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
};

// Parallax floating elements
export const ParallaxElement = ({ 
  children, 
  speed = 0.5,
  className = ''
}: { 
  children: ReactNode; 
  speed?: number;
  className?: string;
}) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      className={className}
      style={{
        transform: `translateY(${offset}px)`,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};

// Decorative parallax shapes
export const ParallaxShapes = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-5">
      {/* Large floating circle */}
      <div
        className="absolute w-64 h-64 rounded-full bg-primary/5 blur-3xl"
        style={{
          top: '20%',
          left: '10%',
          transform: `translate(${scrollY * 0.1}px, ${scrollY * -0.05}px)`,
        }}
      />
      
      {/* Small accent circle */}
      <div
        className="absolute w-32 h-32 rounded-full bg-gold-light/10 blur-2xl"
        style={{
          top: '60%',
          right: '15%',
          transform: `translate(${scrollY * -0.08}px, ${scrollY * 0.03}px)`,
        }}
      />
      
      {/* Decorative diamond */}
      <div
        className="absolute w-24 h-24 bg-primary/5 rotate-45 blur-xl hidden md:block"
        style={{
          top: '40%',
          left: '70%',
          transform: `rotate(45deg) translate(${scrollY * 0.05}px, ${scrollY * -0.02}px)`,
        }}
      />
      
      {/* Bottom gradient */}
      <div
        className="absolute w-96 h-96 rounded-full bg-accent/5 blur-3xl"
        style={{
          bottom: '10%',
          left: '30%',
          transform: `translate(${scrollY * -0.03}px, ${scrollY * 0.04}px)`,
        }}
      />
    </div>
  );
};

export default ParallaxSection;
