import { ExternalLink, Github } from "lucide-react";
import { Button } from "./ui/button";

const Projects = () => {
  const projects = [
    {
      title: "Portfolio Website",
      description: "Fully responsive personal portfolio with smooth animations and modern design",
      tags: ["React", "Tailwind", "TypeScript"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
      github: "https://github.com/prakhartiwaria221-afk",
      live: "",
    },
    {
      title: "Java Calculator",
      description: "GUI-based calculator with advanced operations and calculation history",
      tags: ["Java", "Swing", "GUI"],
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
    {
      title: "Social Media Graphics",
      description: "Creative visuals, animations, and brand content for digital platforms",
      tags: ["Design", "After Effects", "Photoshop"],
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=500&fit=crop",
      github: "https://github.com/prakhartiwaria221-afk",
      live: "",
    },
  ];

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-foreground">Featured</span> <span className="text-primary">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-4" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A showcase of my latest work blending technical expertise with creative vision
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60" />
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 bg-secondary text-foreground rounded-full border border-border"
                    >
                      {tag}
                    </span>
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
