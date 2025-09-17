interface Workout {
  title: string;
  description?: string;
}

interface Day {
  day_of_week: number;
  workouts: Workout[];
}

interface TodaysWorkoutWidgetProps {
  week?: { days: Day[] };
  currentDayIdx: number;
}

export function TodaysWorkoutWidget({
  week,
  currentDayIdx,
}: TodaysWorkoutWidgetProps) {
  const todayDay = week?.days?.find((d) => d.day_of_week === currentDayIdx);
  const todayWorkouts = todayDay?.workouts || [];

  return (
    <div className="bg-background rounded-lg p-4 border shadow-sm flex-1">
      <div className="font-semibold mb-2">Today's Workout</div>
      {todayWorkouts.length === 0 ? (
        <div className="text-muted-foreground text-sm">
          Rest day or no workout assigned.
        </div>
      ) : (
        <ul className="list-disc list-inside text-sm space-y-1">
          {todayWorkouts.map((w, i) => (
            <li key={i}>
              <span className="font-medium">{w.title}</span>
              {w.description && (
                <span className="ml-2 text-xs text-muted-foreground">
                  {w.description}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
