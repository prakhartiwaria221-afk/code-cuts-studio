import { Github, Star, GitFork, Code2, Activity, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

const GitHubStats = () => {
  const stats = [
    { label: "Repositories", value: "15+", icon: Code2 },
    { label: "Contributions", value: "200+", icon: Activity },
    { label: "Stars Earned", value: "10+", icon: Star },
    { label: "Forks", value: "5+", icon: GitFork },
  ];

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-cyan/5 rounded-full blur-[80px]" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            Open Source
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">GitHub</span>{" "}
            <span className="gradient-text">Stats</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My open source contributions and coding activity
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto mb-14">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group text-center p-5 sm:p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 animate-slide-up hover-lift"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-cyan/10 flex items-center justify-center mx-auto mb-3 group-hover:from-primary/20 group-hover:to-cyan/20 transition-colors">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* GitHub Contribution Graph Embed */}
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="rounded-3xl bg-card border border-border p-6 sm:p-8 overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-cyan/10 flex items-center justify-center">
                <Github className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Contribution Activity</h3>
                <p className="text-sm text-muted-foreground">Real-time stats from GitHub</p>
              </div>
            </div>
            
            {/* GitHub Stats Cards */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <a 
                href="https://github.com/prakhartiwaria221-afk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block rounded-2xl bg-muted/50 p-4 hover:bg-muted/80 transition-colors"
              >
                <img
                  src="https://github-readme-stats.vercel.app/api?username=prakhartiwaria221-afk&show_icons=true&theme=transparent&hide_border=true&title_color=14B8A6&icon_color=14B8A6&text_color=9CA3AF&bg_color=00000000"
                  alt="GitHub Stats"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </a>
              <a 
                href="https://github.com/prakhartiwaria221-afk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block rounded-2xl bg-muted/50 p-4 hover:bg-muted/80 transition-colors"
              >
                <img
                  src="https://github-readme-stats.vercel.app/api/top-langs/?username=prakhartiwaria221-afk&layout=compact&theme=transparent&hide_border=true&title_color=14B8A6&text_color=9CA3AF&bg_color=00000000"
                  alt="Top Languages"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </a>
            </div>

            {/* GitHub Streak Stats */}
            <a 
              href="https://github.com/prakhartiwaria221-afk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block rounded-2xl bg-muted/50 p-4 hover:bg-muted/80 transition-colors"
            >
              <img
                src="https://github-readme-streak-stats.herokuapp.com/?user=prakhartiwaria221-afk&theme=transparent&hide_border=true&ring=14B8A6&fire=14B8A6&currStreakLabel=14B8A6&sideLabels=9CA3AF&currStreakNum=F5F5F5&sideNums=F5F5F5&dates=6B7280&background=00000000"
                alt="GitHub Streak"
                className="w-full h-auto max-w-xl mx-auto"
                loading="lazy"
              />
            </a>
          </div>
        </div>

        {/* View Profile Button */}
        <div className="text-center mt-10">
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-cyan text-primary-foreground hover:opacity-90 transition-all shadow-lg shadow-primary/25"
            asChild
          >
            <a
              href="https://github.com/prakhartiwaria221-afk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github size={20} />
              View Full Profile
              <ExternalLink size={16} />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;
