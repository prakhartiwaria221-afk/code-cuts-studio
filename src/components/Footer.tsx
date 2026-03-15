import { Github, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/prakhartiwaria221-afk", label: "GH" },
    { icon: Linkedin, href: "https://linkedin.com/in/prakhar-tiwari-8b04a7296", label: "IN" },
    { icon: Instagram, href: "https://instagram.com/prakhar6038", label: "IG" },
  ];

  return (
    <footer className="relative border-t border-border bg-primary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            Copyright © {currentYear} Prakhar. All Rights Reserved.
          </p>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground mr-2">Follow Me on</span>
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-all text-xs font-bold"
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
