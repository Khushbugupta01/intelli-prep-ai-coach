
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  MapPin, 
  Briefcase, 
  Mail, 
  Phone, 
  Calendar, 
  TrendingUp, 
  Award, 
  Clock,
  FileText,
  Star,
  Target,
  BarChart3,
  Upload
} from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  // Mock user data
  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    title: "Senior Software Engineer",
    company: "Tech Corp",
    bio: "Passionate software engineer with 5+ years of experience in full-stack development. Looking to advance to a tech lead role.",
    linkedIn: "https://linkedin.com/in/johndoe",
    avatar: ""
  });

  // Mock feedback history
  const feedbackHistory = [
    {
      id: 1,
      date: "2024-01-15",
      company: "Google",
      role: "Software Engineer",
      type: "Technical",
      overallScore: 85,
      duration: "45 min",
      status: "completed",
      feedback: {
        strengths: ["Strong problem-solving skills", "Clear communication", "Good coding practices"],
        improvements: ["Work on system design concepts", "Practice explaining complex algorithms"],
        scores: {
          technical: 88,
          communication: 82,
          confidence: 85,
          problemSolving: 87
        }
      }
    },
    {
      id: 2,
      date: "2024-01-12",
      company: "Microsoft",
      role: "Senior Developer",
      type: "HR",
      overallScore: 78,
      duration: "30 min",
      status: "completed",
      feedback: {
        strengths: ["Professional demeanor", "Good examples from experience"],
        improvements: ["Be more specific with achievements", "Show more enthusiasm"],
        scores: {
          technical: 75,
          communication: 80,
          confidence: 76,
          problemSolving: 82
        }
      }
    },
    {
      id: 3,
      date: "2024-01-10",
      company: "Apple",
      role: "iOS Developer",
      type: "Technical",
      overallScore: 92,
      duration: "60 min",
      status: "completed",
      feedback: {
        strengths: ["Excellent iOS knowledge", "Creative problem solving", "Strong attention to detail"],
        improvements: ["Consider edge cases more thoroughly"],
        scores: {
          technical: 95,
          communication: 88,
          confidence: 92,
          problemSolving: 93
        }
      }
    }
  ];

  // Calculate analytics
  const totalInterviews = feedbackHistory.length;
  const averageScore = Math.round(feedbackHistory.reduce((sum, item) => sum + item.overallScore, 0) / totalInterviews);
  const bestScore = Math.max(...feedbackHistory.map(item => item.overallScore));
  const improvementTrend = 12; // Mock improvement percentage

  const handleProfileUpdate = () => {
    toast.success("Profile updated successfully!");
  };

  const handleAvatarUpload = () => {
    toast.info("Avatar upload feature coming soon!");
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed": return "default";
      case "in-progress": return "secondary";
      case "scheduled": return "outline";
      default: return "default";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Profile</h1>
            <p className="text-muted-foreground">Manage your profile and track your interview progress</p>
          </div>
          <Button onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="feedback">Feedback History</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Card */}
              <Card className="lg:col-span-1">
                <CardHeader className="text-center">
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={userProfile.avatar} />
                      <AvatarFallback className="text-lg font-semibold">
                        {userProfile.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm" onClick={handleAvatarUpload}>
                      <Upload className="mr-2 h-4 w-4" />
                      Change Photo
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <h3 className="font-semibold text-lg">{userProfile.name}</h3>
                    <p className="text-muted-foreground">{userProfile.title}</p>
                    <p className="text-sm text-muted-foreground">{userProfile.company}</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{userProfile.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{userProfile.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{userProfile.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Edit Profile Form */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Edit Profile Information</CardTitle>
                  <CardDescription>Update your personal and professional details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={userProfile.name}
                        onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userProfile.email}
                        onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={userProfile.phone}
                        onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={userProfile.location}
                        onChange={(e) => setUserProfile({...userProfile, location: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Job Title</Label>
                      <Input
                        id="title"
                        value={userProfile.title}
                        onChange={(e) => setUserProfile({...userProfile, title: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={userProfile.company}
                        onChange={(e) => setUserProfile({...userProfile, company: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea
                      id="bio"
                      rows={4}
                      value={userProfile.bio}
                      onChange={(e) => setUserProfile({...userProfile, bio: e.target.value})}
                      placeholder="Tell us about your professional background and career goals..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn Profile</Label>
                    <Input
                      id="linkedin"
                      value={userProfile.linkedIn}
                      onChange={(e) => setUserProfile({...userProfile, linkedIn: e.target.value})}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                  <Button onClick={handleProfileUpdate} className="w-full">
                    Update Profile
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Feedback History Tab */}
          <TabsContent value="feedback" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Interview Feedback History
                </CardTitle>
                <CardDescription>
                  Review your past interview performances and feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {feedbackHistory.map((interview) => (
                    <Card key={interview.id} className="border-l-4 border-l-blue-500">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{interview.company} - {interview.role}</CardTitle>
                            <CardDescription className="flex items-center gap-4 mt-1">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {interview.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {interview.duration}
                              </span>
                            </CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={getStatusBadgeVariant(interview.status)}>
                              {interview.type}
                            </Badge>
                            <div className={`text-2xl font-bold ${getScoreColor(interview.overallScore)}`}>
                              {interview.overallScore}%
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Score Breakdown */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {Object.entries(interview.feedback.scores).map(([skill, score]) => (
                            <div key={skill} className="text-center">
                              <div className={`text-lg font-semibold ${getScoreColor(score as number)}`}>
                                {score as number}%
                              </div>
                              <div className="text-sm text-muted-foreground capitalize">
                                {skill.replace(/([A-Z])/g, ' $1')}
                              </div>
                              <Progress value={score as number} className="mt-1 h-2" />
                            </div>
                          ))}
                        </div>

                        {/* Strengths and Improvements */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-green-600 mb-2 flex items-center gap-2">
                              <Star className="h-4 w-4" />
                              Strengths
                            </h4>
                            <ul className="text-sm space-y-1">
                              {interview.feedback.strengths.map((strength, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <span className="text-green-600 mt-1">•</span>
                                  {strength}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium text-orange-600 mb-2 flex items-center gap-2">
                              <Target className="h-4 w-4" />
                              Areas for Improvement
                            </h4>
                            <ul className="text-sm space-y-1">
                              {interview.feedback.improvements.map((improvement, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <span className="text-orange-600 mt-1">•</span>
                                  {improvement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Interviews</p>
                      <p className="text-2xl font-bold">{totalInterviews}</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                      <p className={`text-2xl font-bold ${getScoreColor(averageScore)}`}>
                        {averageScore}%
                      </p>
                    </div>
                    <Award className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Best Score</p>
                      <p className={`text-2xl font-bold ${getScoreColor(bestScore)}`}>
                        {bestScore}%
                      </p>
                    </div>
                    <Star className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Improvement</p>
                      <div className="flex items-center gap-1">
                        <p className="text-2xl font-bold">+{improvementTrend}%</p>
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                    <Target className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>Track your interview performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-8 text-muted-foreground">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Detailed analytics charts coming soon!</p>
                    <p className="text-sm">Track your progress with interactive charts and insights.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences and privacy settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center py-8 text-muted-foreground">
                    <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Settings panel coming soon!</p>
                    <p className="text-sm">Customize notifications, privacy, and account preferences.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
