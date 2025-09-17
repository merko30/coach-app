import { format, differenceInCalendarDays } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface AthletePlanProgressProps {
  athletePlan: {
    started_at: string;
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

export function AthletePlanProgress({ athletePlan }: AthletePlanProgressProps) {
  const { plan, started_at } = athletePlan;
  const startDate = new Date(started_at);
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
    <div className="p-6 bg-muted rounded-lg shadow flex flex-col gap-2">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg font-bold">{plan.title}</span>
        <Badge variant="secondary">{plan.level}</Badge>
        <Badge variant="outline">{plan.type}</Badge>
        <Badge variant="default">Weeks: {plan.weeks_count}</Badge>
      </div>
      <p className="text-muted-foreground mb-1">{plan.description}</p>
      <div className="text-xs text-muted-foreground mb-1">
        Start date: {format(startDate, "yyyy-MM-dd")}
      </div>
      <div className="text-xs text-muted-foreground mb-1">
        Progress: {progress}%
      </div>
      <Progress value={progress} className="h-3" />
    </div>
  );
}
