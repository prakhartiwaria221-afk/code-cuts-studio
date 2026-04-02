import { useState } from "react";
import { Loader2, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SparkleCanvas from "./SparkleCanvas";
import profileImage from "@/assets/profile-prakhar.jpg";
import hedwigImage from "@/assets/hedwig.png";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const { ref, isVisible } = useScrollAnimation();

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
      toast({ title: "Owl sent! 🦉", description: "Your message has been delivered. I'll respond soon!" });
      setFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({ title: "Failed to send", description: error.message || "Something went wrong.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative overflow-hidden">
      <SparkleCanvas count={10} color="gold" />
      <div className="absolute top-20 left-5 w-32 h-32 rounded-full border border-primary/10 animate-float-blob" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className="max-w-6xl mx-auto">
          <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div>
              <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'Crimson Text', serif" }}>Contact</p>
              <h2 className="text-3xl sm:text-4xl font-black mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                Send an <span className="text-shimmer">Owl</span>
              </h2>
              <p className="text-muted-foreground mb-8" style={{ fontFamily: "'Crimson Text', serif" }}>
                Have a project in mind? Let's create something magical together.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  id="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-transparent border-0 border-b border-border rounded-none px-0 h-12 text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:border-primary"
                  disabled={isSubmitting}
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-transparent border-0 border-b border-border rounded-none px-0 h-12 text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:border-primary"
                  disabled={isSubmitting}
                />
                <Textarea
                  id="message"
                  placeholder="Describe your project..."
                  rows={3}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="bg-transparent border-0 border-b border-border rounded-none px-0 text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:border-primary resize-none"
                  disabled={isSubmitting}
                />
                <Button
                  type="submit"
                  className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 mt-4 group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending...</>
                  ) : (
                    <>
                      <ArrowRight className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      Send Owl
                    </>
                  )}
                </Button>
              </form>
            </div>

            <div className={`hidden lg:flex justify-center relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative w-72">
                <div
                  className="w-full h-[380px] rounded-t-[150px] overflow-hidden animate-glow-pulse"
                  style={{
                    background: 'linear-gradient(180deg, hsl(43 40% 30%), hsl(230 25% 12%))',
                  }}
                >
                  <img
                    src={profileImage}
                    alt="Prakhar Tiwari"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-14 h-14 rounded-full border border-primary/20" />
              </div>

              {/* Hedwig */}
              <img
                src={hedwigImage}
                alt="Hedwig"
                loading="lazy"
                width={120}
                height={120}
                className="absolute -top-8 -right-8 w-24 animate-float-gentle drop-shadow-[0_0_15px_hsl(0,0%,100%,0.2)]"
                style={{ animationDelay: '1s' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
