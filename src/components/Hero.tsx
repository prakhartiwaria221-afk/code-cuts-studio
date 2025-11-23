import { Button } from "./ui/button";
import { ArrowRight, Github, Linkedin, Mail, Instagram } from "lucide-react";
import heroImage from "@/assets/hero-profile.jpg";

const Hero = () => {
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

          {/* Right Content - Image */}
          <div className="relative animate-slide-up">
            <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
              <img
                src={heroImage}
                alt="Prakhar Tiwari"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
            {/* Decorative element */}
            <div className="absolute -z-10 top-8 -right-8 w-full h-full border-2 border-primary/30 rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
