import { useState } from "react";
import { Github, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import bookpardImage from "@/assets/bookpard-project.png";
import mindbloomImage from "@/assets/mindbloom-project.png";
import coordinetImage from "@/assets/coordinet-project.png";

const Projects = () => {
  const projects = [
    {
      title: "MindBloom",
      description: "AI-based adaptive learning platform with gamified learning, voice-guided systems, emotion-aware apps.",
      tags: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
      image: mindbloomImage,
      github: "https://github.com/prakhartiwaria221-afk",
    },
    {
      title: "CoordiNet",
      description: "Emergency coordination platform connecting police, hospitals, and disaster authorities with citizens.",
      tags: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
      image: coordinetImage,
      github: "https://github.com/prakhartiwaria221-afk",
    },
    {
      title: "BookPard",
      description: "A full-stack web application featuring authentication, book selling, admin dashboard, secure payments.",
      tags: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
      image: bookpardImage,
      github: "https://github.com/prakhartiwaria221-afk",
    },
    {
      title: "Library Management",
      description: "Console-based system using C++ and OOP concepts with file handling for data storage.",
      tags: ["C++", "OOP"],
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=500&fit=crop",
      github: "https://github.com/prakhartiwaria221-afk",
    },
  ];

  return (
    <section id="projects" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute bottom-10 right-5 w-[120px] h-[120px] rounded-full border-[20px] border-muted/15 animate-float" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-14">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black mb-2">
              Some of my Project with<br />
              Amazing Experience
            </h2>
          </div>
          <div className="hidden sm:block max-w-xs text-right">
            <p className="text-sm text-muted-foreground italic">
              "If you think good design is expensive, you should look at the cost of bad design."
            </p>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group relative rounded-2xl overflow-hidden border-2 border-border hover:border-foreground/30 transition-all duration-500"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              </div>

              <div className="p-4">
                <h3 className="text-sm font-bold text-foreground mb-1 group-hover:text-teal-light transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                  {project.description}
                </p>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github size={12} />
                  View Code
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* See More */}
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-foreground">RECENT WORK</span>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-2 border-border hover:border-foreground/30 px-6"
            asChild
          >
            <a href="https://github.com/prakhartiwaria221-afk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              See More
              <ArrowRight size={14} />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
