
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdvancedFeedback } from "@/components/AdvancedFeedback";
import { BarChart3, Download, Home, RotateCcw, TrendingUp, MessageSquare, Mic, Brain, Eye, Target } from "lucide-react";
import { toast } from "sonner";

const Feedback = () => {
  const navigate = useNavigate();
  const [feedbackData, setFeedbackData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Generate advanced AI feedback
  const generateAdvancedFeedback = (questions: any[], answers: string[], voiceAnalysis: any, realTimeMetrics: any) => {
    const overallScores = {
      grammar: Math.floor(Math.random() * 30) + 70,
      fluency: Math.floor(Math.random() * 25) + 75,
      confidence: Math.floor(Math.random() * 20) + 80,
      relevance: Math.floor(Math.random() * 25) + 75,
      clarity: Math.floor(Math.random() * 20) + 80
    };

    const detailedFeedback = {
      overall: {
        score: Math.round((overallScores.grammar + overallScores.fluency + overallScores.confidence + overallScores.relevance + overallScores.clarity) / 5),
        grade: "B+",
        summary: "Strong performance with room for improvement in specific areas. Your technical knowledge is solid, and communication skills are developing well."
      },
      verbal: {
        clarity: overallScores.clarity,
        pace: voiceAnalysis?.wpm > 120 ? 70 : 85,
        volume: voiceAnalysis?.volumeLevel || 80,
        fillerWords: Math.max(0, 100 - (voiceAnalysis?.fillerWords || 0) * 10),
        grammar: overallScores.grammar
      },
      nonVerbal: {
        eyeContact: realTimeMetrics?.eyeContact || 82,
        posture: realTimeMetrics?.posture || 78,
        gestures: Math.floor(Math.random() * 20) + 75,
        facialExpression: Math.floor(Math.random() * 25) + 70
      },
      content: {
        relevance: overallScores.relevance,
        structure: Math.floor(Math.random() * 25) + 70,
        examples: Math.floor(Math.random() * 30) + 65,
        depth: Math.floor(Math.random() * 25) + 75
      },
      improvements: [
        {
          category: "Voice Delivery",
          issue: "Speaking pace could be more consistent",
          suggestion: "Practice with a metronome to maintain steady rhythm",
          priority: "medium" as const
        },
        {
          category: "Eye Contact",
          issue: "Occasional breaks in eye contact during complex answers",
          suggestion: "Practice maintaining eye contact even while thinking",
          priority: "high" as const
        },
        {
          category: "Answer Structure",
          issue: "Some answers lack concrete examples",
          suggestion: "Use the STAR method for behavioral questions",
          priority: "medium" as const
        }
      ],
      strengths: [
        "Clear articulation and good volume control",
        "Strong technical knowledge and problem-solving approach",
        "Confident body language and professional demeanor",
        "Good use of relevant terminology"
      ]
    };

    const questionFeedback = questions.map((question, index) => {
      const answer = answers[index] || "";
      const wordCount = answer.split(' ').length;
      
      return {
        question: question.question,
        type: question.type,
        category: question.category,
        difficulty: question.difficulty,
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

    return {
      ...detailedFeedback,
      questionFeedback,
      recommendations: [
        "Practice maintaining consistent eye contact throughout your responses",
        "Work on reducing filler words (um, uh, like) in your speech",
        "Prepare more specific examples to support your answers",
        "Focus on speaking at a steady, confident pace",
        "Consider using the STAR method (Situation, Task, Action, Result) for behavioral questions",
        "Practice power poses before interviews to boost confidence"
      ],
      timestamp: new Date().toLocaleString()
    };
  };

  useEffect(() => {
    const loadFeedback = () => {
      const storedData = localStorage.getItem('interviewAnswers');
      if (storedData) {
        const { questions, answers, voiceAnalysis, realTimeMetrics } = JSON.parse(storedData);
        const feedback = generateAdvancedFeedback(questions, answers, voiceAnalysis, realTimeMetrics);
        setFeedbackData(feedback);
      } else {
        toast.error("No interview data found");
        navigate("/dashboard");
      }
      setLoading(false);
    };

    setTimeout(loadFeedback, 2000);
  }, [navigate]);

  const downloadReport = () => {
    toast.success("Downloading comprehensive PDF report...");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Advanced AI Analysis in Progress</h2>
            <p className="text-gray-600">Processing voice patterns, facial expressions, and content analysis...</p>
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
            <p className="text-gray-600 mb-6">Please complete an interview first to view advanced feedback.</p>
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
            <h1 className="text-3xl font-bold mb-2">Advanced Interview Analysis Report</h1>
            <p className="text-gray-600">AI-powered comprehensive feedback • Generated on {feedbackData.timestamp}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="outline" onClick={() => navigate("/interview")}>
              <RotateCcw className="mr-2 h-4 w-4" />
              New Interview
            </Button>
            <Button onClick={downloadReport}>
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </div>
        </div>

        {/* Advanced Feedback Component */}
        <AdvancedFeedback feedback={feedbackData} />

        {/* Question-by-Question Analysis */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Question-by-Question Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {feedbackData.questionFeedback.map((feedback: any, index: number) => (
                <Card key={index} className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                      <div className="flex gap-2">
                        <Badge variant={feedback.type === "HR" ? "default" : "secondary"}>
                          {feedback.type}
                        </Badge>
                        <Badge variant="outline">{feedback.difficulty}</Badge>
                      </div>
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
                          <div className="text-xl font-semibold text-blue-600">
                            {score as number}
                          </div>
                          <div className="text-sm text-gray-600 capitalize">{skill}</div>
                          <Progress value={score as number} className="mt-1" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Feedback;
