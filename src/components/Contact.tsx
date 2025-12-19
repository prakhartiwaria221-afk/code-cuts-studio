import { useState } from "react";
import { Mail, Phone, Github, Linkedin, Instagram, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "prakhartiwaria221@gmail.com",
      href: "mailto:prakhartiwaria221@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 9111415672",
      href: "tel:+919111415672",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/prakhartiwaria221-afk",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/prakhar-tiwari-8b04a7296",
    },
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://instagram.com/prakhar6038",
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: "Failed to send",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-darker-surface relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Get In</span> <span className="text-primary">Touch</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-primary mx-auto mb-4" />
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-2">
            Let's collaborate and create something amazing together
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="animate-slide-up">
            <div className="space-y-6 sm:space-y-8">
              {/* Contact Methods */}
              <div className="space-y-4 sm:space-y-6">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-all duration-300 group"
                  >
                    <div className="p-2 sm:p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors flex-shrink-0">
                      <item.icon className="text-primary" size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">{item.label}</p>
                      <p className="text-foreground font-medium group-hover:text-primary transition-colors truncate text-sm sm:text-base">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">Connect With Me</h3>
                <div className="flex gap-3 sm:gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 sm:p-3 bg-secondary rounded-lg hover:bg-primary/20 transition-all duration-300 group"
                      aria-label={social.label}
                    >
                      <social.icon className="text-muted-foreground group-hover:text-primary transition-colors" size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-slide-up">
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-5 sm:p-8 backdrop-blur-sm space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-secondary border-border focus:border-primary"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-secondary border-border focus:border-primary"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project..."
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="bg-secondary border-border focus:border-primary resize-none"
                  disabled={isSubmitting}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-gold-light transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
