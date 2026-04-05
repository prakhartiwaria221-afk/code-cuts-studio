import { GraduationCap, MapPin, Calendar } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SparkleCanvas from "./SparkleCanvas";
import sortingHatImage from "@/assets/sorting-hat.png";
import hermioneImage from "@/assets/hermione.png";

const About = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const { ref: eduRef, isVisible: eduVisible } = useScrollAnimation();

  const education = [
    { degree: "B.Tech", institution: "ITM Gwalior", period: "2024 – 2028", status: "Pursuing" },
    { degree: "12th Grade", institution: "St. Paul's School, Gwalior", period: "2022 – 2023", status: "Completed" },
    { degree: "10th Grade", institution: "St. Paul's School, Gwalior", period: "2020 – 2021", status: "Completed" },
  ];

  const highlights = [
    { label: "Projects Done", value: "10+", icon: "⚡" },
    { label: "Technologies", value: "8+", icon: "✦" },
    { label: "Years Coding", value: "3+", icon: "🪄" },
  ];

  const services = [
    "Front-End Development",
    "Video Editing",
    "Web Design",
    "UI Prototyping",
    "Responsive Design",
  ];

  return (
    <section id="about" className="py-24 sm:py-32 relative overflow-hidden">
      <SparkleCanvas count={12} color="gold" />
      <div className="absolute top-20 right-0 w-40 h-40 rounded-full border border-primary/10 animate-float-gentle" />

      {/* Hermione character */}
      <img
        src={hermioneImage}
        alt="Hermione Granger"
        loading="lazy"
        width={512}
        height={512}
        className="absolute -left-4 sm:left-6 bottom-12 w-16 sm:w-24 opacity-50 hover:opacity-90 transition-opacity duration-300 animate-float-gentle pointer-events-none"
        style={{ animationDelay: '0.8s' }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div
            ref={headerRef}
            className={`mb-16 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'Crimson Text', serif" }}>About Me</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6" style={{ fontFamily: "'Cinzel', serif" }}>
              A Consistent Experience<br />
              is a <span className="text-shimmer">Better</span> Experience.
            </h2>
          </div>

          <div className={`grid lg:grid-cols-2 gap-12 mb-20 transition-all duration-1000 delay-200 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="space-y-4">
              {services.map((service, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <span className="text-primary/50 text-sm">✦</span>
                  <p className={`text-lg sm:text-xl transition-all duration-300 ${
                    i === 0 ? 'font-bold text-foreground text-2xl' : 'text-muted-foreground hover:text-foreground'
                  }`} style={{ fontFamily: "'Crimson Text', serif" }}>
                    {service}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-center relative">
              <div className="quote-box max-w-sm">
                <p className="text-muted-foreground italic leading-relaxed" style={{ fontFamily: "'Crimson Text', serif" }}>
                  "It is our choices that show what we truly are, far more than our abilities — blending creativity and code to craft magic."
                </p>
              </div>
              {/* Sorting Hat */}
              <img
                src={sortingHatImage}
                alt="Sorting Hat"
                loading="lazy"
                width={100}
                height={100}
                className="absolute -top-16 -right-4 w-20 sm:w-24 opacity-50 animate-float-gentle"
              />
            </div>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className={`mb-20 transition-all duration-1000 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
              Crafting Digital <span className="text-shimmer">Magic</span>
            </h3>
            <div className="grid grid-cols-3 gap-4 mt-8 max-w-lg">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className={`text-center p-5 rounded-2xl card-parchment magic-border transition-all duration-700 ${
                    statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="text-3xl sm:text-4xl font-black text-foreground mb-1" style={{ fontFamily: "'Cinzel', serif" }}>
                    {item.value}
                  </div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div ref={eduRef} className={`transition-all duration-1000 ${eduVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <GraduationCap className="text-primary" size={20} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground" style={{ fontFamily: "'Cinzel', serif" }}>Education</h3>
            </div>

            <div className="space-y-4">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className={`group relative p-5 sm:p-6 rounded-2xl card-parchment magic-border transition-all duration-700 ${
                    eduVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
                    edu.status === "Pursuing"
                      ? "border border-primary/40 text-primary"
                      : "border border-border text-muted-foreground"
                  }`}>
                    {edu.status}
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="text-primary" size={22} />
                    </div>
                    <div className="flex-1 min-w-0 pr-20">
                      <h4 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-1" style={{ fontFamily: "'Cinzel', serif" }}>
                        {edu.degree}
                      </h4>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <MapPin size={14} className="flex-shrink-0" />
                        <span className="truncate">{edu.institution}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mt-2">
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
