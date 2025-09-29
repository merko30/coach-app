import { useQuery } from "@tanstack/react-query";
import { PlanCards } from "../PlanCards";
import plansService from "@/services/plans";
import { useAuth } from "@/context/AuthProvider";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TodaysWorkoutWidget } from "./TodaysWorkoutWidget";
import { CalendarViewWidget } from "./CalendarViewWidget";
import { format, differenceInCalendarDays } from "date-fns";

const AthleteDashboard = () => {
  const { user } = useAuth();
  const {
    data: plansReponse,
    isPending: plansLoading,
    error: plansError,
  } = useQuery({
    queryFn: plansService.get,
    queryKey: ["plans"],
  });

  const plansData = plansReponse?.data;

  if (plansLoading) {
    return <div>Loading...</div>;
  }

  if (user.plans && user.plans?.length) {
    const athletePlan = user.plans[0];
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
    const currentWeekIdx = Math.floor(daysSinceStart / 7);
    const currentDayIdx = (startDate.getDay() + daysSinceStart) % 7;
    const week = plan.weeks?.[currentWeekIdx];

    return (
      <div className="p-6 bg-muted rounded-lg shadow flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center md:gap-8 gap-4">
          {/* Progress */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg font-bold">{plan.title}</span>
              <Badge variant="secondary">{plan.level}</Badge>
              <Badge variant="outline">{plan.type}</Badge>
              <Badge variant="default">Weeks: {plan.weeks_count}</Badge>
            </div>
            <p className="text-muted-foreground mb-1">{plan.description}</p>
            <div className="text-xs text-muted-foreground mb-4">
              Start date: {format(startDate, "yyyy-MM-dd")}
            </div>
            <div className="text-xs text-muted-foreground mb-1">
              Progress: {progress}%
            </div>
            <Progress value={progress} className="h-3" />
          </div>
          {/* Today's Workout Widget */}
          <TodaysWorkoutWidget week={week} currentDayIdx={currentDayIdx} />
        </div>
        {/* Calendar View Widget */}
        <CalendarViewWidget
          week={week}
          startDate={startDate}
          daysSinceStart={daysSinceStart}
          currentDayIdx={currentDayIdx}
        />
      </div>
    );
  }

  if (plansData && plansData.length) {
    return (
      <div>
        <h1 className="text-2xl font-semibold">Start today, pick your plan</h1>
        <PlanCards plans={plansData} />
      </div>
    );
  }
};

export default AthleteDashboard;
