import { Code2, Palette, Zap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SparkleCanvas from "./SparkleCanvas";

const Skills = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation();
  const { ref: toolsRef, isVisible: toolsVisible } = useScrollAnimation();

  const techSkills = [
    { name: "C++", level: 60 },
    { name: "Java", level: 50 },
    { name: "React", level: 50 },
    { name: "Front-End Development", level: 80 },
    { name: "Web Design", level: 60 },
  ];

  const creativeSkills = [
    { name: "Video Editing", level: 70 },
    { name: "Graphic Design", level: 50 },
  ];

  const tools = [
    { name: "React", icon: "⚛️" },
    { name: "TypeScript", icon: "📘" },
    { name: "Tailwind", icon: "🎨" },
    { name: "Git", icon: "🔀" },
    { name: "VS Code", icon: "💻" },
    { name: "Figma", icon: "🎯" },
  ];

  return (
    <section id="skills" className="py-24 sm:py-32 relative overflow-hidden">
      <SparkleCanvas count={10} color="gold" />
      <div className="absolute top-10 left-0 w-36 h-36 rounded-full border border-primary/10 animate-float-gentle" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={headerRef}
          className={`mb-16 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'Crimson Text', serif" }}>My Skills</p>
          <h2 className="text-4xl sm:text-5xl font-black mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
            Skills & <span className="text-shimmer">Expertise</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl" style={{ fontFamily: "'Crimson Text', serif" }}>
            A blend of technical prowess and creative excellence
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid lg:grid-cols-2 gap-6 max-w-6xl mb-16"
        >
          {/* Tech Skills */}
          <div className={`p-6 sm:p-8 rounded-3xl card-parchment magic-border transition-all duration-1000 ${cardsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Code2 className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Cinzel', serif" }}>Technical Skills</h3>
                <p className="text-sm text-muted-foreground">Languages & frameworks</p>
              </div>
            </div>

            <div className="space-y-5">
              {techSkills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-foreground font-medium text-sm">{skill.name}</span>
                    <span className="text-muted-foreground font-medium text-sm">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: cardsVisible ? `${skill.level}%` : '0%',
                        background: 'linear-gradient(90deg, hsl(43 72% 55%), hsl(43 80% 70%))',
                        transitionDelay: `${index * 100 + 300}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Creative Skills */}
          <div className={`p-6 sm:p-8 rounded-3xl card-parchment magic-border transition-all duration-1000 delay-200 ${cardsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <Palette className="text-secondary" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Cinzel', serif" }}>Creative Skills</h3>
                <p className="text-sm text-muted-foreground">Design & editing</p>
              </div>
            </div>

            <div className="space-y-5 mb-8">
              {creativeSkills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-foreground font-medium text-sm">{skill.name}</span>
                    <span className="text-muted-foreground font-medium text-sm">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: cardsVisible ? `${skill.level}%` : '0%',
                        background: 'linear-gradient(90deg, hsl(0 55% 40%), hsl(0 45% 55%))',
                        transitionDelay: `${index * 100 + 500}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-2xl border border-border/50 bg-muted/30">
              <div className="flex items-start gap-3">
                <Zap className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontFamily: "'Crimson Text', serif" }}>
                  Combining technical precision with creative vision to deliver
                  <span className="text-foreground font-medium"> functionally robust</span> and
                  <span className="text-foreground font-medium"> visually stunning</span> projects.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tools */}
        <div ref={toolsRef} className={`transition-all duration-1000 ${toolsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-8">
            <h3 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: "'Cinzel', serif" }}>Tools & Technologies</h3>
            <p className="text-muted-foreground text-sm">Technologies I work with daily</p>
          </div>

          <div className="flex flex-wrap gap-3 max-w-3xl">
            {tools.map((tool, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full card-parchment magic-border transition-all duration-500 text-sm ${
                  toolsVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <span className="text-lg">{tool.icon}</span>
                <span className="text-foreground font-medium">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
