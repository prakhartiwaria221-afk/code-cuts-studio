import BeforeAfterSlider from "./BeforeAfterSlider";
import { Sparkles, Wand2 } from "lucide-react";

const transformations = [
  {
    id: 1,
    title: "Color Grading",
    description: "Professional color correction and cinematic grading",
    beforeImage: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=450&fit=crop&sat=-100",
    afterImage: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=450&fit=crop",
    beforeLabel: "Raw Footage",
    afterLabel: "Color Graded",
  },
  {
    id: 2,
    title: "Visual Effects",
    description: "Adding motion graphics and visual enhancements",
    beforeImage: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=450&fit=crop&blur=0",
    afterImage: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=450&fit=crop",
    beforeLabel: "Original",
    afterLabel: "Enhanced",
  },
  {
    id: 3,
    title: "Retouching",
    description: "Professional photo and video retouching",
    beforeImage: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=450&fit=crop&con=-20",
    afterImage: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=450&fit=crop",
    beforeLabel: "Before",
    afterLabel: "After",
  },
];

const BeforeAfterSection = () => {
  return (
    <section id="transformations" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Wand2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Editing Magic</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Before & </span>
            <span className="text-primary">After</span>
          </h2>
          
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Witness the transformation. Drag the slider to see the difference 
            professional editing makes.
          </p>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {transformations.map((item, index) => (
            <div
              key={item.id}
              className="group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card */}
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
                <BeforeAfterSlider
                  beforeImage={item.beforeImage}
                  afterImage={item.afterImage}
                  beforeLabel={item.beforeLabel}
                  afterLabel={item.afterLabel}
                />
                
                {/* Card Content */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Want to see more of my editing work?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            <Wand2 className="w-4 h-4" />
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
