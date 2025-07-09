
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const TodaysGoal = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Today's Goal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 mb-2">2/3</div>
          <p className="text-sm text-muted-foreground">Practice Sessions</p>
          <Button variant="outline" size="sm" className="mt-3">
            Complete Goal
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
