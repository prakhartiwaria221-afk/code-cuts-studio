import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowRight, Github, Linkedin, Mail, Instagram } from "lucide-react";
import profileImage from "@/assets/profile-prakhar.jpg";

const Hero = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleProfileClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Dark Mode - Video Editing Software Interface */}
      <div className="absolute inset-0 overflow-hidden dark:block hidden light:hidden">
        {/* Top toolbar - hidden on mobile */}
        <div className="absolute top-4 left-4 right-4 h-10 bg-muted/20 rounded-lg border border-primary/10 items-center px-4 gap-4 hidden md:flex">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <div className="flex gap-2 ml-4">
            {['File', 'Edit', 'View', 'Effects'].map((item) => (
              <span key={item} className="text-xs text-muted-foreground/50">{item}</span>
            ))}
          </div>
        </div>
        
        {/* Left panel - Layers - hidden on mobile */}
        <div className="absolute top-20 left-4 w-48 bg-muted/10 rounded-lg border border-primary/10 p-3 hidden lg:block">
          <div className="text-xs text-primary/50 mb-2">LAYERS</div>
          {['Video Track 1', 'Audio Track', 'Effects', 'Text Overlay'].map((layer, i) => (
            <div key={layer} className={`text-xs py-1.5 px-2 rounded ${i === 0 ? 'bg-primary/20 text-primary' : 'text-muted-foreground/40'}`}>
              {layer}
            </div>
          ))}
        </div>
        
        {/* Film strip - hidden on mobile */}
        <div className="absolute top-20 right-4 w-16 h-64 border-2 border-primary/20 rounded-sm hidden lg:block">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex justify-between px-1 mt-2">
              <div className="w-3 h-3 bg-primary/30 rounded-sm" />
              <div className="w-3 h-3 bg-primary/30 rounded-sm" />
            </div>
          ))}
        </div>
        
        {/* Timeline with playhead animation - hidden on mobile */}
        <div className="absolute bottom-24 left-8 right-8 bg-muted/20 rounded-lg border border-primary/10 p-4 hidden md:block">
          {/* Time markers */}
          <div className="flex justify-between mb-2 text-xs text-muted-foreground/40">
            {['00:00', '00:15', '00:30', '00:45', '01:00'].map((time) => (
              <span key={time}>{time}</span>
            ))}
          </div>
          
          {/* Timeline tracks */}
          <div className="space-y-2">
            <div className="h-8 bg-primary/20 rounded flex items-center px-2">
              <div className="w-32 h-6 bg-primary/40 rounded text-xs flex items-center justify-center text-primary-foreground/60">
                Clip 1
              </div>
              <div className="w-24 h-6 bg-primary/30 rounded ml-2 text-xs flex items-center justify-center text-primary-foreground/60">
                Clip 2
              </div>
            </div>
            <div className="h-6 bg-blue-500/10 rounded flex items-center px-2">
              <div className="w-full h-4 bg-blue-500/20 rounded" />
            </div>
          </div>
          
          {/* Animated playhead */}
          <div className="absolute top-0 bottom-0 w-0.5 bg-primary animate-playhead" />
        </div>
        
        {/* Play controls - hidden on mobile */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 items-center gap-4 hidden md:flex">
          <div className="w-8 h-8 border border-primary/30 rounded flex items-center justify-center">
            <div className="w-2 h-3 border-l-2 border-r-2 border-primary/40" />
          </div>
          <div className="w-12 h-12 border-2 border-primary/40 rounded-full flex items-center justify-center">
            <div className="w-0 h-0 border-t-6 border-t-transparent border-l-10 border-l-primary/60 border-b-6 border-b-transparent ml-1" />
          </div>
          <div className="w-8 h-8 border border-primary/30 rounded flex items-center justify-center">
            <div className="w-3 h-3 bg-primary/40 rounded-sm" />
          </div>
        </div>
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
      {/* Light Mode - Tech Background */}
      <div className="absolute inset-0 overflow-hidden hidden light:block">
        {/* Circuit board patterns - hidden on mobile */}
        <svg className="absolute top-10 left-10 w-24 h-24 md:w-32 md:h-32 text-primary/20 hidden md:block" viewBox="0 0 100 100">
          <circle cx="10" cy="10" r="4" fill="currentColor" />
          <line x1="10" y1="10" x2="50" y2="10" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="10" r="4" fill="currentColor" />
          <line x1="50" y1="10" x2="50" y2="50" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="50" r="6" fill="currentColor" />
          <line x1="50" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="2" />
          <circle cx="90" cy="50" r="4" fill="currentColor" />
        </svg>
        
        {/* Code brackets - hidden on mobile */}
        <div className="absolute top-20 right-20 text-4xl md:text-6xl font-mono text-primary/15 select-none hidden md:block">{"{ }"}</div>
        <div className="absolute bottom-32 left-32 text-2xl md:text-4xl font-mono text-primary/15 select-none hidden md:block">{"</>"}</div>
        <div className="absolute top-1/2 right-1/4 text-xl md:text-3xl font-mono text-primary/10 select-none hidden lg:block">{"<div>"}</div>
        
        {/* Binary dots grid - hidden on mobile */}
        <div className="absolute bottom-20 right-20 grid grid-cols-6 gap-2 hidden md:grid">
          {[...Array(24)].map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full ${i % 3 === 0 ? 'bg-primary/30' : 'bg-primary/10'}`} />
          ))}
        </div>
        
        {/* React logo inspired - hidden on mobile */}
        <svg className="absolute top-1/3 left-16 w-16 h-16 md:w-24 md:h-24 text-primary/15 animate-spin-slow hidden md:block" viewBox="0 0 100 100">
          <ellipse cx="50" cy="50" rx="45" ry="15" fill="none" stroke="currentColor" strokeWidth="2" />
          <ellipse cx="50" cy="50" rx="45" ry="15" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(60 50 50)" />
          <ellipse cx="50" cy="50" rx="45" ry="15" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(120 50 50)" />
          <circle cx="50" cy="50" r="8" fill="currentColor" />
        </svg>
        
        {/* Floating geometric shapes - hidden on mobile */}
        <div className="absolute bottom-1/4 left-1/3 w-12 h-12 md:w-16 md:h-16 border-2 border-primary/20 rotate-45 animate-float hidden md:block" />
        <div className="absolute top-1/4 right-1/3 w-8 h-8 md:w-12 md:h-12 bg-primary/10 rounded-lg rotate-12 hidden md:block" />
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 animate-fade-in text-center lg:text-left order-2 lg:order-1">
            <div className="space-y-3 md:space-y-4">
              <p className="text-primary text-sm md:text-lg font-medium tracking-wide">
                FRONT-END DEVELOPER • VIDEO EDITOR • TECH CREATOR
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-foreground">Creative</span>
                <br />
                <span className="text-primary">Meets Code</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
                Prakhar Tiwari — Blending creativity and code to build beautiful digital experiences.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 md:gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-gold-light transition-all group text-sm md:text-base"
              >
                <a href="#projects" className="flex items-center">
                  View Projects
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 text-sm md:text-base"
              >
                <a href="#contact">Contact Me</a>
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-2 md:pt-4 justify-center lg:justify-start">
              <a
                href="https://github.com/prakhartiwaria221-afk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github size={22} />
              </a>
              <a
                href="https://linkedin.com/in/prakhar-tiwari-8b04a7296"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin size={22} />
              </a>
              <a
                href="https://instagram.com/prakhar6038"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram size={22} />
              </a>
              <a
                href="mailto:prakhartiwaria221@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail size={22} />
              </a>
            </div>
          </div>

          {/* Right Content - Profile Image with Orbiting Icons */}
          <div className="relative animate-slide-up flex items-center justify-center order-1 lg:order-2 mb-8 lg:mb-0">
            <div className="relative">
              {/* Outer decorative ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-gold-light to-primary opacity-20 blur-2xl animate-glow" />
              
              {/* Orbiting tech icons - hidden on small mobile */}
              <div className="absolute inset-0 w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 animate-orbit hidden sm:block">
                {/* React Icon */}
                <div className="absolute -top-4 sm:-top-6 left-1/2 -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-card rounded-full border-2 border-primary/50 flex items-center justify-center shadow-lg">
                  <svg viewBox="0 0 100 100" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary animate-spin-slow">
                    <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="currentColor" strokeWidth="3" />
                    <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="currentColor" strokeWidth="3" transform="rotate(60 50 50)" />
                    <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="currentColor" strokeWidth="3" transform="rotate(120 50 50)" />
                    <circle cx="50" cy="50" r="8" fill="currentColor" />
                  </svg>
                </div>
                
                {/* Java Icon */}
                <div className="absolute top-1/2 -right-4 sm:-right-6 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-card rounded-full border-2 border-primary/50 flex items-center justify-center shadow-lg">
                  <span className="text-primary font-bold text-sm md:text-lg">☕</span>
                </div>
                
                {/* C++ Icon */}
                <div className="absolute -bottom-4 sm:-bottom-6 left-1/2 -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-card rounded-full border-2 border-primary/50 flex items-center justify-center shadow-lg">
                  <span className="text-primary font-bold text-xs sm:text-sm">C++</span>
                </div>
                
                {/* HTML Icon */}
                <div className="absolute top-1/2 -left-4 sm:-left-6 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-card rounded-full border-2 border-primary/50 flex items-center justify-center shadow-lg">
                  <span className="text-primary font-bold text-xs">&lt;/&gt;</span>
                </div>
              </div>
              
              {/* Second orbit layer - hidden on small mobile */}
              <div className="absolute inset-0 w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 animate-orbit-reverse hidden sm:block">
                {/* JS Icon */}
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-card rounded-full border-2 border-primary/40 flex items-center justify-center shadow-lg">
                  <span className="text-primary font-bold text-xs">JS</span>
                </div>
                
                {/* CSS Icon */}
                <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-card rounded-full border-2 border-primary/40 flex items-center justify-center shadow-lg">
                  <span className="text-primary font-bold text-xs">CSS</span>
                </div>
              </div>
              
              {/* Main profile frame */}
              <div 
                className={`relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full p-1.5 sm:p-2 bg-gradient-to-br from-primary to-gold-light cursor-pointer transition-all duration-500 z-10 ${
                  isAnimating ? 'scale-110 rotate-6' : 'hover:scale-105 hover:rotate-2'
                }`}
                onClick={handleProfileClick}
              >
                <div className="w-full h-full rounded-full overflow-hidden border-2 sm:border-4 border-background shadow-2xl">
                  <img
                    src={profileImage}
                    alt="Prakhar Tiwari"
                    className={`w-full h-full object-cover transition-transform duration-500 ${
                      isAnimating ? 'scale-110' : ''
                    }`}
                  />
                </div>
              </div>
              
              {/* Decorative accent rings */}
              <div className={`absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-2 border-primary/30 transition-all duration-500 ${
                isAnimating ? 'scale-125 opacity-100 animate-pulse' : 'animate-pulse'
              }`} />
              <div className={`absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full border-2 border-primary/20 transition-all duration-500 ${
                isAnimating ? 'scale-125 opacity-100' : ''
              }`} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
