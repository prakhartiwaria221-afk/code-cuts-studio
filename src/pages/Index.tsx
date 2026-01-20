import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import GitHubStats from "@/components/GitHubStats";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ThreeBackground from "@/components/ThreeBackground";
import { ScrollProgress } from "@/components/ScrollAnimations";
import { ParallaxShapes } from "@/components/ParallaxSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Scroll Progress Indicator */}
      <ScrollProgress />
      
      {/* 3D Background */}
      <ThreeBackground />
      
      {/* Parallax Decorative Shapes */}
      <ParallaxShapes />
      
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <GitHubStats />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
