import { Code2, Palette } from "lucide-react";

const Skills = () => {
  const techSkills = [
    { name: "C++", level: 85 },
    { name: "Java", level: 80 },
    { name: "React", level: 85 },
    { name: "Front-End Development", level: 90 },
    { name: "Web Design", level: 88 },
  ];

  const creativeSkills = [
    { name: "Video Editing", level: 92 },
    { name: "Graphic Design", level: 85 },
  ];

  return (
    <section id="skills" className="py-16 sm:py-24 bg-darker-surface relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-primary">Skills &</span> <span className="text-foreground">Expertise</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-primary mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 max-w-6xl mx-auto">
          {/* Tech Skills */}
          <div className="animate-slide-up">
            <div className="bg-card border border-border rounded-2xl p-5 sm:p-8 h-full backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
              <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                <Code2 className="text-primary" size={28} />
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">Technical Skills</h3>
              </div>
              <div className="space-y-4 sm:space-y-6">
                {techSkills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-foreground font-medium text-sm sm:text-base">{skill.name}</span>
                      <span className="text-primary font-medium text-sm sm:text-base">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-gold-light rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Creative Skills */}
          <div className="animate-slide-up">
            <div className="bg-card border border-border rounded-2xl p-5 sm:p-8 h-full backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
              <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                <Palette className="text-primary" size={28} />
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">Creative Skills</h3>
              </div>
              <div className="space-y-4 sm:space-y-6">
                {creativeSkills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-foreground font-medium text-sm sm:text-base">{skill.name}</span>
                      <span className="text-primary font-medium text-sm sm:text-base">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-gold-light rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Info */}
              <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-secondary/50 rounded-xl border border-border/50">
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Combining technical precision with creative vision to deliver projects that are both
                  functionally robust and visually stunning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
