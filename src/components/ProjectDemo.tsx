import { X, ExternalLink, Play } from "lucide-react";
import { Button } from "./ui/button";

interface ProjectDemoProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    live?: string;
    demoVideo?: string;
  } | null;
}

const ProjectDemo = ({ isOpen, onClose, project }: ProjectDemoProps) => {
  if (!isOpen || !project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-card border border-border rounded-2xl overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-bold text-foreground">{project.title} - Live Demo</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {project.live ? (
            <div className="aspect-video w-full rounded-lg overflow-hidden border border-border">
              <iframe
                src={project.live}
                title={`${project.title} Demo`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : project.demoVideo ? (
            <div className="aspect-video w-full rounded-lg overflow-hidden border border-border bg-muted">
              <video
                src={project.demoVideo}
                controls
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="aspect-video w-full rounded-lg border border-border bg-muted flex flex-col items-center justify-center gap-4">
              <Play size={48} className="text-muted-foreground" />
              <p className="text-muted-foreground text-center">
                Live demo coming soon!
                <br />
                <span className="text-sm">Check back later for an interactive preview.</span>
              </p>
            </div>
          )}

          <p className="mt-4 text-muted-foreground">{project.description}</p>

          {project.live && (
            <div className="mt-4 flex justify-center">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-gold-light">
                <a href={project.live} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} className="mr-2" />
                  Open in New Tab
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDemo;
