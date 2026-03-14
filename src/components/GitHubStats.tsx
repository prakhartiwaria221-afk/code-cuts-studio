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
    <section className="py-24 sm:py-32 bg-card/30 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">Open Source</p>
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            GitHub <span className="gradient-text">Stats</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My open source contributions and coding activity
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-14">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-5 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="text-2xl sm:text-3xl font-black gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* GitHub Graphs */}
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl bg-card border border-border p-6 overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Github className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Contribution Activity</h3>
                <p className="text-sm text-muted-foreground">Real-time stats from GitHub</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <a href="https://github.com/prakhartiwaria221-afk" target="_blank" rel="noopener noreferrer" className="block rounded-xl bg-muted/30 p-4 hover:bg-muted/50 transition-colors">
                <img src="https://github-readme-stats.vercel.app/api?username=prakhartiwaria221-afk&show_icons=true&theme=transparent&hide_border=true&title_color=14B8A6&icon_color=14B8A6&text_color=9CA3AF&bg_color=00000000" alt="GitHub Stats" className="w-full h-auto" loading="lazy" />
              </a>
              <a href="https://github.com/prakhartiwaria221-afk" target="_blank" rel="noopener noreferrer" className="block rounded-xl bg-muted/30 p-4 hover:bg-muted/50 transition-colors">
                <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=prakhartiwaria221-afk&layout=compact&theme=transparent&hide_border=true&title_color=14B8A6&text_color=9CA3AF&bg_color=00000000" alt="Top Languages" className="w-full h-auto" loading="lazy" />
              </a>
            </div>

            <a href="https://github.com/prakhartiwaria221-afk" target="_blank" rel="noopener noreferrer" className="block rounded-xl bg-muted/30 p-4 hover:bg-muted/50 transition-colors">
              <img src="https://github-readme-streak-stats.herokuapp.com/?user=prakhartiwaria221-afk&theme=transparent&hide_border=true&ring=14B8A6&fire=14B8A6&currStreakLabel=14B8A6&sideLabels=9CA3AF&currStreakNum=F5F5F5&sideNums=F5F5F5&dates=6B7280&background=00000000" alt="GitHub Streak" className="w-full h-auto max-w-xl mx-auto" loading="lazy" />
            </a>
          </div>
        </div>

        <div className="text-center mt-10">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 shadow-lg shadow-primary/25"
            asChild
          >
            <a href="https://github.com/prakhartiwaria221-afk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Github size={18} />
              View Full Profile
              <ExternalLink size={14} />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;
