const SectionDivider = ({ variant = "default" }: { variant?: "default" | "ornate" | "minimal" }) => {
  if (variant === "minimal") {
    return (
      <div className="flex justify-center py-4">
        <div className="w-1 h-1 rounded-full bg-primary/40" />
      </div>
    );
  }

  if (variant === "ornate") {
    return (
      <div className="relative py-8">
        <div className="flex items-center justify-center gap-4">
          <div className="flex-1 max-w-[200px] h-px bg-gradient-to-r from-transparent to-primary/30" />
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
            <span className="text-primary/50 text-sm">⚡</span>
            <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
          </div>
          <div className="flex-1 max-w-[200px] h-px bg-gradient-to-l from-transparent to-primary/30" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative py-6">
      <div className="flex items-center justify-center">
        <div className="flex-1 max-w-[300px] h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
      </div>
    </div>
  );
};

export default SectionDivider;
