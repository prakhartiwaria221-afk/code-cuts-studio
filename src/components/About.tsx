import { useState, useEffect, useRef } from "react";
import { GraduationCap, MapPin, Calendar, Code, Video, Layout, Smartphone, Palette } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SparkleCanvas from "./SparkleCanvas";
import AnimatedText from "./AnimatedText";
import sortingHatImage from "@/assets/sorting-hat.png";
import hermioneImage from "@/assets/hermione.png";

const AnimatedCounter = ({ target, suffix = "", visible }: { target: number; suffix?: string; visible: boolean }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    const interval = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(interval); }
      else setCount(start);
    }, 16);
    return () => clearInterval(interval);
  }, [visible, target]);
  return <span>{count}{suffix}</span>;
};

const About = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: bentoRef, isVisible: bentoVisible } = useScrollAnimation();
  const { ref: eduRef, isVisible: eduVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const [activeService, setActiveService] = useState(0);

  const education = [
    { degree: "B.Tech", institution: "ITM Gwalior", period: "2024 – 2028", status: "Pursuing" },
    { degree: "12th Grade", institution: "St. Paul's School, Gwalior", period: "2022 – 2023", status: "Completed" },
    { degree: "10th Grade", institution: "St. Paul's School, Gwalior", period: "2020 – 2021", status: "Completed" },
  ];

  const highlights = [
    { label: "Projects Done", value: 10, suffix: "+", icon: "⚡" },
    { label: "Technologies", value: 8, suffix: "+", icon: "✦" },
    { label: "Years Coding", value: 3, suffix: "+", icon: "🪄" },
    { label: "Cups of Coffee", value: 500, suffix: "+", icon: "☕" },
  ];

  const services = [
    { name: "Front-End Development", icon: Code, desc: "Building modern, responsive web applications with React & TypeScript" },
    { name: "Video Editing", icon: Video, desc: "Creating engaging content with professional editing and effects" },
    { name: "Web Design", icon: Layout, desc: "Crafting beautiful, intuitive user interfaces and experiences" },
    { name: "Responsive Design", icon: Smartphone, desc: "Ensuring pixel-perfect designs across all devices and screen sizes" },
    { name: "UI Prototyping", icon: Palette, desc: "Rapid prototyping and wireframing to bring ideas to life" },
  ];

  // Auto-rotate services
  useEffect(() => {
    const timer = setInterval(() => setActiveService(prev => (prev + 1) % services.length), 3000);
    return () => clearInterval(timer);
  }, []);

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
        className="absolute left-2 sm:left-6 bottom-4 sm:bottom-12 w-12 sm:w-24 opacity-50 hover:opacity-90 transition-opacity duration-300 animate-float-gentle pointer-events-none"
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
              <AnimatedText text="A Consistent Experience" /><br />
              <AnimatedText text="is a " delay={300} /><span className="text-shimmer"><AnimatedText text="Better" delay={450} /></span><AnimatedText text=" Experience." delay={550} />
            </h2>
          </div>

          {/* Bento Grid Services */}
          <div
            ref={bentoRef}
            className={`grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-20 transition-all duration-1000 ${bentoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            {/* Main service card - spans 2 cols */}
            <div
              className="col-span-2 row-span-2 p-6 sm:p-8 rounded-3xl card-parchment magic-border relative overflow-hidden group cursor-pointer"
              onClick={() => setActiveService(0)}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {(() => { const Icon = services[activeService].icon; return <Icon className="text-primary" size={28} />; })()}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors" style={{ fontFamily: "'Cinzel', serif" }}>
                  {services[activeService].name}
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed" style={{ fontFamily: "'Crimson Text', serif" }}>
                  {services[activeService].desc}
                </p>
              </div>

              {/* Service indicators */}
              <div className="flex gap-1.5 mt-6">
                {services.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setActiveService(i); }}
                    className={`h-1 rounded-full transition-all duration-300 ${i === activeService ? 'w-6 bg-primary' : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'}`}
                  />
                ))}
              </div>
            </div>

            {/* Small bento cards */}
            {services.slice(1, 5).map((service, i) => {
              const Icon = service.icon;
              return (
                <div
                  key={i}
                  className={`p-4 sm:p-5 rounded-2xl card-parchment magic-border cursor-pointer group transition-all duration-700 hover:scale-[1.02] ${
                    bentoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${(i + 1) * 150}ms` }}
                  onClick={() => setActiveService(i + 1)}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/15 transition-colors">
                    <Icon className="text-primary" size={20} />
                  </div>
                  <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors" style={{ fontFamily: "'Cinzel', serif" }}>
                    {service.name}
                  </h4>
                </div>
              );
            })}

            {/* Quote bento card */}
            <div className="col-span-2 p-5 sm:p-6 rounded-2xl card-parchment magic-border relative">
              <div className="flex items-start gap-4">
                <span className="text-4xl text-primary/30 leading-none" style={{ fontFamily: "'Cinzel', serif" }}>"</span>
                <p className="text-muted-foreground italic leading-relaxed text-sm sm:text-base" style={{ fontFamily: "'Crimson Text', serif" }}>
                  It is our choices that show what we truly are, far more than our abilities — blending creativity and code to craft magic.
                </p>
              </div>
              {/* Sorting Hat */}
              <img
                src={sortingHatImage}
                alt="Sorting Hat"
                loading="lazy"
                width={100}
                height={100}
                className="absolute -top-10 -right-2 w-16 sm:w-20 opacity-50 animate-float-gentle"
              />
            </div>
          </div>

          {/* Animated Stats */}
          <div
            ref={statsRef}
            className={`mb-20 transition-all duration-1000 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
              Crafting Digital <span className="text-shimmer">Magic</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className={`text-center p-5 sm:p-6 rounded-2xl card-parchment magic-border group hover:scale-[1.03] transition-all duration-700 ${
                    statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="text-2xl mb-2 group-hover:scale-125 transition-transform duration-300">{item.icon}</div>
                  <div className="text-3xl sm:text-4xl font-black text-foreground mb-1" style={{ fontFamily: "'Cinzel', serif" }}>
                    <AnimatedCounter target={item.value} suffix={item.suffix} visible={statsVisible} />
                  </div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Timeline */}
          <div ref={eduRef} className={`transition-all duration-1000 ${eduVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <GraduationCap className="text-primary" size={20} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground" style={{ fontFamily: "'Cinzel', serif" }}>Education</h3>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[23px] top-8 bottom-8 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden sm:block" />

              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className={`group relative flex gap-4 sm:gap-6 transition-all duration-700 ${
                      eduVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                    }`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    {/* Timeline dot */}
                    <div className="hidden sm:flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full mt-6 z-10 transition-all duration-300 ${
                        edu.status === "Pursuing" ? "bg-primary shadow-[0_0_10px_hsl(43,72%,55%,0.5)]" : "bg-muted-foreground/30 group-hover:bg-primary"
                      }`} />
                    </div>

                    <div className="flex-1 p-5 sm:p-6 rounded-2xl card-parchment magic-border hover:scale-[1.01] transition-all duration-300">
                      <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
                        edu.status === "Pursuing"
                          ? "border border-primary/40 text-primary bg-primary/5"
                          : "border border-border text-muted-foreground"
                      }`}>
                        {edu.status}
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
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
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
