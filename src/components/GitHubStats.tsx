import { Github, Star, GitFork, Code2, Activity, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const GitHubStats = () => {
  const stats = [
    { label: "Repositories", value: "15+", icon: Code2 },
    { label: "Contributions", value: "200+", icon: Activity },
    { label: "Stars Earned", value: "10+", icon: Star },
    { label: "Forks", value: "5+", icon: GitFork },
  ];

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-14">
          <p className="text-muted-foreground text-sm tracking-widest uppercase mb-3">Open Source</p>
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            GitHub Stats
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mb-14">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-5 rounded-2xl border-2 border-border hover:border-foreground/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full border-2 border-border flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-5 h-5 text-foreground" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* GitHub Graphs */}
        <div className="max-w-4xl">
          <div className="rounded-2xl border-2 border-border p-6 overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center">
                <Github className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Contribution Activity</h3>
                <p className="text-sm text-muted-foreground">Real-time stats from GitHub</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <a href="https://github.com/prakhartiwaria221-afk" target="_blank" rel="noopener noreferrer" className="block rounded-xl bg-muted/20 p-4 hover:bg-muted/30 transition-colors">
                <img src="https://github-readme-stats.vercel.app/api?username=prakhartiwaria221-afk&show_icons=true&theme=transparent&hide_border=true&title_color=5EABA4&icon_color=5EABA4&text_color=9CA3AF&bg_color=00000000" alt="GitHub Stats" className="w-full h-auto" loading="lazy" />
              </a>
              <a href="https://github.com/prakhartiwaria221-afk" target="_blank" rel="noopener noreferrer" className="block rounded-xl bg-muted/20 p-4 hover:bg-muted/30 transition-colors">
                <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=prakhartiwaria221-afk&layout=compact&theme=transparent&hide_border=true&title_color=5EABA4&text_color=9CA3AF&bg_color=00000000" alt="Top Languages" className="w-full h-auto" loading="lazy" />
              </a>
            </div>

            <a href="https://github.com/prakhartiwaria221-afk" target="_blank" rel="noopener noreferrer" className="block rounded-xl bg-muted/20 p-4 hover:bg-muted/30 transition-colors">
              <img src="https://github-readme-streak-stats.herokuapp.com/?user=prakhartiwaria221-afk&theme=transparent&hide_border=true&ring=5EABA4&fire=5EABA4&currStreakLabel=5EABA4&sideLabels=9CA3AF&currStreakNum=F5F5F5&sideNums=F5F5F5&dates=6B7280&background=00000000" alt="GitHub Streak" className="w-full h-auto max-w-xl mx-auto" loading="lazy" />
            </a>
          </div>
        </div>

        <div className="mt-10">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-2 border-border hover:border-foreground/30 px-8 group"
            asChild
          >
            <a href="https://github.com/prakhartiwaria221-afk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Github size={18} />
              View Full Profile
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;
