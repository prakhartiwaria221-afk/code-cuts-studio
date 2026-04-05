import { Github, Linkedin, Instagram } from "lucide-react";
import profileImage from "@/assets/profile-prakhar.jpg";
import dumbledoreImage from "@/assets/dumbledore.png";
import goldenSnitchImage from "@/assets/golden-snitch.png";
import harryImage from "@/assets/harry-potter.png";
import { useTypingAnimation } from "@/hooks/useTypingAnimation";
import SparkleCanvas from "./SparkleCanvas";

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

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <SparkleCanvas count={20} color="gold" />

      {/* Decorative magical elements */}
      <div className="absolute top-20 right-16 w-32 h-32 rounded-full border border-primary/20 animate-float-gentle" />
      <div className="absolute bottom-32 left-12 w-20 h-20 rounded-full bg-secondary/10 animate-float-blob" />

      {/* Golden Snitch floating */}
      <img
        src={goldenSnitchImage}
        alt="Golden Snitch"
        loading="lazy"
        width={80}
        height={80}
        className="absolute top-24 right-[15%] w-16 sm:w-20 animate-float-gentle opacity-60"
        style={{ animationDelay: '0.5s' }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left - Profile with Dumbledore */}
          <div className="relative flex items-center justify-center order-1">
            <div className="relative w-full max-w-sm mx-auto">
              <div
                className="w-full h-[450px] sm:h-[520px] relative rounded-t-[200px] overflow-hidden animate-glow-pulse"
                style={{
                  background: 'linear-gradient(180deg, hsl(43 40% 30%), hsl(230 25% 12%))',
                }}
              >
                <img
                  src={profileImage}
                  alt="Prakhar Tiwari"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-16 h-16 border border-primary/30 rounded-full" />
              <div className="absolute -bottom-2 -right-3 w-12 h-12 border border-secondary/30 rounded-full" />
            </div>

            {/* Dumbledore next to profile */}
            <div className="absolute -right-8 sm:-right-16 bottom-0 z-20 block">
              <div className="relative">
                <SparkleCanvas count={8} color="gold" className="!-inset-8" />
                <img
                  src={dumbledoreImage}
                  alt="Dumbledore"
                  loading="lazy"
                  width={180}
                  height={270}
                  className="w-32 sm:w-44 drop-shadow-[0_0_20px_hsl(43,72%,55%,0.3)] animate-float-gentle"
                  style={{ animationDelay: '1.5s' }}
                />
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-6 animate-fade-in text-center lg:text-left order-2">
            {house && house !== "skip" && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-2">
                <span className="text-sm text-primary font-medium" style={{ fontFamily: "'Crimson Text', serif" }}>
                  Sorted into {house} ⚡
                </span>
              </div>
            )}
            <div className="text-primary/40 text-3xl">⚡</div>

            <div className="space-y-2">
              <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase font-medium" style={{ fontFamily: "'Crimson Text', serif" }}>
                Welcome to my magical world
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight" style={{ fontFamily: "'Cinzel', serif" }}>
                <span className="text-foreground">I am </span>
                <span className="text-shimmer">Prakhar</span>
              </h1>
            </div>

            <div className="h-8">
              <span className="text-muted-foreground text-lg md:text-xl font-light italic tracking-wide" style={{ fontFamily: "'Crimson Text', serif" }}>
                {currentText}
                <span className="animate-pulse text-primary">|</span>
              </span>
            </div>

            <div className="max-w-xs mx-auto lg:mx-0">
              <div className="quote-box">
                <p className="text-sm text-muted-foreground italic leading-relaxed" style={{ fontFamily: "'Crimson Text', serif" }}>
                  "It does not do to dwell on dreams and forget to live — but blending creativity and code is pure magic."
                </p>
              </div>
            </div>

            <div className="flex gap-3 justify-center lg:justify-start pt-2">
              {[
                { icon: Github, href: "https://github.com/prakhartiwaria221-afk", label: "GH" },
                { icon: Linkedin, href: "https://linkedin.com/in/prakhar-tiwari-8b04a7296", label: "IN" },
                { icon: Instagram, href: "https://instagram.com/prakhar6038", label: "IG" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 text-xs font-bold"
                >
                  {social.label}
                </a>
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
        className="absolute bottom-12 left-[5%] w-16 sm:w-24 opacity-50 hover:opacity-90 transition-opacity duration-300 animate-float-gentle pointer-events-none"
        style={{ animationDelay: '2s' }}
      />

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 animate-fade-in">
        <span className="text-xs text-muted-foreground tracking-widest uppercase" style={{ fontFamily: "'Crimson Text', serif" }}>Scroll</span>
        <div className="w-5 h-9 rounded-full border border-border/60 flex justify-center pt-2">
          <div className="w-1 h-2.5 rounded-full bg-primary/50 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
