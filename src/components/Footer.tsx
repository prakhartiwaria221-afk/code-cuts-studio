import { Github, Linkedin, Instagram } from "lucide-react";
import dobbyImage from "@/assets/dobby.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/prakhartiwaria221-afk", label: "GH" },
    { icon: Linkedin, href: "https://linkedin.com/in/prakhar-tiwari-8b04a7296", label: "IN" },
    { icon: Instagram, href: "https://instagram.com/prakhar6038", label: "IG" },
  ];

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
        <div className="py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 pl-14 sm:pl-28">
            <span className="text-primary text-lg">⚡</span>
            <p className="text-sm text-muted-foreground" style={{ fontFamily: "'Crimson Text', serif" }}>
              © {currentYear} Prakhar Tiwari. Mischief Managed.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground mr-2" style={{ fontFamily: "'Crimson Text', serif" }}>Follow</span>
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all text-xs font-bold"
                aria-label={social.label}
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
