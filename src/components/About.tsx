import { GraduationCap } from "lucide-react";

const About = () => {
  const education = [
    {
      degree: "B.Tech",
      institution: "ITM Gwalior",
      period: "2024 – 2028",
      status: "Pursuing",
    },
    {
      degree: "12th Grade",
      institution: "St. Paul's School, Gwalior",
      period: "2022 – 2023",
      status: "Completed",
    },
    {
      degree: "10th Grade",
      institution: "St. Paul's School, Gwalior",
      period: "2020 – 2021",
      status: "Completed",
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-primary">About</span> <span className="text-foreground">Me</span>
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto" />
          </div>

          {/* Bio */}
          <div className="mb-16 animate-slide-up">
            <div className="bg-card border border-border rounded-2xl p-8 backdrop-blur-sm">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I am a passionate video editor and front-end developer blending creativity and code
                to build beautiful digital experiences. With expertise in{" "}
                <span className="text-primary font-semibold">C++, Java, React</span>, and modern web design, I
                focus on clean, functional, visually appealing builds.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                A disciplined state-level table tennis player, I bring{" "}
                <span className="text-primary font-semibold">consistency, speed, and problem-solving</span> to
                all my work.
              </p>
            </div>
          </div>

          {/* Education Timeline */}
          <div className="animate-slide-up">
            <h3 className="text-3xl font-bold mb-8 text-center">
              <GraduationCap className="inline-block mr-2 text-primary" size={32} />
              <span className="text-foreground">Education</span>
            </h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {edu.degree}
                      </h4>
                      <p className="text-muted-foreground mt-1">{edu.institution}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-primary font-medium">{edu.period}</p>
                      <p className="text-sm text-muted-foreground mt-1">{edu.status}</p>
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
