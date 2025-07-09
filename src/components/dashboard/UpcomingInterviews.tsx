
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Interview {
  id: number;
  company: string;
  role: string;
  date: string;
  time: string;
  type: string;
}

interface UpcomingInterviewsProps {
  interviews: Interview[];
}

export const UpcomingInterviews = ({ interviews }: UpcomingInterviewsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Interviews</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {interviews.map((interview) => (
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
  );
};
