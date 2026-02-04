import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowRight, Github, Linkedin, Mail, Instagram, Download, Sparkles } from "lucide-react";
import profileImage from "@/assets/profile-prakhar.jpg";
import { useTypingAnimation } from "@/hooks/useTypingAnimation";

const Hero = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const { currentText } = useTypingAnimation({
    words: ["Front-End Developer", "Video Editor", "Tech Creator", "Problem Solver"],
    typingSpeed: 100,
    deletingSpeed: 50,
    delayBetweenWords: 2000,
  });

  const handleProfileClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan/10 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
        
        {/* Floating Elements - Desktop Only */}
        <div className="hidden lg:block">
          <div className="absolute top-32 left-20 w-3 h-3 rounded-full bg-primary/60 animate-float-gentle" />
          <div className="absolute top-48 right-32 w-2 h-2 rounded-full bg-cyan/60 animate-float-gentle delay-500" />
          <div className="absolute bottom-40 left-1/4 w-4 h-4 rounded-full bg-primary/40 animate-float-gentle delay-1000" />
          <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-cyan/50 animate-float-gentle delay-700" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in text-center lg:text-left order-2 lg:order-1">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Available for opportunities
            </div>
            
            <div className="space-y-4">
              {/* Typing Animation */}
              <div className="h-7 md:h-8">
                <span className="text-primary text-base md:text-lg font-medium tracking-wide">
                  {currentText}
                  <span className="animate-pulse text-primary">|</span>
                </span>
              </div>
              
              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight">
                <span className="text-foreground">Crafting</span>
                <br />
                <span className="gradient-text">Digital</span>
                <br />
                <span className="text-foreground">Experiences</span>
              </h1>
              
              {/* Description */}
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Hi, I'm <span className="text-foreground font-medium">Prakhar Tiwari</span> — blending creativity 
                and code to build beautiful, functional digital experiences.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-cyan text-primary-foreground hover:opacity-90 transition-all shadow-lg shadow-primary/25 group px-6"
              >
                <a href="#projects" className="flex items-center gap-2">
                  View Projects
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:border-primary/50 hover:bg-primary/5 group px-6"
              >
                <a href="#contact" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Get in Touch
                </a>
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-6 pt-4 justify-center lg:justify-start">
              <span className="text-sm text-muted-foreground">Find me on</span>
              <div className="flex items-center gap-3">
                {[
                  { icon: Github, href: "https://github.com/prakhartiwaria221-afk" },
                  { icon: Linkedin, href: "https://linkedin.com/in/prakhar-tiwari-8b04a7296" },
                  { icon: Instagram, href: "https://instagram.com/prakhar6038" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all"
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="relative flex items-center justify-center order-1 lg:order-2 mb-8 lg:mb-0">
            <div className="relative">
              {/* Decorative Rings */}
              <div className="absolute inset-0 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full border border-primary/20 animate-pulse-soft" style={{ transform: 'scale(1.3)' }} />
              <div className="absolute inset-0 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full border border-cyan/10" style={{ transform: 'scale(1.5)' }} />
              
              {/* Orbiting Icons */}
              <div className="absolute inset-0 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 animate-orbit hidden sm:block" style={{ animationDuration: '20s' }}>
                {[
                  { content: "⚛️", position: "top-0 left-1/2 -translate-x-1/2 -translate-y-4" },
                  { content: "☕", position: "top-1/2 right-0 translate-x-4 -translate-y-1/2" },
                  { content: "C++", position: "bottom-0 left-1/2 -translate-x-1/2 translate-y-4", isText: true },
                  { content: "</>", position: "top-1/2 left-0 -translate-x-4 -translate-y-1/2", isText: true },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`absolute ${item.position} w-10 h-10 sm:w-12 sm:h-12 bg-card rounded-xl border border-border flex items-center justify-center shadow-lg hover:border-primary/50 transition-colors`}
                  >
                    {item.isText ? (
                      <span className="text-primary text-xs font-bold">{item.content}</span>
                    ) : (
                      <span className="text-lg">{item.content}</span>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Glow Effect */}
              <div className="absolute inset-0 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-primary/20 to-cyan/20 blur-3xl animate-pulse" />
              
              {/* Main Profile Container */}
              <div 
                className={`relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full p-1 bg-gradient-to-br from-primary via-cyan to-primary cursor-pointer transition-all duration-500 z-10 ${
                  isAnimating ? 'scale-105 rotate-3' : 'hover:scale-[1.02]'
                }`}
                onClick={handleProfileClick}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-background p-1">
                  <img
                    src={profileImage}
                    alt="Prakhar Tiwari"
                    className={`w-full h-full object-cover rounded-full transition-transform duration-500 ${
                      isAnimating ? 'scale-110' : ''
                    }`}
                  />
                </div>
                
                {/* Sparkle Effect */}
                <Sparkles className="absolute top-4 right-4 w-6 h-6 text-primary animate-pulse" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 animate-fade-in">
          <span className="text-xs text-muted-foreground">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-border flex justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-primary animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
