
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Eye, Mic, MessageSquare, Target, TrendingUp } from "lucide-react";

interface DetailedFeedback {
  overall: {
    score: number;
    grade: string;
    summary: string;
  };
  verbal: {
    clarity: number;
    pace: number;
    volume: number;
    fillerWords: number;
    grammar: number;
  };
  nonVerbal: {
    eyeContact: number;
    posture: number;
    gestures: number;
    facialExpression: number;
  };
  content: {
    relevance: number;
    structure: number;
    examples: number;
    depth: number;
  };
  improvements: Array<{
    category: string;
    issue: string;
    suggestion: string;
    priority: "high" | "medium" | "low";
  }>;
  strengths: string[];
}

interface AdvancedFeedbackProps {
  feedback: DetailedFeedback;
}

export const AdvancedFeedback = ({ feedback }: AdvancedFeedbackProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "default";
    }
  };

  const ScoreCard = ({ title, score, icon }: { title: string; score: number; icon: React.ReactNode }) => (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {icon}
            <span className="text-sm font-medium">{title}</span>
          </div>
          <span className={`text-lg font-bold ${getScoreColor(score)}`}>{score}%</span>
        </div>
        <Progress value={score} className="h-2" />
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Overall Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-4">
            <div className={`text-4xl font-bold mb-2 ${getScoreColor(feedback.overall.score)}`}>
              {feedback.overall.score}%
            </div>
            <Badge variant="outline" className="text-lg px-3 py-1">
              {feedback.overall.grade}
            </Badge>
          </div>
          <p className="text-center text-muted-foreground">{feedback.overall.summary}</p>
        </CardContent>
      </Card>

      {/* Detailed Analysis */}
      <Tabs defaultValue="verbal" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="verbal" className="flex items-center gap-2">
            <Mic className="h-4 w-4" />
            Verbal
          </TabsTrigger>
          <TabsTrigger value="nonverbal" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Non-Verbal
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Content
          </TabsTrigger>
        </TabsList>

        <TabsContent value="verbal" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ScoreCard 
              title="Clarity" 
              score={feedback.verbal.clarity} 
              icon={<MessageSquare className="h-4 w-4" />} 
            />
            <ScoreCard 
              title="Speaking Pace" 
              score={feedback.verbal.pace} 
              icon={<TrendingUp className="h-4 w-4" />} 
            />
            <ScoreCard 
              title="Volume Level" 
              score={feedback.verbal.volume} 
              icon={<Mic className="h-4 w-4" />} 
            />
            <ScoreCard 
              title="Grammar" 
              score={feedback.verbal.grammar} 
              icon={<Brain className="h-4 w-4" />} 
            />
          </div>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Filler Words Count</span>
                <span className="text-lg font-bold text-orange-600">{feedback.verbal.fillerWords}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Words like "um", "uh", "like" can reduce clarity
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nonverbal" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ScoreCard 
              title="Eye Contact" 
              score={feedback.nonVerbal.eyeContact} 
              icon={<Eye className="h-4 w-4" />} 
            />
            <ScoreCard 
              title="Posture" 
              score={feedback.nonVerbal.posture} 
              icon={<Target className="h-4 w-4" />} 
            />
            <ScoreCard 
              title="Hand Gestures" 
              score={feedback.nonVerbal.gestures} 
              icon={<TrendingUp className="h-4 w-4" />} 
            />
            <ScoreCard 
              title="Facial Expression" 
              score={feedback.nonVerbal.facialExpression} 
              icon={<Brain className="h-4 w-4" />} 
            />
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ScoreCard 
              title="Relevance" 
              score={feedback.content.relevance} 
              icon={<Target className="h-4 w-4" />} 
            />
            <ScoreCard 
              title="Structure" 
              score={feedback.content.structure} 
              icon={<Brain className="h-4 w-4" />} 
            />
            <ScoreCard 
              title="Examples Used" 
              score={feedback.content.examples} 
              icon={<MessageSquare className="h-4 w-4" />} 
            />
            <ScoreCard 
              title="Answer Depth" 
              score={feedback.content.depth} 
              icon={<TrendingUp className="h-4 w-4" />} 
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Strengths */}
      <Card>
        <CardHeader>
          <CardTitle className="text-green-700">Key Strengths</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {feedback.strengths.map((strength, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-800">{strength}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Improvement Areas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-orange-700">Areas for Improvement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {feedback.improvements.map((improvement, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{improvement.category}</span>
                  <Badge variant={getPriorityColor(improvement.priority) as any}>
                    {improvement.priority} priority
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{improvement.issue}</p>
                <p className="text-sm text-blue-700 bg-blue-50 p-2 rounded">
                  💡 {improvement.suggestion}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
