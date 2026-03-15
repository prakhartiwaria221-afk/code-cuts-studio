import { Github, Linkedin, Instagram } from "lucide-react";
import profileImage from "@/assets/profile-prakhar.jpg";
import { useTypingAnimation } from "@/hooks/useTypingAnimation";

const Hero = () => {
  const { currentText } = useTypingAnimation({
    words: ["Front-End Developer", "Video Editor", "Tech Creator", "Problem Solver"],
    typingSpeed: 100,
    deletingSpeed: 50,
    delayBetweenWords: 2000,
  });

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Decorative Blobs */}
      <div className="absolute top-10 right-10 w-[200px] h-[200px] rounded-full border-[30px] border-muted/30 animate-blob" />
      <div className="absolute bottom-20 left-10 w-[150px] h-[150px] rounded-full border-[25px] border-muted/20 animate-float" />
      <div className="absolute top-1/2 right-1/3 w-[80px] h-[80px] rounded-full bg-teal-light/10 animate-float-gentle" />
      
      {/* Small decorative dots */}
      <div className="absolute top-[20%] left-[15%] w-3 h-3 rounded-full bg-muted-foreground/20" />
      <div className="absolute top-[40%] right-[10%] w-2 h-2 rounded-full bg-muted-foreground/30" />
      <div className="absolute bottom-[30%] left-[40%] w-4 h-4 rounded-full bg-muted-foreground/15" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content - Arch Profile */}
          <div className="relative flex items-center justify-center order-1">
            <div className="relative w-full max-w-sm mx-auto">
              {/* Arch shaped white/cream background */}
              <div className="relative rounded-b-none overflow-hidden">
                <div 
                  className="w-full h-[450px] sm:h-[520px] relative"
                  style={{
                    borderRadius: '200px 200px 0 0',
                    overflow: 'hidden',
                    background: 'linear-gradient(180deg, hsl(40 30% 95%), hsl(0 0% 100%))',
                  }}
                >
                  <img
                    src={profileImage}
                    alt="Prakhar Tiwari"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Decorative circle behind arch */}
              <div className="absolute -top-8 -left-8 w-[120px] h-[120px] rounded-full bg-muted/20 -z-10" />
              <div className="absolute -bottom-4 -right-6 w-[80px] h-[80px] rounded-full border-[15px] border-muted/25 -z-10" />
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-6 animate-fade-in text-center lg:text-left order-2">
            {/* Paper plane icon */}
            <div className="text-muted-foreground/50 text-3xl">✈</div>
            
            {/* Name */}
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight">
                <span className="text-foreground">I am </span>
                <span className="text-foreground">Prakhar</span>
              </h1>
            </div>

            {/* Typing Role */}
            <div className="h-8">
              <span className="text-muted-foreground text-lg md:text-xl font-light italic tracking-wide">
                {currentText}
                <span className="animate-pulse text-foreground">|</span>
              </span>
            </div>

            {/* Quote box */}
            <div className="max-w-xs mx-auto lg:mx-0">
              <div className="quote-box">
                <p className="text-sm text-muted-foreground italic leading-relaxed">
                  "Blending creativity and code to craft beautiful, functional digital experiences."
                </p>
              </div>
            </div>

            {/* Social Icons */}
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
                  className="w-11 h-11 rounded-full border-2 border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-all duration-300 text-xs font-bold"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 animate-fade-in">
        <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-9 rounded-full border-2 border-border/60 flex justify-center pt-2">
          <div className="w-1 h-2.5 rounded-full bg-foreground/50 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
