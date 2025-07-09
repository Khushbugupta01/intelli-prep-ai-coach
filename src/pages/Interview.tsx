
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Camera, Mic, MicOff, Play, Square, RotateCcw, FileText, Clock } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Interview = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes per question
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const questions = [
    {
      id: 1,
      type: "HR",
      question: "Tell me about yourself and why you're interested in this position.",
      category: "Introduction"
    },
    {
      id: 2,
      type: "Technical",
      question: "Describe a challenging project you worked on and how you overcame the obstacles.",
      category: "Problem Solving"
    },
    {
      id: 3,
      type: "HR",
      question: "Where do you see yourself in 5 years?",
      category: "Career Goals"
    },
    {
      id: 4,
      type: "Technical",
      question: "How would you handle a situation where you disagree with your team lead's technical decision?",
      category: "Leadership"
    },
    {
      id: 5,
      type: "HR",
      question: "What is your greatest weakness and how are you working to improve it?",
      category: "Self-Awareness"
    }
  ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;

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
    toast.success("Interview started! Good luck!");
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast.success("Recording started");
    } else {
      toast.success("Recording stopped");
    }
  };

  const nextQuestion = () => {
    // Save current answer
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = currentAnswer;
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentAnswer("");
      setTimeLeft(120);
      toast.success("Moving to next question");
    } else {
      finishInterview();
    }
  };

  const finishInterview = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    stopCamera();
    
    // Save final answer
    const finalAnswers = [...answers];
    finalAnswers[currentQuestion] = currentAnswer;
    
    // Store answers in localStorage for feedback page
    localStorage.setItem('interviewAnswers', JSON.stringify({
      questions: questions,
      answers: finalAnswers,
      timestamp: new Date().toISOString()
    }));
    
    toast.success("Interview completed! Generating feedback...");
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
    stopCamera();
    if (timerRef.current) clearInterval(timerRef.current);
    toast.success("Interview reset");
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
            <h1 className="text-3xl font-bold mb-4">Interview Preparation</h1>
            <p className="text-gray-600">Get ready for your AI-powered mock interview</p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Setup Instructions
              </CardTitle>
              <CardDescription>
                Please review the following before starting your interview
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">1</div>
                  <div>
                    <h3 className="font-semibold">Camera & Microphone</h3>
                    <p className="text-gray-600 text-sm">We'll request access to analyze your facial expressions and voice</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">2</div>
                  <div>
                    <h3 className="font-semibold">Questions Format</h3>
                    <p className="text-gray-600 text-sm">You'll answer 5 questions (HR & Technical) with 2 minutes each</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">3</div>
                  <div>
                    <h3 className="font-semibold">Response Options</h3>
                    <p className="text-gray-600 text-sm">Answer via voice recording or text input</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Interview Topics</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Introduction</Badge>
                  <Badge variant="secondary">Problem Solving</Badge>
                  <Badge variant="secondary">Career Goals</Badge>
                  <Badge variant="secondary">Leadership</Badge>
                  <Badge variant="secondary">Self-Awareness</Badge>
                </div>
              </div>

              <Button onClick={startInterview} className="w-full" size="lg">
                <Play className="mr-2 h-5 w-5" />
                Start Interview
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Mock Interview</h1>
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

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Video Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Video Feed
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
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <Button
                    size="sm"
                    variant={isRecording ? "destructive" : "default"}
                    onClick={toggleRecording}
                  >
                    {isRecording ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Question & Answer */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Current Question</CardTitle>
                <Badge variant={questions[currentQuestion].type === "HR" ? "default" : "secondary"}>
                  {questions[currentQuestion].type}
                </Badge>
              </div>
              <CardDescription>{questions[currentQuestion].category}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
                  <Badge 
                    variant={q.type === "HR" ? "default" : "secondary"} 
                    className="text-xs mb-2"
                  >
                    {q.type}
                  </Badge>
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
