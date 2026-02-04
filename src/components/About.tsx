import { GraduationCap, Briefcase, MapPin, Calendar } from "lucide-react";

const About = () => {
  const education = [
    {
      degree: "B.Tech",
      institution: "ITM Gwalior",
      period: "2024 – 2028",
      status: "Pursuing",
      icon: GraduationCap,
    },
    {
      degree: "12th Grade",
      institution: "St. Paul's School, Gwalior",
      period: "2022 – 2023",
      status: "Completed",
      icon: GraduationCap,
    },
    {
      degree: "10th Grade",
      institution: "St. Paul's School, Gwalior",
      period: "2020 – 2021",
      status: "Completed",
      icon: GraduationCap,
    },
  ];

  const highlights = [
    { label: "Years Coding", value: "3+", icon: "💻" },
    { label: "Projects Built", value: "10+", icon: "🚀" },
    { label: "Technologies", value: "8+", icon: "⚡" },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-cyan/5 rounded-full blur-[80px]" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              About Me
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Passionate</span>{" "}
              <span className="gradient-text">Developer</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Combining technical expertise with creative vision
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-16 animate-fade-in">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="group text-center p-4 sm:p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover-lift"
              >
                <span className="text-2xl sm:text-3xl mb-2 block">{item.icon}</span>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-1">
                  {item.value}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Bio Card */}
          <div className="mb-16 animate-slide-up">
            <div className="relative p-6 sm:p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-card to-card/50 border border-border overflow-hidden">
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full" />
              
              <div className="relative">
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed mb-6">
                  I am a passionate <span className="text-foreground font-medium">video editor</span> and{" "}
                  <span className="text-foreground font-medium">front-end developer</span> blending creativity 
                  and code to build beautiful digital experiences.
                </p>
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                  With expertise in{" "}
                  <span className="text-primary font-semibold">C++, Java, React</span>, and modern web design, 
                  I focus on clean, functional, visually appealing builds. As a disciplined state-level 
                  table tennis player, I bring{" "}
                  <span className="text-primary font-semibold">consistency, speed, and problem-solving</span> to all my work.
                </p>
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="animate-slide-up">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <GraduationCap className="text-primary" size={20} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">Education</h3>
            </div>
            
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="group relative p-5 sm:p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover-lift"
                >
                  {/* Status Badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
                    edu.status === "Pursuing" 
                      ? "bg-primary/10 text-primary border border-primary/20" 
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {edu.status}
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <edu.icon className="text-primary" size={22} />
                    </div>
                    
                    <div className="flex-1 min-w-0 pr-20">
                      <h4 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                        {edu.degree}
                      </h4>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm sm:text-base">
                        <MapPin size={14} className="flex-shrink-0" />
                        <span className="truncate">{edu.institution}</span>
                      </div>
                      <div className="flex items-center gap-2 text-primary text-sm mt-2">
                        <Calendar size={14} />
                        <span>{edu.period}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
