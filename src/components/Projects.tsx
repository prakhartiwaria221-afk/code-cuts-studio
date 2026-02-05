import { useState } from "react";
import { ExternalLink, Github, Filter, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import bookpardImage from "@/assets/bookpard-project.png";
import mindbloomImage from "@/assets/mindbloom-project.png";
import coordinetImage from "@/assets/coordinet-project.png";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const projects = [
    {
      title: "MindBloom",
      description: "AI-based adaptive learning platform with gamified learning, voice-guided systems, emotion-aware apps, routine-based digital assistants, micro-learning modules, and sensory-friendly design. Goal: make learning engaging, personalized, and stress-free.",
      tags: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
      image: mindbloomImage,
      github: "https://github.com/prakhartiwaria221-afk",
      live: "https://mindbloom-demo.lovable.app",
      featured: true,
    },
    {
      title: "CoordiNet - When Every Second Counts",
      description: "Emergency coordination platform connecting police, hospitals, and disaster authorities with citizens. Features role-based dashboards, live emergency map, AI triage system, evacuation route planner, resource management, and predictive alerts.",
      tags: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
      image: coordinetImage,
      github: "https://github.com/prakhartiwaria221-afk",
      live: "https://coordinet-demo.lovable.app",
      featured: true,
    },
    {
      title: "BookPard",
      description: "A full-stack web application featuring authentication, book selling, admin dashboard, secure payments, and responsive UI.",
      tags: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
      image: bookpardImage,
      github: "https://github.com/prakhartiwaria221-afk",
      live: "https://bookpard-demo.lovable.app",
      featured: true,
    },
    {
      title: "Library Management System",
      description: "Console-based system using C++ and OOP concepts with file handling for data storage.",
      tags: ["C++", "OOP", "File Handling"],
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=500&fit=crop",
      github: "https://github.com/prakhartiwaria221-afk",
      live: "https://github.com/prakhartiwaria221-afk",
    },
    {
      title: "Portfolio Website",
      description: "Fully responsive personal portfolio with smooth animations and modern design.",
      tags: ["React", "Tailwind", "TypeScript"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
      github: "https://github.com/prakhartiwaria221-afk",
      live: "https://prakhar-portfolio.lovable.app",
    },
    {
      title: "Calculator",
      description: "A fully functional calculator made with HTML, CSS and JavaScript.",
      tags: ["HTML", "CSS", "JavaScript"],
      image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=800&h=500&fit=crop",
      github: "https://github.com/prakhartiwaria221-afk",
      live: "https://github.com/prakhartiwaria221-afk",
    },
    {
      title: "Netflix Clone",
      description: "Dynamic web interface inspired by Netflix with responsive design.",
      tags: ["HTML", "CSS", "JavaScript"],
      image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&h=500&fit=crop",
      github: "https://github.com/prakhartiwaria221-afk",
      live: "https://github.com/prakhartiwaria221-afk",
    },
    {
      title: "Restaurant Order System",
      description: "Java-based billing and order management system with inventory tracking.",
      tags: ["Java", "OOP", "Database"],
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop",
      github: "https://github.com/prakhartiwaria221-afk",
      live: "https://github.com/prakhartiwaria221-afk",
    },
  ];

  const allTags = ["All", ...new Set(projects.flatMap((p) => p.tags))];
  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.tags.includes(activeFilter));

  return (
    <section id="projects" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-cyan/5 rounded-full blur-[100px]" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            My Work
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Featured</span>{" "}
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A showcase of my latest work blending technical expertise with creative vision
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14 animate-fade-in">
          <div className="flex items-center gap-2 mr-2 text-muted-foreground">
            <Filter size={18} />
            <span className="text-sm hidden sm:inline">Filter:</span>
          </div>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-4 py-2 text-sm rounded-full font-medium transition-all duration-300 ${
                activeFilter === tag
                  ? "bg-gradient-to-r from-primary to-cyan text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-card text-muted-foreground border border-border hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {filteredProjects.map((project, index) => (
            <div
              key={project.title}
              className={`group relative rounded-3xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-500 hover-lift animate-slide-up ${
                project.featured ? 'ring-1 ring-primary/20' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium">
                  <Sparkles size={12} />
                  Featured
                </div>
              )}
              
              {/* Project Image */}
              <div className="relative h-48 sm:h-52 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg hover:scale-110 transition-transform"
                    title="View Live Demo"
                  >
                    <ExternalLink size={20} />
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-foreground shadow-lg hover:scale-110 hover:border-primary/50 transition-all"
                    title="View Source Code"
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveFilter(tag)}
                      className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
                        activeFilter === tag
                          ? "bg-primary/20 text-primary border border-primary/30"
                          : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-12 animate-fade-in">
          <Button
            variant="outline"
            size="lg"
            className="border-border hover:border-primary/50 hover:bg-primary/5 group"
            asChild
          >
            <a href="https://github.com/prakhartiwaria221-afk" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2" size={18} />
              View More on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
