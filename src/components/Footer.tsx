import { Github, Linkedin, Instagram, Heart, ArrowUp } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const socialLinks = [
    { icon: Github, href: "https://github.com/prakhartiwaria221-afk", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/prakhar-tiwari-8b04a7296", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com/prakhar6038", label: "Instagram" },
  ];

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="relative border-t border-border bg-card/30">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 sm:py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <a href="#home" className="inline-block mb-4">
                <span className="text-xl font-bold text-foreground">Prakhar<span className="text-primary">.</span></span>
              </a>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Front-End Developer & Video Editor crafting beautiful digital experiences.
              </p>
              <div className="flex gap-2">
                {socialLinks.map((social, index) => (
                  <a key={index} href={social.href} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all" aria-label={social.label}>
                    <social.icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-foreground font-semibold mb-4 text-sm">Quick Links</h4>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-foreground font-semibold mb-4 text-sm">Contact</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li><a href="mailto:prakhartiwaria221@gmail.com" className="hover:text-primary transition-colors">prakhartiwaria221@gmail.com</a></li>
                <li><a href="tel:+919111415672" className="hover:text-primary transition-colors">+91 9111415672</a></li>
                <li>Gwalior, India</li>
              </ul>
            </div>

            <div className="flex flex-col items-start lg:items-end justify-between">
              <button onClick={scrollToTop} className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all text-sm">
                <span className="font-medium">Back to Top</span>
                <ArrowUp size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="py-5 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-muted-foreground">
            <p>© {currentYear} Prakhar Tiwari. All rights reserved.</p>
            <p className="flex items-center gap-1.5">
              Made with <Heart size={12} className="text-primary fill-primary" /> and passion
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
