import { useState, useCallback } from "react";
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
import SpellEffects from "@/components/SpellEffects";
import SectionDivider from "@/components/SectionDivider";
import { ParallaxShapes } from "@/components/ParallaxSection";
import LoadingScreen from "@/components/LoadingScreen";
import GradientMesh from "@/components/GradientMesh";

const Index = () => {
  const [sorted, setSorted] = useState(false);
  const [house, setHouse] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const handleSorted = (h: string) => {
    setHouse(h);
    setSorted(true);
  };

  const handleLoadingComplete = useCallback(() => setLoading(false), []);

  if (!sorted) {
    return <SortingQuiz onComplete={handleSorted} />;
  }

  return (
    <div className="min-h-screen bg-background relative">
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <GradientMesh />
      <CustomCursor />
      <MagicalParticles />
      <SpellEffects />
      <ParallaxShapes />
      <Navigation />
      <Hero house={house} />
      <SectionDivider variant="ornate" />
      <About />
      <SectionDivider variant="ornate" />
      <Skills />
      <SectionDivider variant="ornate" />
      <Projects />
      <SectionDivider variant="ornate" />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
