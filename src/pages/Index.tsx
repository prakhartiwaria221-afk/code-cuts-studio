import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MagicalParticles from "@/components/MagicalParticles";
import CustomCursor from "@/components/CustomCursor";
import SortingQuiz from "@/components/SortingQuiz";

const Index = () => {
  const [sorted, setSorted] = useState(false);
  const [house, setHouse] = useState<string | null>(null);

  const handleSorted = (h: string) => {
    setHouse(h);
    setSorted(true);
  };

  if (!sorted) {
    return <SortingQuiz onComplete={handleSorted} />;
  }

  return (
    <div className="min-h-screen bg-background relative">
      <CustomCursor />
      <MagicalParticles />
      <Navigation />
      <Hero house={house} />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
