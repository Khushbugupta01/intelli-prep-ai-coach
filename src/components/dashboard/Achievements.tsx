
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface Achievement {
  id: number;
  title: string;
  description: string;
  earned: boolean;
  icon: LucideIcon;
}

interface AchievementsProps {
  achievements: Achievement[];
}

export const Achievements = ({ achievements }: AchievementsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => {
            const IconComponent = achievement.icon;
            return (
              <div
                key={achievement.id}
                className={`p-4 border rounded-lg transition-all ${
                  achievement.earned
                    ? "bg-green-50 border-green-200"
                    : "bg-gray-50 border-gray-200 opacity-60"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <IconComponent
                    className={`h-6 w-6 ${
                      achievement.earned ? "text-green-600" : "text-gray-400"
                    }`}
                  />
                  <h3 className="font-medium">{achievement.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                {achievement.earned && (
                  <Badge variant="default" className="mt-2">
                    Earned
                  </Badge>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
