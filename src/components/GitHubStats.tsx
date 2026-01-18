import { Github, Star, GitFork, Code2, Activity } from "lucide-react";

const GitHubStats = () => {
  const stats = [
    { label: "Repositories", value: "15+", icon: Code2 },
    { label: "Contributions", value: "200+", icon: Activity },
    { label: "Stars Earned", value: "10+", icon: Star },
    { label: "Forks", value: "5+", icon: GitFork },
  ];

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">GitHub</span>{" "}
            <span className="text-primary">Stats</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-primary mx-auto mb-4" />
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-2">
            My open source contributions and coding activity
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto mb-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/50 transition-all duration-300 animate-slide-up group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
              <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* GitHub Contribution Graph Embed */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-6 overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <Github className="w-6 h-6 text-primary" />
              <span className="font-semibold text-foreground">Contribution Activity</span>
            </div>
            
            {/* GitHub Stats Cards */}
            <div className="grid md:grid-cols-2 gap-4">
              <a 
                href="https://github.com/prakhartiwaria221-afk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <img
                  src="https://github-readme-stats.vercel.app/api?username=prakhartiwaria221-afk&show_icons=true&theme=transparent&hide_border=true&title_color=EAB308&icon_color=EAB308&text_color=9CA3AF&bg_color=00000000"
                  alt="GitHub Stats"
                  className="w-full h-auto rounded-lg hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </a>
              <a 
                href="https://github.com/prakhartiwaria221-afk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <img
                  src="https://github-readme-stats.vercel.app/api/top-langs/?username=prakhartiwaria221-afk&layout=compact&theme=transparent&hide_border=true&title_color=EAB308&text_color=9CA3AF&bg_color=00000000"
                  alt="Top Languages"
                  className="w-full h-auto rounded-lg hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </a>
            </div>

            {/* GitHub Streak Stats */}
            <div className="mt-4">
              <a 
                href="https://github.com/prakhartiwaria221-afk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <img
                  src="https://github-readme-streak-stats.herokuapp.com/?user=prakhartiwaria221-afk&theme=transparent&hide_border=true&ring=EAB308&fire=EAB308&currStreakLabel=EAB308&sideLabels=9CA3AF&currStreakNum=F5F5F5&sideNums=F5F5F5&dates=6B7280&background=00000000"
                  alt="GitHub Streak"
                  className="w-full h-auto rounded-lg hover:scale-105 transition-transform duration-300 max-w-xl mx-auto"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        </div>

        {/* View Profile Button */}
        <div className="text-center mt-8">
          <a
            href="https://github.com/prakhartiwaria221-afk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-gold-light transition-colors"
          >
            <Github size={20} />
            View Full Profile
          </a>
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;
