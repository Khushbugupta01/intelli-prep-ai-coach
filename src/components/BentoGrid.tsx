import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/ui/progress-ring";
import { Brain, FileText, BarChart3, Video, Award, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface BentoItemProps {
  title: string;
  description: string;
  icon: React.ElementType;
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "coral" | "accent";
}

const BentoItem: React.FC<BentoItemProps> = ({
  title,
  description,
  icon: Icon,
  onClick,
  className,
  children,
  variant = "default"
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "coral":
        return "bg-coral hover:bg-coral/90 text-coral-foreground";
      case "accent":
        return "bg-accent hover:bg-accent/90 text-accent-foreground";
      default:
        return "bg-card hover:bg-card/80 text-card-foreground";
    }
  };

  return (
    <Card className={cn(
      "group cursor-pointer transition-all duration-300 hover:scale-105 neumorphic hover:shadow-lg",
      className
    )}>
      <CardContent 
        className={cn(
          "p-6 h-full flex flex-col transition-colors duration-300",
          getVariantClasses()
        )}
        onClick={onClick}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-background/10">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm opacity-80">{description}</p>
          </div>
        </div>
        {children}
      </CardContent>
    </Card>
  );
};

export const BentoGrid: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
      {/* Interview Simulator - Large tile */}
      <BentoItem
        title="Mock Interview"
        description="Practice with AI-powered interviews"
        icon={Brain}
        onClick={() => navigate("/interview")}
        variant="coral"
        className="md:col-span-2 lg:row-span-2"
      >
        <div className="flex-1 flex items-center justify-center">
          <div className="relative">
            {/* Webcam preview mockup */}
            <div className="w-48 h-36 bg-background/20 rounded-lg flex items-center justify-center mb-4">
              <Video className="h-12 w-12 opacity-60" />
            </div>
            <div className="flex justify-center">
              <ProgressRing progress={75} size={80} />
            </div>
          </div>
        </div>
      </BentoItem>

      {/* Resume Upload */}
      <BentoItem
        title="Upload Resume"
        description="Get AI feedback on your resume"
        icon={FileText}
        onClick={() => navigate("/upload")}
        className="lg:row-span-1"
      >
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-20 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <Button variant="outline" size="sm">
              Choose File
            </Button>
          </div>
        </div>
      </BentoItem>

      {/* Analytics */}
      <BentoItem
        title="Performance"
        description="Track your progress"
        icon={BarChart3}
        onClick={() => navigate("/dashboard")}
        variant="accent"
      >
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full">
            <div className="flex justify-between items-end h-16 mb-2">
              <div className="w-4 bg-primary/60 rounded-t" style={{ height: "30%" }} />
              <div className="w-4 bg-primary/80 rounded-t" style={{ height: "60%" }} />
              <div className="w-4 bg-primary rounded-t" style={{ height: "90%" }} />
              <div className="w-4 bg-primary/70 rounded-t" style={{ height: "45%" }} />
            </div>
            <p className="text-sm text-center opacity-80">Trending up 📈</p>
          </div>
        </div>
      </BentoItem>

      {/* Quick Stats */}
      <BentoItem
        title="Today's Goal"
        description="Complete 2 practice sessions"
        icon={Award}
        onClick={() => navigate("/dashboard")}
      >
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">1/2</div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: "50%" }} />
            </div>
          </div>
        </div>
      </BentoItem>

      {/* Schedule */}
      <BentoItem
        title="Schedule"
        description="Upcoming interviews"
        icon={Calendar}
        onClick={() => navigate("/dashboard")}
        className="md:col-span-2 lg:col-span-1"
      >
        <div className="flex-1">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 bg-background/10 rounded-lg">
              <div className="w-2 h-2 bg-coral rounded-full" />
              <div className="text-sm">
                <div className="font-medium">Google</div>
                <div className="opacity-70">Today 2:00 PM</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 bg-background/10 rounded-lg">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <div className="text-sm">
                <div className="font-medium">Meta</div>
                <div className="opacity-70">Tomorrow 10:00 AM</div>
              </div>
            </div>
          </div>
        </div>
      </BentoItem>
    </div>
  );
};