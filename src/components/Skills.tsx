import { useState, useEffect, useRef } from "react";
import { Code2, Palette, Zap, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SparkleCanvas from "./SparkleCanvas";
import phoenixImage from "@/assets/phoenix.png";

const CircularProgress = ({ value, label, visible, delay, color }: { value: number; label: string; visible: boolean; delay: number; color: string }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      let start = 0;
      const interval = setInterval(() => {
        start += 1;
        if (start >= value) { setProgress(value); clearInterval(interval); }
        else setProgress(start);
      }, 15);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [visible, value, delay]);

  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center group">
      <div className="relative w-24 h-24 sm:w-28 sm:h-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="6" />
          <circle
            cx="50" cy="50" r="40" fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg sm:text-xl font-bold text-foreground" style={{ fontFamily: "'Cinzel', serif" }}>
            {progress}%
          </span>
        </div>
      </div>
      <span className="mt-2 text-xs sm:text-sm text-muted-foreground text-center font-medium">{label}</span>
    </div>
  );
};

const Skills = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation();
  const { ref: toolsRef, isVisible: toolsVisible } = useScrollAnimation();
  const { ref: circularRef, isVisible: circularVisible } = useScrollAnimation();
  const [activeTab, setActiveTab] = useState<'tech' | 'creative'>('tech');

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

  const circularSkills = [
    { name: "Problem Solving", value: 85, color: "hsl(43 72% 55%)" },
    { name: "Team Work", value: 90, color: "hsl(0 55% 40%)" },
    { name: "Communication", value: 75, color: "hsl(43 80% 70%)" },
    { name: "Creativity", value: 80, color: "hsl(200 60% 50%)" },
  ];

  const tools = [
    { name: "React", icon: "⚛️" },
    { name: "TypeScript", icon: "📘" },
    { name: "Tailwind", icon: "🎨" },
    { name: "Git", icon: "🔀" },
    { name: "VS Code", icon: "💻" },
    { name: "Figma", icon: "🎯" },
    { name: "Node.js", icon: "🟢" },
    { name: "Supabase", icon: "⚡" },
  ];

  const activeSkills = activeTab === 'tech' ? techSkills : creativeSkills;
  const gradientColor = activeTab === 'tech'
    ? 'linear-gradient(90deg, hsl(43 72% 55%), hsl(43 80% 70%))'
    : 'linear-gradient(90deg, hsl(0 55% 40%), hsl(0 45% 55%))';

  return (
    <section id="skills" className="py-24 sm:py-32 relative overflow-hidden">
      <SparkleCanvas count={10} color="gold" />
      <div className="absolute top-10 left-0 w-36 h-36 rounded-full border border-primary/10 animate-float-gentle" />

      {/* Phoenix character */}
      <img
        src={phoenixImage}
        alt="Fawkes the Phoenix"
        loading="lazy"
        width={512}
        height={512}
        className="absolute right-2 sm:right-6 top-4 sm:top-16 w-12 sm:w-32 opacity-50 hover:opacity-90 transition-opacity duration-300 animate-float-gentle pointer-events-none drop-shadow-[0_0_15px_rgba(255,100,0,0.3)]"
        style={{ animationDelay: '1s' }}
      />

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

        {/* Tab switcher + skill bars */}
        <div
          ref={cardsRef}
          className={`max-w-3xl mb-16 transition-all duration-1000 ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setActiveTab('tech')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'tech'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card/50 text-muted-foreground hover:text-foreground border border-border/50'
              }`}
            >
              <Code2 size={16} />
              Technical
            </button>
            <button
              onClick={() => setActiveTab('creative')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'creative'
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-card/50 text-muted-foreground hover:text-foreground border border-border/50'
              }`}
            >
              <Palette size={16} />
              Creative
            </button>
          </div>

          {/* Skill bars with animation */}
          <div className="p-6 sm:p-8 rounded-3xl card-parchment magic-border">
            <div className="space-y-5">
              {activeSkills.map((skill, index) => (
                <div key={skill.name} className="group">
                  <div className="flex justify-between mb-2">
                    <span className="text-foreground font-medium text-sm group-hover:text-primary transition-colors">{skill.name}</span>
                    <span className="text-muted-foreground font-medium text-sm">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                      style={{
                        width: cardsVisible ? `${skill.level}%` : '0%',
                        background: gradientColor,
                        transitionDelay: `${index * 100 + 300}ms`,
                      }}
                    >
                      {/* Shimmer effect on bar */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_linear_infinite]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-2xl border border-border/50 bg-muted/30">
              <div className="flex items-start gap-3">
                <Sparkles className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontFamily: "'Crimson Text', serif" }}>
                  Combining technical precision with creative vision to deliver
                  <span className="text-foreground font-medium"> functionally robust</span> and
                  <span className="text-foreground font-medium"> visually stunning</span> projects.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Circular soft skills */}
        <div
          ref={circularRef}
          className={`mb-16 transition-all duration-1000 ${circularVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h3 className="text-xl font-bold text-foreground mb-8" style={{ fontFamily: "'Cinzel', serif" }}>
            Soft <span className="text-shimmer">Skills</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-2xl">
            {circularSkills.map((skill, i) => (
              <CircularProgress
                key={skill.name}
                value={skill.value}
                label={skill.name}
                visible={circularVisible}
                delay={i * 200}
                color={skill.color}
              />
            ))}
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
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full card-parchment magic-border hover:scale-105 cursor-default transition-all duration-500 text-sm group ${
                  toolsVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <span className="text-lg group-hover:scale-125 transition-transform duration-300">{tool.icon}</span>
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
