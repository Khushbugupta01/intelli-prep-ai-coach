
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Users, 
  MessageSquare, 
  Plus, 
  Edit, 
  Trash2, 
  BarChart3, 
  LogOut,
  Crown,
  Calendar,
  TrendingUp
} from "lucide-react";
import { toast } from "sonner";

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [questions, setQuestions] = useState([
    {
      id: 1,
      type: "HR",
      category: "Introduction",
      question: "Tell me about yourself and why you're interested in this position.",
      difficulty: "Easy",
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      type: "Technical",
      category: "Problem Solving",
      question: "Describe a challenging project you worked on and how you overcame the obstacles.",
      difficulty: "Medium",
      createdAt: "2024-01-14"
    },
    {
      id: 3,
      type: "HR",
      category: "Career Goals",
      question: "Where do you see yourself in 5 years?",
      difficulty: "Easy",
      createdAt: "2024-01-13"
    }
  ]);

  const [users] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "User",
      joinDate: "2024-01-10",
      lastActive: "2024-01-16",
      interviewsCompleted: 5
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah@example.com",
      role: "User",
      joinDate: "2024-01-08",
      lastActive: "2024-01-15",
      interviewsCompleted: 3
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "User",
      joinDate: "2024-01-05",
      lastActive: "2024-01-14",
      interviewsCompleted: 8
    }
  ]);

  const [newQuestion, setNewQuestion] = useState({
    type: "",
    category: "",
    question: "",
    difficulty: ""
  });

  const [editingQuestion, setEditingQuestion] = useState<any>(null);

  useEffect(() => {
    // Check admin access
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "admin") {
      toast.error("Access denied. Admin privileges required.");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleAddQuestion = () => {
    if (!newQuestion.type || !newQuestion.category || !newQuestion.question || !newQuestion.difficulty) {
      toast.error("Please fill in all fields");
      return;
    }

    const question = {
      id: Date.now(),
      ...newQuestion,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setQuestions([question, ...questions]);
    setNewQuestion({ type: "", category: "", question: "", difficulty: "" });
    toast.success("Question added successfully");
  };

  const handleEditQuestion = (question: any) => {
    setEditingQuestion(question);
    setNewQuestion({
      type: question.type,
      category: question.category,
      question: question.question,
      difficulty: question.difficulty
    });
  };

  const handleUpdateQuestion = () => {
    if (!editingQuestion) return;

    const updatedQuestions = questions.map(q => 
      q.id === editingQuestion.id 
        ? { ...q, ...newQuestion }
        : q
    );

    setQuestions(updatedQuestions);
    setEditingQuestion(null);
    setNewQuestion({ type: "", category: "", question: "", difficulty: "" });
    toast.success("Question updated successfully");
  };

  const handleDeleteQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
    toast.success("Question deleted successfully");
  };

  const stats = {
    totalUsers: users.length,
    totalQuestions: questions.length,
    activeUsers: users.filter(u => {
      const lastActive = new Date(u.lastActive);
      const daysDiff = (Date.now() - lastActive.getTime()) / (1000 * 60 * 60 * 24);
      return daysDiff <= 7;
    }).length,
    totalInterviews: users.reduce((sum, user) => sum + user.interviewsCompleted, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-gray-600">Manage users and interview questions</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="questions" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Questions
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers}</div>
                  <p className="text-xs text-muted-foreground">
                    +2 from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeUsers}</div>
                  <p className="text-xs text-muted-foreground">
                    Last 7 days
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Questions</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalQuestions}</div>
                  <p className="text-xs text-muted-foreground">
                    Available in system
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Interviews</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalInterviews}</div>
                  <p className="text-xs text-muted-foreground">
                    Total completed
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest user activities and system events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New user registered: Sarah Smith</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Interview completed by Mike Johnson</p>
                      <p className="text-xs text-gray-500">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New question added to Technical category</p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage registered users and their activities</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Interviews</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{user.role}</Badge>
                        </TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell>{user.lastActive}</TableCell>
                        <TableCell>{user.interviewsCompleted}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Questions Tab */}
          <TabsContent value="questions" className="space-y-6">
            {/* Add/Edit Question Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  {editingQuestion ? "Edit Question" : "Add New Question"}
                </CardTitle>
                <CardDescription>
                  {editingQuestion ? "Update the interview question" : "Create a new interview question for the system"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Question Type</Label>
                    <Select value={newQuestion.type} onValueChange={(value) => setNewQuestion({...newQuestion, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="HR">HR</SelectItem>
                        <SelectItem value="Technical">Technical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select value={newQuestion.difficulty} onValueChange={(value) => setNewQuestion({...newQuestion, difficulty: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    placeholder="e.g., Problem Solving, Leadership, etc."
                    value={newQuestion.category}
                    onChange={(e) => setNewQuestion({...newQuestion, category: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="question">Question</Label>
                  <Textarea
                    id="question"
                    placeholder="Enter the interview question..."
                    value={newQuestion.question}
                    onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
                    className="min-h-24"
                  />
                </div>

                <div className="flex gap-2">
                  {editingQuestion ? (
                    <>
                      <Button onClick={handleUpdateQuestion}>Update Question</Button>
                      <Button variant="outline" onClick={() => {
                        setEditingQuestion(null);
                        setNewQuestion({ type: "", category: "", question: "", difficulty: "" });
                      }}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button onClick={handleAddQuestion}>Add Question</Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Questions List */}
            <Card>
              <CardHeader>
                <CardTitle>Question Bank</CardTitle>
                <CardDescription>Manage all interview questions in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {questions.map((question) => (
                    <div key={question.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex gap-2">
                          <Badge variant={question.type === "HR" ? "default" : "secondary"}>
                            {question.type}
                          </Badge>
                          <Badge variant="outline">{question.difficulty}</Badge>
                          <Badge variant="outline">{question.category}</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEditQuestion(question)}>
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeleteQuestion(question.id)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-2">{question.question}</p>
                      <p className="text-xs text-gray-500">Created: {question.createdAt}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
