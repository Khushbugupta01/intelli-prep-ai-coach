
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Target, Clock, Brain, Mic } from "lucide-react";

interface AnalyticsData {
  totalInterviews: number;
  averageScore: number;
  improvementTrend: number;
  skillBreakdown: {
    technical: number;
    communication: number;
    confidence: number;
    problemSolving: number;
  };
  recentPerformance: Array<{
    date: string;
    score: number;
    type: string;
  }>;
}

interface InterviewAnalyticsProps {
  data: AnalyticsData;
}

export const InterviewAnalytics = ({ data }: InterviewAnalyticsProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getTrendIcon = (trend: number) => {
    return trend > 0 ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    );
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Interviews</p>
                <p className="text-2xl font-bold">{data.totalInterviews}</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                <p className={`text-2xl font-bold ${getScoreColor(data.averageScore)}`}>
                  {data.averageScore}%
                </p>
              </div>
              <Brain className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Improvement</p>
                <div className="flex items-center gap-1">
                  <p className="text-2xl font-bold">{Math.abs(data.improvementTrend)}%</p>
                  {getTrendIcon(data.improvementTrend)}
                </div>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Practice Hours</p>
                <p className="text-2xl font-bold">{Math.round(data.totalInterviews * 0.5)}h</p>
              </div>
              <Mic className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Skills Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(data.skillBreakdown).map(([skill, score]) => (
            <div key={skill} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium capitalize">{skill.replace(/([A-Z])/g, ' $1')}</span>
                <span className={`text-sm font-semibold ${getScoreColor(score)}`}>{score}%</span>
              </div>
              <Progress value={score} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.recentPerformance.map((performance, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge variant={performance.type === "Technical" ? "default" : "secondary"}>
                    {performance.type}
                  </Badge>
                  <span className="text-sm font-medium">{performance.date}</span>
                </div>
                <span className={`text-sm font-semibold ${getScoreColor(performance.score)}`}>
                  {performance.score}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
