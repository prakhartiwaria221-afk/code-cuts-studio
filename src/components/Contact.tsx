import { useState } from "react";
import { Mail, Phone, Github, Linkedin, Instagram, Loader2, Send, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const contactInfo = [
    { icon: Mail, label: "Email", value: "prakhartiwaria221@gmail.com", href: "mailto:prakhartiwaria221@gmail.com" },
    { icon: Phone, label: "Phone", value: "+91 9111415672", href: "tel:+919111415672" },
    { icon: MapPin, label: "Location", value: "Gwalior, India", href: "#" },
  ];

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com/prakhartiwaria221-afk" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/prakhar-tiwari-8b04a7296" },
    { icon: Instagram, label: "Instagram", href: "https://instagram.com/prakhar6038" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({ title: "Missing fields", description: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", { body: formData });
      if (error) throw error;
      toast({ title: "Message sent! 🎉", description: "Thank you for reaching out. I'll get back to you soon!" });
      setFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({ title: "Failed to send", description: error.message || "Something went wrong.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-card/30 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">Contact Me</p>
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a project in mind? Let's collaborate and create something amazing
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            {contactInfo.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="text-primary" size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</p>
                  <p className="text-foreground font-medium group-hover:text-primary transition-colors text-sm truncate">
                    {item.value}
                  </p>
                </div>
              </a>
            ))}

            <div className="p-5 rounded-2xl bg-card border border-border">
              <h3 className="text-base font-bold text-foreground mb-3">Follow Me</h3>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center hover:bg-primary/10 transition-all"
                    aria-label={social.label}
                  >
                    <social.icon className="text-muted-foreground hover:text-primary transition-colors" size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-card border border-border space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Name</label>
                  <Input id="name" placeholder="John Doe" value={formData.name} onChange={handleInputChange} className="bg-muted border-border focus:border-primary h-11 rounded-xl" disabled={isSubmitting} />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <Input id="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleInputChange} className="bg-muted border-border focus:border-primary h-11 rounded-xl" disabled={isSubmitting} />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Message</label>
                <Textarea id="message" placeholder="Tell me about your project..." rows={5} value={formData.message} onChange={handleInputChange} className="bg-muted border-border focus:border-primary resize-none rounded-xl" disabled={isSubmitting} />
              </div>
              <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-xl" disabled={isSubmitting}>
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending...</> : <><Send className="mr-2 h-4 w-4" />Send Message</>}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
