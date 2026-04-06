import { Github, Linkedin, Instagram, Heart, ArrowUp } from "lucide-react";
import dobbyImage from "@/assets/dobby.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/prakhartiwaria221-afk", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/prakhar-tiwari-8b04a7296", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com/prakhar6038", label: "Instagram" },
  ];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-border/30 bg-card/50 overflow-hidden">
      {/* Dobby character */}
      <img
        src={dobbyImage}
        alt="Dobby"
        loading="lazy"
        width={512}
        height={512}
        className="absolute -left-4 sm:left-4 bottom-0 w-16 h-16 sm:w-24 sm:h-24 opacity-60 hover:opacity-100 transition-opacity duration-300 animate-float-gentle pointer-events-none sm:pointer-events-auto"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="py-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 pl-14 sm:pl-28">
            <span className="text-primary text-lg">⚡</span>
            <div>
              <p className="text-sm font-medium text-foreground" style={{ fontFamily: "'Cinzel', serif" }}>
                Prakhar Tiwari
              </p>
              <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Crimson Text', serif" }}>
                Front-End Developer & Creative
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-border/50 bg-card/30 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:scale-110 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/20 hover:scale-110 transition-all duration-300"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-border/20 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-xs text-muted-foreground flex items-center gap-1" style={{ fontFamily: "'Crimson Text', serif" }}>
              © {currentYear} Made with <Heart size={12} className="text-secondary" /> Mischief Managed.
            </p>
            <div className="flex gap-4">
              {["Home", "About", "Skills", "Projects", "Contact"].map(link => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
                  style={{ fontFamily: "'Crimson Text', serif" }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
