import { Code2, Palette, Zap } from "lucide-react";

const Skills = () => {
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
    <section id="skills" className="py-24 sm:py-32 bg-card/30 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">My Skills</p>
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            <span className="gradient-text">Skills</span> & Expertise
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A blend of technical prowess and creative excellence
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto mb-16">
          {/* Tech Skills */}
          <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border hover:border-primary/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Code2 className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Technical Skills</h3>
                <p className="text-sm text-muted-foreground">Languages & frameworks</p>
              </div>
            </div>
            
            <div className="space-y-5">
              {techSkills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-foreground font-medium text-sm">{skill.name}</span>
                    <span className="text-primary font-semibold text-sm">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-cyan rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Creative Skills */}
          <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border hover:border-primary/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Palette className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Creative Skills</h3>
                <p className="text-sm text-muted-foreground">Design & editing</p>
              </div>
            </div>
            
            <div className="space-y-5 mb-8">
              {creativeSkills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-foreground font-medium text-sm">{skill.name}</span>
                    <span className="text-primary font-semibold text-sm">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-cyan rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 bg-primary/5 rounded-2xl border border-primary/10">
              <div className="flex items-start gap-3">
                <Zap className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Combining technical precision with creative vision to deliver
                  <span className="text-foreground font-medium"> functionally robust</span> and
                  <span className="text-foreground font-medium"> visually stunning</span> projects.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tools */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-foreground mb-2">Tools & Technologies</h3>
          <p className="text-muted-foreground text-sm">Technologies I work with daily</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border border-border hover:border-primary/40 transition-all duration-300 text-sm"
            >
              <span className="text-lg">{tool.icon}</span>
              <span className="text-foreground font-medium">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
