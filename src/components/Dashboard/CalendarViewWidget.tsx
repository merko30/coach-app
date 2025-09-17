import { format, addDays, startOfWeek } from "date-fns";

interface Workout {
  title: string;
  description?: string;
}

interface Day {
  day_of_week: number;
  workouts: Workout[];
}

interface CalendarViewWidgetProps {
  week?: { days: Day[] };
  startDate: Date;
  daysSinceStart: number;
  currentDayIdx: number;
}

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function CalendarViewWidget({
  week,
  startDate,
  daysSinceStart,
  currentDayIdx,
}: CalendarViewWidgetProps) {
  const weekStart = startOfWeek(addDays(startDate, daysSinceStart), {
    weekStartsOn: 0,
  });
  const calendarDays = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(weekStart, i);
    const day = week?.days?.find((d) => d.day_of_week === i);
    return { label: DAY_LABELS[i], date, day };
  });

  return (
    <div className="bg-background rounded-lg p-4 border shadow-sm">
      <div className="font-semibold mb-2">This Week</div>
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map(({ label, date, day }, i) => (
          <div
            key={i}
            className={`flex flex-col items-center p-2 rounded-lg ${i === currentDayIdx ? "bg-green-100 border-green-400 border" : ""}`}
          >
            <div className="text-xs font-semibold mb-1">{label}</div>
            <div className="text-xs mb-1">{format(date, "MM/dd")}</div>
            {day?.workouts?.length ? (
              <div className="text-green-700 text-xs font-medium">
                {day.workouts.length} workout
                {day.workouts.length > 1 ? "s" : ""}
              </div>
            ) : (
              <div className="text-muted-foreground text-xs">Rest</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
