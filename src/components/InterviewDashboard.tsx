
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InterviewAnalytics } from "./InterviewAnalytics";
import { Brain, Calendar, Clock, Target, TrendingUp, User, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockAnalyticsData = {
  totalInterviews: 12,
  averageScore: 78,
  improvementTrend: 15,
  skillBreakdown: {
    technical: 82,
    communication: 74,
    confidence: 69,
    problemSolving: 85
  },
  recentPerformance: [
    { date: "2024-01-15", score: 85, type: "Technical" },
    { date: "2024-01-12", score: 72, type: "HR" },
    { date: "2024-01-10", score: 78, type: "Technical" },
    { date: "2024-01-08", score: 81, type: "HR" },
    { date: "2024-01-05", score: 68, type: "Technical" }
  ]
};

const upcomingInterviews = [
  { id: 1, company: "Google", role: "Software Engineer", date: "2024-01-20", time: "14:00", type: "Technical" },
  { id: 2, company: "Microsoft", role: "Product Manager", date: "2024-01-22", time: "10:00", type: "HR" },
  { id: 3, company: "Apple", role: "iOS Developer", date: "2024-01-25", time: "16:00", type: "Technical" }
];

const achievements = [
  { id: 1, title: "First Interview", description: "Complete your first mock interview", earned: true, icon: Target },
  { id: 2, title: "Consistency King", description: "Practice 5 days in a row", earned: true, icon: Calendar },
  { id: 3, title: "Improvement Expert", description: "Achieve 20% score improvement", earned: true, icon: TrendingUp },
  { id: 4, title: "Confidence Builder", description: "Score 90+ in confidence rating", earned: false, icon: User },
  { id: 5, title: "Technical Master", description: "Score 95+ in technical interview", earned: false, icon: Brain },
  { id: 6, title: "Interview Legend", description: "Complete 50 interviews", earned: false, icon: Award }
];

export const InterviewDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Interview Dashboard</h1>
          <p className="text-muted-foreground">Track your progress and improve your interview skills</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Quick Actions */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    onClick={() => navigate("/interview")} 
                    className="h-24 flex-col gap-2"
                    size="lg"
                  >
                    <Brain className="h-6 w-6" />
                    Start Mock Interview
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate("/upload")} 
                    className="h-24 flex-col gap-2"
                    size="lg"
                  >
                    <Target className="h-6 w-6" />
                    Upload Resume
                  </Button>
                </CardContent>
              </Card>

              {/* Today's Goal */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Today's Goal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">2/3</div>
                    <p className="text-sm text-muted-foreground">Practice Sessions</p>
                    <Button variant="outline" size="sm" className="mt-3">
                      Complete Goal
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAnalyticsData.recentPerformance.slice(0, 3).map((performance, index) => (
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
          </TabsContent>

          <TabsContent value="analytics">
            <InterviewAnalytics data={mockAnalyticsData} />
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Interviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingInterviews.map((interview) => (
                    <div key={interview.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">{interview.company} - {interview.role}</p>
                          <p className="text-sm text-muted-foreground">
                            {interview.date} at {interview.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={interview.type === "Technical" ? "default" : "secondary"}>
                          {interview.type}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Practice
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
