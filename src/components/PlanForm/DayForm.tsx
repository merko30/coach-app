import { Trash } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import {
  Field,
  FieldArray,
  useFormikContext,
  type FieldArrayRenderProps,
} from "formik";
import { closestCenter, DndContext } from "@dnd-kit/core";
import type { PlanFormValues } from "./constants";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { SortableItem } from "./SortableItem";
import WorkoutForm from "./WorkoutForm";
import { uuidv7 } from "uuidv7";

const DayForm = ({
  weekIdx,
  dayIdx,
  remove,
}: {
  weekIdx: number;
  dayIdx: number;
} & Pick<FieldArrayRenderProps, "remove">) => {
  const { values, setFieldValue } = useFormikContext<PlanFormValues>();
  const day = values.weeks[weekIdx].days[dayIdx];

  return (
    <Card key={day.order} size="compact">
      <CardHeader
        className="flex flex-row justify-between items-center"
        size="compact"
      >
        <span>Day {day.id}</span>
        <Button
          type="button"
          variant="destructive"
          onClick={() => remove(dayIdx)}
        >
          <Trash />
        </Button>
      </CardHeader>
      <CardContent size="compact">
        {/* Workouts DnD */}
        <FieldArray name={`weeks.${weekIdx}.days.${dayIdx}.workouts`}>
          {({
            push: pushWorkout,
            remove: removeWorkout,
            move: moveWorkout,
          }) => (
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={(event) => {
                const { active, over } = event;
                if (active.id !== over?.id) {
                  const oldIndex = day.workouts.findIndex(
                    (w) => w.id === active.id
                  );
                  const newIndex = day.workouts.findIndex(
                    (w) => w.id === over?.id
                  );
                  moveWorkout(oldIndex, newIndex);
                  setFieldValue(
                    `weeks.${weekIdx}.days.${dayIdx}.workouts`,
                    arrayMove(day.workouts, oldIndex, newIndex).map((w, i) => ({
                      ...w,
                      order: i,
                    }))
                  );
                }
              }}
            >
              <SortableContext
                items={day.workouts.map((w) => w.id!)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  {day.workouts.map((workout, workoutIdx) => (
                    <SortableItem key={workout.id} id={workout.id!}>
                      <WorkoutForm
                        weekIdx={weekIdx}
                        dayIdx={dayIdx}
                        workoutIdx={workoutIdx}
                        remove={removeWorkout}
                      />
                    </SortableItem>
                  ))}
                  <Button
                    type="button"
                    onClick={() =>
                      pushWorkout({
                        id: uuidv7(),
                        order: day.workouts.length,
                        title: "",
                        description: "",
                        type: "REST",
                        sets: [],
                      })
                    }
                  >
                    Add Workout
                  </Button>
                </div>
              </SortableContext>
            </DndContext>
          )}
        </FieldArray>
      </CardContent>
    </Card>
  );
};

export default DayForm;
