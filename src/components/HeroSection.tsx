import { Button } from "@/components/ui/button";
import { Brain, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 px-4 text-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full animate-pulse" />
        <div className="absolute bottom-32 right-16 w-16 h-16 bg-coral/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-40 right-20 w-12 h-12 bg-primary/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-4xl mx-auto animate-fade-in-up">
        {/* Hero badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full text-accent-foreground mb-6">
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-medium">AI-Powered Interview Practice</span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Master Your Next{" "}
          <span className="text-primary">Interview</span>
          <br />
          with AI Coaching
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Practice mock interviews, get instant feedback, and build confidence 
          with our nurturing AI platform designed for your success.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            size="lg" 
            className="bg-coral hover:bg-coral/90 text-coral-foreground px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            onClick={() => navigate("/interview")}
          >
            <Brain className="mr-2 h-5 w-5" />
            Start Practice Now
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="px-8 py-4 text-lg rounded-xl"
            onClick={() => navigate("/how-it-works")}
          >
            How It Works
          </Button>
        </div>

        {/* Hero illustration/mockup */}
        <div className="relative max-w-3xl mx-auto">
          <div className="glass-card rounded-2xl p-8 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Practice mockup */}
              <div className="text-center">
                <div className="w-16 h-16 bg-coral/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Brain className="h-8 w-8 text-coral" />
                </div>
                <h3 className="font-semibold mb-2">Practice</h3>
                <p className="text-sm text-muted-foreground">AI-powered mock interviews</p>
              </div>

              {/* Feedback mockup */}
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Learn</h3>
                <p className="text-sm text-muted-foreground">Instant detailed feedback</p>
              </div>

              {/* Improve mockup */}
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="text-primary font-bold text-xl">✓</div>
                </div>
                <h3 className="font-semibold mb-2">Succeed</h3>
                <p className="text-sm text-muted-foreground">Land your dream job</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};