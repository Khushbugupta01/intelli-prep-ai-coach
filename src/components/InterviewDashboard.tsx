
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InterviewAnalytics } from "./InterviewAnalytics";
import { Brain, Calendar, Target, TrendingUp, User, Award, Zap, Crown } from "lucide-react";
import { QuickActions } from "./dashboard/QuickActions";
import { TodaysGoal } from "./dashboard/TodaysGoal";
import { RecentActivity } from "./dashboard/RecentActivity";
import { UpcomingInterviews } from "./dashboard/UpcomingInterviews";
import { Achievements } from "./dashboard/Achievements";
import { PricingPlans } from "./dashboard/PricingPlans";

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

const pricingPlans = [
  {
    name: "Basic",
    price: "$9",
    period: "month",
    description: "Perfect for getting started",
    features: [
      "5 mock interviews per month",
      "Basic AI feedback",
      "Performance tracking",
      "Email support"
    ],
    popular: false,
    icon: Target
  },
  {
    name: "Premium",
    price: "$19",
    period: "month",
    description: "Best for serious job seekers",
    features: [
      "Unlimited mock interviews",
      "Advanced AI analysis",
      "Real-time voice feedback",
      "Facial expression analysis",
      "Custom question generation",
      "Priority support",
      "Progress analytics"
    ],
    popular: true,
    icon: Zap
  },
  {
    name: "Enterprise",
    price: "$49",
    period: "month",
    description: "For teams and organizations",
    features: [
      "Everything in Premium",
      "Team management",
      "Custom branding",
      "API access",
      "Advanced reporting",
      "Dedicated support",
      "Custom integrations"
    ],
    popular: false,
    icon: Crown
  }
];

export const InterviewDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Interview Dashboard</h1>
          <p className="text-muted-foreground">Track your progress and improve your interview skills</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <QuickActions />
              <TodaysGoal />
            </div>
            <RecentActivity recentPerformance={mockAnalyticsData.recentPerformance} />
          </TabsContent>

          <TabsContent value="analytics">
            <InterviewAnalytics data={mockAnalyticsData} />
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <UpcomingInterviews interviews={upcomingInterviews} />
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Achievements achievements={achievements} />
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <PricingPlans plans={pricingPlans} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
