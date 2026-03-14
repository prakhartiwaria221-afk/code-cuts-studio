import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowRight, Github, Linkedin, Instagram, Download } from "lucide-react";
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
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 left-1/3 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-fade-in text-center lg:text-left order-2 lg:order-1">
            {/* Greeting */}
            <div className="space-y-2">
              <p className="text-muted-foreground text-lg tracking-wide uppercase">Hello, I'm</p>
              
              {/* Name */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.95] tracking-tight">
                <span className="text-foreground">Prakhar</span>
                <br />
                <span className="gradient-text">Tiwari</span>
              </h1>
            </div>

            {/* Typing Role */}
            <div className="h-8">
              <span className="text-primary text-lg md:text-xl font-semibold tracking-wide">
                {currentText}
                <span className="animate-pulse text-primary">|</span>
              </span>
            </div>
            
            {/* Description */}
            <p className="text-muted-foreground text-base md:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Blending creativity and code to craft beautiful, functional digital experiences that leave a lasting impression.
            </p>

            {/* Social Pill Badges */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {[
                { icon: Github, label: "GitHub", href: "https://github.com/prakhartiwaria221-afk" },
                { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/prakhar-tiwari-8b04a7296" },
                { icon: Instagram, label: "Instagram", href: "https://instagram.com/prakhar6038" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 text-sm font-medium"
                >
                  <social.icon size={16} />
                  {social.label}
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 group px-8 rounded-full h-12"
                asChild
              >
                <a href="#projects" className="flex items-center gap-2">
                  View Projects
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:border-primary/50 hover:bg-primary/5 group px-8 rounded-full h-12"
                asChild
              >
                <a href="#contact" className="flex items-center gap-2">
                  Hire Me
                </a>
              </Button>
            </div>
          </div>

          {/* Right Content - Large Profile Photo */}
          <div className="relative flex items-center justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-md lg:max-w-lg mx-auto">
              {/* Glow Effect Behind */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-cyan/20 to-primary/10 rounded-3xl blur-3xl scale-110 animate-pulse" />
              
              {/* Profile Image Container */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-border/50 shadow-2xl shadow-primary/10">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
                <img
                  src={profileImage}
                  alt="Prakhar Tiwari"
                  className="w-full h-[400px] sm:h-[480px] lg:h-[550px] object-cover object-top"
                />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-card/80 backdrop-blur-xl border border-border/50">
                    <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                    <span className="text-sm font-medium text-foreground">Available for opportunities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 animate-fade-in">
        <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-9 rounded-full border-2 border-border/60 flex justify-center pt-2">
          <div className="w-1 h-2.5 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
