
import { Brain, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const QuickActions = () => {
  const navigate = useNavigate();

  return (
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
  );
};
