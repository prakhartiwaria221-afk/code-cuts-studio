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
      {/* Dark Mode - Video Editing Background */}
      <div className="absolute inset-0 overflow-hidden dark:block hidden light:hidden">
        {/* Film strip elements */}
        <div className="absolute top-10 left-10 w-16 h-64 border-2 border-primary/20 rounded-sm">
          <div className="absolute top-2 left-1 w-3 h-3 bg-primary/30 rounded-sm" />
          <div className="absolute top-2 right-1 w-3 h-3 bg-primary/30 rounded-sm" />
          <div className="absolute top-10 left-1 w-3 h-3 bg-primary/30 rounded-sm" />
          <div className="absolute top-10 right-1 w-3 h-3 bg-primary/30 rounded-sm" />
          <div className="absolute top-18 left-1 w-3 h-3 bg-primary/30 rounded-sm" />
          <div className="absolute top-18 right-1 w-3 h-3 bg-primary/30 rounded-sm" />
        </div>
        
        {/* Timeline bar */}
        <div className="absolute bottom-20 left-1/4 right-1/4 h-2 bg-muted/30 rounded-full">
          <div className="absolute left-0 top-0 w-1/3 h-full bg-primary/40 rounded-full" />
          <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-lg" />
        </div>
        
        {/* Play button */}
        <div className="absolute top-1/3 right-20 w-20 h-20 border-2 border-primary/30 rounded-full flex items-center justify-center">
          <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-primary/40 border-b-8 border-b-transparent ml-1" />
        </div>
        
        {/* Video frames */}
        <div className="absolute bottom-1/3 left-20 flex gap-2">
          <div className="w-16 h-10 bg-muted/20 rounded border border-primary/20" />
          <div className="w-16 h-10 bg-muted/30 rounded border border-primary/30" />
          <div className="w-16 h-10 bg-muted/20 rounded border border-primary/20" />
        </div>
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
      {/* Light Mode - Tech Background */}
      <div className="absolute inset-0 overflow-hidden hidden light:block">
        {/* Circuit board patterns */}
        <svg className="absolute top-10 left-10 w-32 h-32 text-primary/20" viewBox="0 0 100 100">
          <circle cx="10" cy="10" r="4" fill="currentColor" />
          <line x1="10" y1="10" x2="50" y2="10" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="10" r="4" fill="currentColor" />
          <line x1="50" y1="10" x2="50" y2="50" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="50" r="6" fill="currentColor" />
          <line x1="50" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="2" />
          <circle cx="90" cy="50" r="4" fill="currentColor" />
        </svg>
        
        {/* Code brackets */}
        <div className="absolute top-20 right-20 text-6xl font-mono text-primary/15 select-none">{"{ }"}</div>
        <div className="absolute bottom-32 left-32 text-4xl font-mono text-primary/15 select-none">{"</>"}</div>
        <div className="absolute top-1/2 right-1/4 text-3xl font-mono text-primary/10 select-none">{"<div>"}</div>
        
        {/* Binary dots grid */}
        <div className="absolute bottom-20 right-20 grid grid-cols-6 gap-2">
          {[...Array(24)].map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full ${i % 3 === 0 ? 'bg-primary/30' : 'bg-primary/10'}`} />
          ))}
        </div>
        
        {/* React logo inspired */}
        <svg className="absolute top-1/3 left-16 w-24 h-24 text-primary/15 animate-spin-slow" viewBox="0 0 100 100">
          <ellipse cx="50" cy="50" rx="45" ry="15" fill="none" stroke="currentColor" strokeWidth="2" />
          <ellipse cx="50" cy="50" rx="45" ry="15" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(60 50 50)" />
          <ellipse cx="50" cy="50" rx="45" ry="15" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(120 50 50)" />
          <circle cx="50" cy="50" r="8" fill="currentColor" />
        </svg>
        
        {/* Floating geometric shapes */}
        <div className="absolute bottom-1/4 left-1/3 w-16 h-16 border-2 border-primary/20 rotate-45 animate-float" />
        <div className="absolute top-1/4 right-1/3 w-12 h-12 bg-primary/10 rounded-lg rotate-12" />
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <p className="text-primary text-lg font-medium tracking-wide">
                FRONT-END DEVELOPER • VIDEO EDITOR • TECH CREATOR
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-foreground">Creative</span>
                <br />
                <span className="text-primary">Meets Code</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl">
                Prakhar Tiwari — Blending creativity and code to build beautiful digital experiences.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-gold-light transition-all group"
              >
                <a href="#projects" className="flex items-center">
                  View Projects
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                <a href="#contact">Contact Me</a>
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4">
              <a
                href="https://github.com/prakhartiwaria221-afk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com/in/prakhar-tiwari-8b04a7296"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://instagram.com/prakhar6038"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="mailto:prakhartiwaria221@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="relative animate-slide-up flex items-center justify-center">
            <div className="relative">
              {/* Outer decorative ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-gold-light to-primary opacity-20 blur-2xl animate-glow" />
              
              {/* Main profile frame */}
              <div 
                className={`relative w-80 h-80 md:w-96 md:h-96 rounded-full p-2 bg-gradient-to-br from-primary to-gold-light cursor-pointer transition-all duration-500 ${
                  isAnimating ? 'scale-110 rotate-6' : 'hover:scale-105 hover:rotate-2'
                }`}
                onClick={handleProfileClick}
              >
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-background shadow-2xl">
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
              <div className={`absolute -top-4 -right-4 w-24 h-24 rounded-full border-2 border-primary/30 transition-all duration-500 ${
                isAnimating ? 'scale-125 opacity-100 animate-pulse' : 'animate-pulse'
              }`} />
              <div className={`absolute -bottom-4 -left-4 w-32 h-32 rounded-full border-2 border-primary/20 transition-all duration-500 ${
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
