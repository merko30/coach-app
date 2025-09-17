import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { format, differenceInCalendarDays } from "date-fns";

interface AthletePlanCardProps {
  athletePlan: {
    start_date: string;
    plan: {
      title: string;
      description: string;
      weeks_count: number;
      level: string;
      type: string;
      price: number;
    };
  };
}

export function AthleteCurrentPlanCard({ athletePlan }: AthletePlanCardProps) {
  const { plan, start_date } = athletePlan;
  // Assume each week is 7 days, progress is days since start / total days
  const startDate = new Date(start_date);
  const today = new Date();
  const daysSinceStart = Math.max(
    0,
    differenceInCalendarDays(today, startDate)
  );
  const totalDays = (plan.weeks_count || 1) * 7;
  const progress = Math.min(
    100,
    Math.round((daysSinceStart / totalDays) * 100)
  );

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>{plan.title}</CardTitle>
        <div className="flex gap-2 mt-2">
          <Badge variant="secondary">{plan.level}</Badge>
          <Badge variant="outline">{plan.type}</Badge>
          <Badge variant="default">Weeks: {plan.weeks_count}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-2">{plan.description}</p>
        <div className="mb-2 text-xs text-muted-foreground">
          Start date: {format(startDate, "yyyy-MM-dd")}
        </div>
        <div className="mb-2 text-xs text-muted-foreground">
          Progress: {progress}%
        </div>
        <Progress value={progress} className="h-3" />
      </CardContent>
    </Card>
  );
}
