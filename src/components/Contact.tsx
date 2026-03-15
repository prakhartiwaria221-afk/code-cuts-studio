import { useState } from "react";
import { Loader2, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import profileImage from "@/assets/profile-prakhar.jpg";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

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
    <section id="contact" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-20 left-5 w-[140px] h-[140px] rounded-full border-[22px] border-muted/15 animate-blob" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Form */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-black mb-2">
                Good design is<br />
                about process,<br />
                not product.
              </h2>
              
              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-transparent border-0 border-b-2 border-border rounded-none px-0 h-12 text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:border-foreground"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-transparent border-0 border-b-2 border-border rounded-none px-0 h-12 text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:border-foreground"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Textarea
                    id="message"
                    placeholder="Describe your work..."
                    rows={3}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="bg-transparent border-0 border-b-2 border-border rounded-none px-0 text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:border-foreground resize-none"
                    disabled={isSubmitting}
                  />
                </div>
                <Button
                  type="submit"
                  variant="outline"
                  className="rounded-full border-2 border-border hover:border-foreground/50 px-8 mt-4 group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending...</>
                  ) : (
                    <>
                      <ArrowRight className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      Send
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Right - Arch Profile */}
            <div className="hidden lg:flex justify-center">
              <div className="relative w-72">
                <div
                  className="w-full h-[380px]"
                  style={{
                    borderRadius: '150px 150px 0 0',
                    overflow: 'hidden',
                    background: 'linear-gradient(180deg, hsl(40 30% 95%), hsl(0 0% 100%))',
                  }}
                >
                  <img
                    src={profileImage}
                    alt="Prakhar Tiwari"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* Decorative circle */}
                <div className="absolute -top-4 -right-4 w-[60px] h-[60px] rounded-full border-[10px] border-muted/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
