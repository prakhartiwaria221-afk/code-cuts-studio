import { Code2, Palette, Zap, TrendingUp } from "lucide-react";

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
    <section id="skills" className="py-20 sm:py-28 bg-darker-surface relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-cyan/5 rounded-full blur-[80px]" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            My Skills
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Skills</span>{" "}
            <span className="text-foreground">& Expertise</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A blend of technical prowess and creative excellence
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {/* Tech Skills */}
          <div className="animate-slide-up">
            <div className="h-full p-6 sm:p-8 rounded-3xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover-lift">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-cyan/20 flex items-center justify-center">
                  <Code2 className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">Technical Skills</h3>
                  <p className="text-sm text-muted-foreground">Languages & frameworks</p>
                </div>
              </div>
              
              <div className="space-y-6">
                {techSkills.map((skill, index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between mb-2">
                      <span className="text-foreground font-medium text-sm sm:text-base group-hover:text-primary transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-primary font-semibold text-sm sm:text-base">{skill.level}%</span>
                    </div>
                    <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-cyan rounded-full transition-all duration-1000 ease-out relative"
                        style={{ width: `${skill.level}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Creative Skills */}
          <div className="animate-slide-up">
            <div className="h-full p-6 sm:p-8 rounded-3xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover-lift">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-cyan/20 flex items-center justify-center">
                  <Palette className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">Creative Skills</h3>
                  <p className="text-sm text-muted-foreground">Design & editing</p>
                </div>
              </div>
              
              <div className="space-y-6 mb-8">
                {creativeSkills.map((skill, index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between mb-2">
                      <span className="text-foreground font-medium text-sm sm:text-base group-hover:text-primary transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-primary font-semibold text-sm sm:text-base">{skill.level}%</span>
                    </div>
                    <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-cyan rounded-full transition-all duration-1000 ease-out relative"
                        style={{ width: `${skill.level}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quote Card */}
              <div className="p-5 sm:p-6 bg-gradient-to-br from-primary/5 to-cyan/5 rounded-2xl border border-primary/10">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="text-primary" size={16} />
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Combining technical precision with creative vision to deliver projects that are both
                    <span className="text-foreground font-medium"> functionally robust</span> and
                    <span className="text-foreground font-medium"> visually stunning</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tools Section */}
        <div className="animate-fade-in">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Tools & Technologies</h3>
            <p className="text-muted-foreground text-sm">Technologies I work with daily</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="group flex items-center gap-2 px-5 py-3 rounded-2xl bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                <span className="text-xl">{tool.icon}</span>
                <span className="text-foreground font-medium group-hover:text-primary transition-colors">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
