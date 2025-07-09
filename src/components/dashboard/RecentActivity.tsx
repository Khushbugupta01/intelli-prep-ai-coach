
import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Performance {
  date: string;
  score: number;
  type: string;
}

interface RecentActivityProps {
  recentPerformance: Performance[];
}

export const RecentActivity = ({ recentPerformance }: RecentActivityProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentPerformance.slice(0, 3).map((performance, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-4">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{performance.type} Interview</p>
                  <p className="text-sm text-muted-foreground">{performance.date}</p>
                </div>
              </div>
              <Badge variant={performance.score >= 80 ? "default" : "secondary"}>
                {performance.score}%
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
