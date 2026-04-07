import { useState, useEffect } from "react";
import { Github, Linkedin, Instagram, Download, ArrowDown } from "lucide-react";
import { Button } from "./ui/button";
import profileImage from "@/assets/profile-prakhar.jpg";
import dumbledoreImage from "@/assets/dumbledore.png";
import goldenSnitchImage from "@/assets/golden-snitch.png";
import harryImage from "@/assets/harry-potter.png";
import { useTypingAnimation } from "@/hooks/useTypingAnimation";
import SparkleCanvas from "./SparkleCanvas";
import MagneticButton from "./MagneticButton";
import AnimatedText from "./AnimatedText";

interface HeroProps {
  house?: string | null;
}

const Hero = ({ house }: HeroProps) => {
  const { currentText } = useTypingAnimation({
    words: ["Front-End Developer", "Video Editor", "Tech Creator", "Problem Solver"],
    typingSpeed: 100,
    deletingSpeed: 50,
    delayBetweenWords: 2000,
  });

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <SparkleCanvas count={25} color="gold" />

      {/* Animated background orbs with parallax */}
      <div
        className="absolute top-[10%] right-[10%] w-72 h-72 rounded-full bg-primary/5 blur-[100px]"
        style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}
      />
      <div
        className="absolute bottom-[20%] left-[5%] w-96 h-96 rounded-full bg-secondary/5 blur-[120px]"
        style={{ transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)` }}
      />

      {/* Floating decorative rings */}
      <div className="absolute top-20 right-16 w-32 h-32 rounded-full border border-primary/20 animate-float-gentle" />
      <div className="absolute bottom-32 left-12 w-20 h-20 rounded-full bg-secondary/10 animate-float-blob" />
      <div className="absolute top-[40%] left-[5%] w-2 h-2 rounded-full bg-primary/50 animate-pulse" />
      <div className="absolute top-[30%] right-[8%] w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-[40%] right-[20%] w-1 h-1 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Golden Snitch floating */}
      <img
        src={goldenSnitchImage}
        alt="Golden Snitch"
        loading="lazy"
        width={80}
        height={80}
        className="absolute top-20 right-2 sm:right-[15%] w-10 sm:w-20 animate-float-gentle opacity-60"
        style={{ animationDelay: '0.5s', transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)` }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left - Profile with Dumbledore */}
          <div className={`relative flex items-center justify-center order-1 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative w-full max-w-sm mx-auto group">
              <div className="absolute inset-0 rounded-t-[200px] bg-gradient-to-b from-primary/20 via-transparent to-secondary/10 blur-2xl scale-110 group-hover:scale-125 transition-transform duration-700" />
              
              <div
                className="w-full h-[450px] sm:h-[520px] relative rounded-t-[200px] overflow-hidden animate-glow-pulse"
                style={{
                  background: 'linear-gradient(180deg, hsl(43 40% 30%), hsl(230 25% 12%))',
                }}
              >
                <img
                  src={profileImage}
                  alt="Prakhar Tiwari"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>

              <div className="absolute -top-2 -right-2 sm:top-4 sm:-right-6 z-30">
                <div className="relative">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-500 animate-pulse" />
                  <div className="absolute inset-0 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-500/50 animate-ping" />
                </div>
              </div>

              <div className="absolute -top-4 -left-4 w-16 h-16 border border-primary/30 rounded-full" />
              <div className="absolute -bottom-2 -right-3 w-12 h-12 border border-secondary/30 rounded-full" />
            </div>

            <div className="absolute -right-2 sm:-right-16 bottom-0 z-20">
              <div className="relative">
                <SparkleCanvas count={8} color="gold" className="!-inset-8" />
                <img
                  src={dumbledoreImage}
                  alt="Dumbledore"
                  loading="lazy"
                  width={180}
                  height={270}
                  className="w-16 sm:w-32 lg:w-44 drop-shadow-[0_0_20px_hsl(43,72%,55%,0.3)] animate-float-gentle"
                  style={{ animationDelay: '1.5s' }}
                />
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className={`space-y-6 text-center lg:text-left order-2 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {house && house !== "skip" && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm mb-2 animate-fade-in">
                <span className="text-sm text-primary font-medium" style={{ fontFamily: "'Crimson Text', serif" }}>
                  Sorted into {house} ⚡
                </span>
              </div>
            )}

            <div className="space-y-2">
              <p className="text-primary/60 text-sm tracking-[0.3em] uppercase font-medium" style={{ fontFamily: "'Crimson Text', serif" }}>
                Welcome to my magical world
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight" style={{ fontFamily: "'Cinzel', serif" }}>
                <AnimatedText text="I am " className="text-foreground" />
                <br className="sm:hidden" />
                <span className="text-shimmer"><AnimatedText text="Prakhar" delay={200} /></span>
              </h1>
            </div>

            <div className="h-10 flex items-center justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-muted-foreground text-lg md:text-xl font-light italic tracking-wide" style={{ fontFamily: "'Crimson Text', serif" }}>
                  {currentText}
                  <span className="animate-pulse text-primary">|</span>
                </span>
              </div>
            </div>

            <div className="max-w-sm mx-auto lg:mx-0">
              <div className="relative p-4 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/30">
                <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-primary/40 rounded-tl-lg" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-primary/40 rounded-br-lg" />
                <p className="text-sm text-muted-foreground italic leading-relaxed" style={{ fontFamily: "'Crimson Text', serif" }}>
                  "It does not do to dwell on dreams and forget to live — but blending creativity and code is pure magic."
                </p>
              </div>
            </div>

            {/* CTA Buttons with Magnetic effect */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
              <MagneticButton>
                <Button
                  className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_25px_hsl(43,72%,55%,0.3)] px-8 group transition-all duration-300"
                  asChild
                >
                  <a href="#projects">
                    View My Work
                    <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
                  </a>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button
                  variant="outline"
                  className="rounded-full border-border hover:border-primary/50 hover:text-primary hover:shadow-[0_0_20px_hsl(43,72%,55%,0.15)] px-8 group transition-all duration-300"
                  asChild
                >
                  <a href="#contact">
                    <Download className="mr-2 h-4 w-4 group-hover:-translate-y-0.5 transition-transform" />
                    Get in Touch
                  </a>
                </Button>
              </MagneticButton>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 justify-center lg:justify-start pt-2">
              {[
                { icon: Github, href: "https://github.com/prakhartiwaria221-afk", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/prakhar-tiwari-8b04a7296", label: "LinkedIn" },
                { icon: Instagram, href: "https://instagram.com/prakhar6038", label: "Instagram" },
              ].map((social, i) => (
                <MagneticButton key={i} strength={0.4}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full border border-border/50 bg-card/30 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 hover:scale-110 hover:shadow-[0_0_15px_hsl(43,72%,55%,0.2)] transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </a>
                </MagneticButton>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Harry Potter character */}
      <img
        src={harryImage}
        alt="Harry Potter"
        loading="lazy"
        width={512}
        height={512}
        className="absolute bottom-4 left-2 sm:bottom-12 sm:left-[5%] w-12 sm:w-24 opacity-50 hover:opacity-90 transition-opacity duration-300 animate-float-gentle pointer-events-none"
        style={{ animationDelay: '2s' }}
      />

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 animate-fade-in">
        <span className="text-xs text-muted-foreground tracking-widest uppercase" style={{ fontFamily: "'Crimson Text', serif" }}>Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-primary/60 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
