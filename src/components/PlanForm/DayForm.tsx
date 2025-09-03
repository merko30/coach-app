import { Button } from "../ui/button";
import {
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
import { SortableItem } from "./SortableItem";
import WorkoutForm from "./WorkoutForm";
import { uuidv7 } from "uuidv7";

const DayForm = ({
  weekIdx,
  dayIdx,
}: {
  weekIdx: number;
  dayIdx: number;
} & Pick<FieldArrayRenderProps, "remove">) => {
  const { values, setFieldValue } = useFormikContext<PlanFormValues>();
  const day = values.weeks[weekIdx].days[dayIdx];

  return (
    <>
      {/* Workouts DnD */}
      <FieldArray name={`weeks.${weekIdx}.days.${dayIdx}.workouts`}>
        {({ push: pushWorkout, remove: removeWorkout, move: moveWorkout }) => (
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
                {day.workouts.length === 0 && (
                  <div className="text-muted-foreground text-sm italic py-2 my-2 text-center border rounded bg-gray-50">
                    Is it a rest day?
                  </div>
                )}
                {day.workouts.map((workout, workoutIdx) => (
                  <SortableItem
                    key={workout.id}
                    id={workout.id!}
                    className="space-y-2 border border-gray-200 pr-2 my-2 rounded-md"
                  >
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
    </>
  );
};

export default DayForm;
