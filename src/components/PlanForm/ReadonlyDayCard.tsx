import { Card, CardHeader } from "../ui/card";
import { Pen } from "lucide-react";
import { DAY_NAMES } from "@/constants";

interface ReadonlyDayCardProps {
  day: {
    day_of_week: number;
    workouts: { title: string }[];
  };
  onEdit?: () => void;
}

export function ReadonlyDayCard({ day, onEdit }: ReadonlyDayCardProps) {
  const workoutsLength = day.workouts.length;
  return (
    <Card className="flex-1 gap-2">
      <CardHeader className="text-sm uppercase font-medium text-center">
        {DAY_NAMES[day.day_of_week!]}
      </CardHeader>
      <div className="px-4 flex flex-col items-center relative">
        <p className="text-xs text-center uppercase text-muted-foreground mb-2 mt-10">
          {workoutsLength
            ? workoutsLength === 1
              ? day.workouts[0].title
              : `${workoutsLength} workouts`
            : "Rest"}
        </p>
        {onEdit && (
          <span role="button" className="cursor-pointer" onClick={onEdit}>
            <Pen />
          </span>
        )}
      </div>
    </Card>
  );
}
