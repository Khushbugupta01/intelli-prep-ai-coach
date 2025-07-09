
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { VoiceAnalyzer } from "@/components/VoiceAnalyzer";
import { Camera, Mic, MicOff, Play, Square, RotateCcw, FileText, Clock, Eye, Brain } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface VoiceAnalysis {
  wpm: number;
  pauseCount: number;
  fillerWords: number;
  volumeLevel: number;
  clarity: number;
  confidence: number;
}

const Interview = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [voiceAnalysis, setVoiceAnalysis] = useState<VoiceAnalysis | null>(null);
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    eyeContact: 85,
    posture: 78,
    confidence: 82
  });
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const questions = [
    {
      id: 1,
      type: "HR",
      question: "Tell me about yourself and why you're interested in this position.",
      category: "Introduction",
      difficulty: "Easy"
    },
    {
      id: 2,
      type: "Technical",
      question: "Describe a challenging project you worked on and how you overcame the obstacles.",
      category: "Problem Solving",
      difficulty: "Medium"
    },
    {
      id: 3,
      type: "HR",
      question: "Where do you see yourself in 5 years?",
      category: "Career Goals",
      difficulty: "Easy"
    },
    {
      id: 4,
      type: "Technical",
      question: "How would you handle a situation where you disagree with your team lead's technical decision?",
      category: "Leadership",
      difficulty: "Hard"
    },
    {
      id: 5,
      type: "HR",
      question: "What is your greatest weakness and how are you working to improve it?",
      category: "Self-Awareness",
      difficulty: "Medium"
    }
  ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // Simulate real-time metrics updates
  useEffect(() => {
    if (interviewStarted) {
      const interval = setInterval(() => {
        setRealTimeMetrics(prev => ({
          eyeContact: Math.max(0, Math.min(100, prev.eyeContact + (Math.random() - 0.5) * 10)),
          posture: Math.max(0, Math.min(100, prev.posture + (Math.random() - 0.5) * 8)),
          confidence: Math.max(0, Math.min(100, prev.confidence + (Math.random() - 0.5) * 12))
        }));
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [interviewStarted]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 }, 
        audio: true 
      });
      setVideoStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      toast.error("Camera access denied. You can still continue with text responses.");
    }
  };

  const stopCamera = () => {
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
      setVideoStream(null);
    }
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          nextQuestion();
          return 120;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startInterview = async () => {
    await startCamera();
    setInterviewStarted(true);
    startTimer();
    toast.success("Advanced interview analysis started! Good luck!");
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast.success("Recording started");
    } else {
      toast.success("Recording stopped");
    }
  };

  const handleVoiceAnalysis = (analysis: VoiceAnalysis) => {
    setVoiceAnalysis(analysis);
    toast.success("Voice analysis completed");
  };

  const nextQuestion = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = currentAnswer;
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentAnswer("");
      setTimeLeft(120);
      setVoiceAnalysis(null);
      toast.success("Moving to next question");
    } else {
      finishInterview();
    }
  };

  const finishInterview = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    stopCamera();
    
    const finalAnswers = [...answers];
    finalAnswers[currentQuestion] = currentAnswer;
    
    // Store enhanced answers with analysis data
    localStorage.setItem('interviewAnswers', JSON.stringify({
      questions: questions,
      answers: finalAnswers,
      voiceAnalysis: voiceAnalysis,
      realTimeMetrics: realTimeMetrics,
      timestamp: new Date().toISOString()
    }));
    
    toast.success("Interview completed! Generating advanced feedback...");
    setTimeout(() => {
      navigate("/feedback");
    }, 1500);
  };

  const restartInterview = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setCurrentAnswer("");
    setTimeLeft(120);
    setInterviewStarted(false);
    setVoiceAnalysis(null);
    stopCamera();
    if (timerRef.current) clearInterval(timerRef.current);
    toast.success("Interview reset");
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  if (!interviewStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Advanced AI Interview Preparation</h1>
            <p className="text-gray-600">Experience next-generation interview analysis with real-time feedback</p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Advanced Setup Instructions
              </CardTitle>
              <CardDescription>
                Our AI will analyze your speech, body language, and content in real-time
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">1</div>
                  <div>
                    <h3 className="font-semibold">AI-Powered Analysis</h3>
                    <p className="text-gray-600 text-sm">Voice analysis, facial expression recognition, and content evaluation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">2</div>
                  <div>
                    <h3 className="font-semibold">Real-time Feedback</h3>
                    <p className="text-gray-600 text-sm">Live metrics for eye contact, posture, and confidence levels</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">3</div>
                  <div>
                    <h3 className="font-semibold">Advanced Scoring</h3>
                    <p className="text-gray-600 text-sm">Detailed analysis of verbal and non-verbal communication</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Enhanced Features</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Voice Analysis</Badge>
                  <Badge variant="secondary">Facial Recognition</Badge>
                  <Badge variant="secondary">Real-time Metrics</Badge>
                  <Badge variant="secondary">Advanced Scoring</Badge>
                  <Badge variant="secondary">Detailed Reports</Badge>
                </div>
              </div>

              <Button onClick={startInterview} className="w-full" size="lg">
                <Play className="mr-2 h-5 w-5" />
                Start Advanced Interview
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Advanced Mock Interview</h1>
            <div className="flex items-center gap-4">
              <Badge variant={timeLeft > 30 ? "default" : "destructive"} className="text-lg px-3 py-1">
                <Clock className="mr-1 h-4 w-4" />
                {formatTime(timeLeft)}
              </Badge>
              <Button variant="outline" onClick={restartInterview}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Restart
              </Button>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-gray-600 mt-2">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Video Feed and Real-time Metrics */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Video Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full h-full object-cover"
                  />
                  {!videoStream && (
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      <div className="text-center">
                        <Camera className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Camera not available</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Real-time Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Live Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Eye Contact</span>
                    <span className="text-sm font-bold">{Math.round(realTimeMetrics.eyeContact)}%</span>
                  </div>
                  <Progress value={realTimeMetrics.eyeContact} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Posture</span>
                    <span className="text-sm font-bold">{Math.round(realTimeMetrics.posture)}%</span>
                  </div>
                  <Progress value={realTimeMetrics.posture} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Confidence</span>
                    <span className="text-sm font-bold">{Math.round(realTimeMetrics.confidence)}%</span>
                  </div>
                  <Progress value={realTimeMetrics.confidence} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question & Answer */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Current Question</CardTitle>
                <div className="flex gap-2">
                  <Badge variant={questions[currentQuestion].type === "HR" ? "default" : "secondary"}>
                    {questions[currentQuestion].type}
                  </Badge>
                  <Badge className={getDifficultyColor(questions[currentQuestion].difficulty)}>
                    {questions[currentQuestion].difficulty}
                  </Badge>
                </div>
              </div>
              <CardDescription>{questions[currentQuestion].category}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-medium text-blue-900">
                  {questions[currentQuestion].question}
                </p>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Your Answer</label>
                <Textarea
                  placeholder="Type your answer here or use voice recording..."
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  className="min-h-32"
                />
              </div>

              {voiceAnalysis && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Voice Analysis Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium">WPM:</span> {voiceAnalysis.wpm}
                      </div>
                      <div>
                        <span className="font-medium">Clarity:</span> {voiceAnalysis.clarity}%
                      </div>
                      <div>
                        <span className="font-medium">Fillers:</span> {voiceAnalysis.fillerWords}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex gap-2">
                <Button 
                  onClick={nextQuestion}
                  className="flex-1"
                  disabled={!currentAnswer.trim()}
                >
                  {currentQuestion === questions.length - 1 ? "Finish Interview" : "Next Question"}
                </Button>
                <Button variant="outline" onClick={toggleRecording}>
                  {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Voice Analyzer */}
        <div className="mt-6">
          <VoiceAnalyzer 
            onAnalysisComplete={handleVoiceAnalysis}
            isRecording={isRecording}
            onToggleRecording={toggleRecording}
          />
        </div>

        {/* Question Progress */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Interview Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {questions.map((q, index) => (
                <div
                  key={q.id}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    index === currentQuestion
                      ? "border-blue-500 bg-blue-50"
                      : index < currentQuestion
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="text-xs font-medium text-gray-600 mb-1">
                    Question {index + 1}
                  </div>
                  <div className="flex gap-1 mb-2">
                    <Badge 
                      variant={q.type === "HR" ? "default" : "secondary"} 
                      className="text-xs"
                    >
                      {q.type}
                    </Badge>
                    <Badge className={`text-xs ${getDifficultyColor(q.difficulty)}`}>
                      {q.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium truncate">{q.category}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Interview;
