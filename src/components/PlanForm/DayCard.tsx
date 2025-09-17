import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardHeader } from "../ui/card";
import { GripVertical, Pen } from "lucide-react";
import type { PlanFormValues } from "./constants";
import { DAY_NAMES } from "@/constants";

const DayCard = ({
  day,
  onEdit,
}: {
  day: PlanFormValues["weeks"][number]["days"][number];
  onEdit: () => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: day.day_of_week! });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : undefined,
  };

  const workoutsLength = day.workouts.length;
  return (
    <Card
      className="flex-1 gap-2"
      ref={setNodeRef}
      {...attributes}
      style={style}
    >
      <CardHeader className="text-sm uppercase font-medium text-center">
        {DAY_NAMES[day.day_of_week!]}
      </CardHeader>
      <div className="px-4 flex flex-col items-center relative">
        <button
          type="button"
          {...listeners}
          className="absolute left-1/2 -translate-x-1/2 p-1 cursor-grab text-muted-foreground hover:text-foreground"
          tabIndex={-1}
          aria-label="Drag handle"
        >
          <GripVertical className="size-6" />
        </button>
        <p className="text-xs text-center uppercase text-muted-foreground mb-2 mt-10">
          {workoutsLength
            ? workoutsLength === 1
              ? day.workouts[0].title
              : `${workoutsLength} workouts`
            : "Rest"}
        </p>
        <span role="button" className="cursor-pointer" onClick={onEdit}>
          <Pen />
        </span>
      </div>
    </Card>
  );
};

export default DayCard;
