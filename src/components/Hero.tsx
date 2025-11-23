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
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
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
