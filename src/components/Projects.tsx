import { useState } from "react";
import { ExternalLink, Github, Filter } from "lucide-react";
import { Button } from "./ui/button";
import bookpardImage from "@/assets/bookpard-project.png";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const projects = [
    {
      title: "BookPard",
      description: "A full-stack web application featuring authentication, book selling, admin dashboard, secure payments, and responsive UI. Strengthened my understanding of real-world application architecture and backend integration.",
      tags: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
      image: bookpardImage,
      github: "https://github.com/prakhartiwaria221-afk",
      live: "",
    },
    {
      title: "Library Management System",
      description: "Console-based system using C++ and OOP concepts. Manages books, students, issuing/returning books, fine calculation, and role-based login with file handling for data storage.",
      tags: ["C++", "OOP", "File Handling"],
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=500&fit=crop",
      github: "https://github.com/prakhartiwaria221-afk",
      live: "",
    },
    {
      title: "Portfolio Website",
      description: "Fully responsive personal portfolio with smooth animations and modern design",
      tags: ["React", "Tailwind", "TypeScript"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
      github: "https://github.com/prakhartiwaria221-afk",
      live: "",
    },
    {
      title: "Calculator",
      description: "A fully functional calculator made with HTML, CSS and JavaScript",
      tags: ["HTML", "CSS", "JavaScript"],
      image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=800&h=500&fit=crop",
      github: "https://github.com/prakhartiwaria221-afk",
      live: "",
    },
    {
      title: "Netflix Clone",
      description: "Dynamic web interface inspired by Netflix with responsive design",
      tags: ["HTML", "CSS", "JavaScript"],
      image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&h=500&fit=crop",
      github: "https://github.com/prakhartiwaria221-afk",
      live: "",
    },
    {
      title: "Restaurant Order System",
      description: "Java-based billing and order management system with inventory tracking",
      tags: ["Java", "OOP", "Database"],
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop",
      github: "https://github.com/prakhartiwaria221-afk",
      live: "",
    },
    {
      title: "C++ Data Structures",
      description: "Implementation of algorithms and linked data structures",
      tags: ["C++", "Algorithms", "DSA"],
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=500&fit=crop",
      github: "https://github.com/prakhartiwaria221-afk",
      live: "",
    },
  ];

  // Get all unique tags
  const allTags = ["All", ...new Set(projects.flatMap((p) => p.tags))];

  // Filter projects based on active filter
  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(activeFilter));

  return (
    <section id="projects" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Featured</span>{" "}
            <span className="text-primary">Projects</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-primary mx-auto mb-4" />
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-2">
            A showcase of my latest work blending technical expertise with creative vision
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 animate-fade-in">
          <div className="flex items-center gap-2 mr-2 text-muted-foreground">
            <Filter size={18} />
            <span className="text-sm hidden sm:inline">Filter:</span>
          </div>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full border transition-all duration-300 ${
                activeFilter === tag
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:border-primary/50"
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
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Project Image */}
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60" />
              </div>

              {/* Project Info */}
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveFilter(tag)}
                      className={`text-xs px-3 py-1 rounded-full border transition-all cursor-pointer ${
                        activeFilter === tag
                          ? "bg-primary/20 text-primary border-primary/50"
                          : "bg-secondary text-foreground border-border hover:border-primary/30"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {project.live && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-primary text-primary hover:bg-primary/10"
                      asChild
                    >
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} className="mr-2" />
                        View
                      </a>
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className={`border-border hover:border-primary/50 hover:text-primary ${!project.live ? 'flex-1' : ''}`}
                    asChild
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github size={16} className={project.live ? '' : 'mr-2'} />
                      {!project.live && 'View on GitHub'}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
