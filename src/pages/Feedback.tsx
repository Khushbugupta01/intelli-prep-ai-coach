import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Download, Home, RotateCcw, TrendingUp, MessageSquare, Mic, Brain } from "lucide-react";
import { toast } from "sonner";

const Feedback = () => {
  const navigate = useNavigate();
  const [feedbackData, setFeedbackData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Mock AI feedback generation
  const generateFeedback = (questions: any[], answers: string[]) => {
    const overallScores = {
      grammar: Math.floor(Math.random() * 30) + 70, // 70-100
      fluency: Math.floor(Math.random() * 25) + 75,
      confidence: Math.floor(Math.random() * 20) + 80,
      relevance: Math.floor(Math.random() * 25) + 75,
      clarity: Math.floor(Math.random() * 20) + 80
    };

    const questionFeedback = questions.map((question, index) => {
      const answer = answers[index] || "";
      const wordCount = answer.split(' ').length;
      
      return {
        question: question.question,
        type: question.type,
        category: question.category,
        answer: answer,
        wordCount: wordCount,
        scores: {
          grammar: Math.floor(Math.random() * 30) + 70,
          fluency: Math.floor(Math.random() * 25) + 75,
          confidence: Math.floor(Math.random() * 20) + 80,
          relevance: Math.floor(Math.random() * 25) + 75
        },
        strengths: [
          "Clear communication",
          "Good structure in response",
          "Relevant examples provided"
        ].slice(0, Math.floor(Math.random() * 3) + 1),
        improvements: [
          "Consider adding more specific examples",
          "Work on maintaining eye contact",
          "Reduce use of filler words"
        ].slice(0, Math.floor(Math.random() * 3) + 1)
      };
    });

    const overallScore = Math.round(
      (overallScores.grammar + overallScores.fluency + overallScores.confidence + overallScores.relevance + overallScores.clarity) / 5
    );

    return {
      overallScore,
      overallScores,
      questionFeedback,
      recommendations: [
        "Practice maintaining consistent eye contact throughout your responses",
        "Work on reducing filler words (um, uh, like) in your speech",
        "Prepare more specific examples to support your answers",
        "Focus on speaking at a steady, confident pace",
        "Consider using the STAR method (Situation, Task, Action, Result) for behavioral questions"
      ],
      timestamp: new Date().toLocaleString()
    };
  };

  useEffect(() => {
    const loadFeedback = () => {
      const storedData = localStorage.getItem('interviewAnswers');
      if (storedData) {
        const { questions, answers } = JSON.parse(storedData);
        const feedback = generateFeedback(questions, answers);
        setFeedbackData(feedback);
      } else {
        toast.error("No interview data found");
        navigate("/");
      }
      setLoading(false);
    };

    // Simulate AI processing time
    setTimeout(loadFeedback, 2000);
  }, [navigate]);

  const downloadReport = () => {
    toast.success("Downloading PDF report...");
    // In a real app, this would generate and download a PDF
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Good";
    if (score >= 70) return "Fair";
    return "Needs Improvement";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Analyzing Your Performance</h2>
            <p className="text-gray-600">Our AI is processing your interview responses...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!feedbackData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">No Data Available</h2>
            <p className="text-gray-600 mb-6">Please complete an interview first to view feedback.</p>
            <Button onClick={() => navigate("/interview")}>
              Start Interview
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Interview Feedback Report</h1>
            <p className="text-gray-600">Generated on {feedbackData.timestamp}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate("/")}>
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
            <Button variant="outline" onClick={() => navigate("/interview")}>
              <RotateCcw className="mr-2 h-4 w-4" />
              New Interview
            </Button>
            <Button onClick={downloadReport}>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Overall Score */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Overall Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <div className={`text-6xl font-bold mb-2 ${getScoreColor(feedbackData.overallScore)}`}>
                {feedbackData.overallScore}
              </div>
              <div className="text-xl text-gray-600">
                {getScoreLabel(feedbackData.overallScore)}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(feedbackData.overallScores).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className={`text-2xl font-semibold ${getScoreColor(value as number)}`}>
                    {value as number}
                  </div>
                  <div className="text-sm text-gray-600 capitalize">
                    {key}
                  </div>
                  <Progress value={value as number} className="mt-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Analysis */}
        <Tabs defaultValue="questions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="questions" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Question Analysis
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Skills Breakdown
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Recommendations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="questions" className="space-y-6">
            {feedbackData.questionFeedback.map((feedback: any, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                    <Badge variant={feedback.type === "HR" ? "default" : "secondary"}>
                      {feedback.type}
                    </Badge>
                  </div>
                  <CardDescription>{feedback.category}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium mb-2">Question:</p>
                    <p className="text-gray-700">{feedback.question}</p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="font-medium mb-2">Your Answer ({feedback.wordCount} words):</p>
                    <p className="text-gray-700">{feedback.answer || "No answer provided"}</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(feedback.scores).map(([skill, score]) => (
                      <div key={skill} className="text-center">
                        <div className={`text-xl font-semibold ${getScoreColor(score as number)}`}>
                          {score as number}
                        </div>
                        <div className="text-sm text-gray-600 capitalize">{skill}</div>
                        <Progress value={score as number} className="mt-1" />
                      </div>
                    ))}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Strengths</h4>
                      <ul className="space-y-1">
                        {feedback.strengths.map((strength: string, i: number) => (
                          <li key={i} className="text-green-700 text-sm">• {strength}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Areas for Improvement</h4>
                      <ul className="space-y-1">
                        {feedback.improvements.map((improvement: string, i: number) => (
                          <li key={i} className="text-yellow-700 text-sm">• {improvement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>Skills Analysis</CardTitle>
                <CardDescription>Breakdown of your performance across different skill areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(feedbackData.overallScores).map(([skill, score]) => (
                    <div key={skill}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium capitalize">{skill}</span>
                        <span className={`font-semibold ${getScoreColor(score as number)}`}>
                          {score as number}/100
                        </span>
                      </div>
                      <Progress value={score as number} className="h-3" />
                      <p className="text-sm text-gray-600 mt-1">
                        {skill === "grammar" && "Accuracy in sentence structure and word usage"}
                        {skill === "fluency" && "Smoothness and flow of speech patterns"}
                        {skill === "confidence" && "Assertiveness and self-assurance in responses"}
                        {skill === "relevance" && "How well answers address the questions asked"}
                        {skill === "clarity" && "Clear articulation and easy-to-understand responses"}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations">
            <Card>
              <CardHeader>
                <CardTitle>Personalized Recommendations</CardTitle>
                <CardDescription>AI-generated suggestions to improve your interview performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feedbackData.recommendations.map((rec: string, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                      <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-blue-900">{rec}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white">
                  <h3 className="text-xl font-semibold mb-2">Keep Practicing!</h3>
                  <p className="mb-4">
                    Regular practice is the key to interview success. Schedule another mock interview to track your improvement.
                  </p>
                  <Button variant="secondary" onClick={() => navigate("/interview")}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Practice Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Feedback;
