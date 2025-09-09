import { Button } from "../ui/button";
import { FieldArray, FormikProvider, useFormik } from "formik";
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

type Workout = {
  id?: string | number;
  title: string;
  description?: string;
  type: string;
  sets: Array<{
    id?: string | number;
    order: number;
    active_value: number;
    active_measure_type: string;
    recovery_value?: number;
    recovery_measure_type?: string;
  }>;
};

type DayFormValues = {
  id: number | string;
  workouts: Workout[];
};

const DayFormModal = ({
  day,
  dayIdx,
  onSubmit,
  open,
  onToggle,
}: {
  day: PlanFormValues["weeks"][number]["days"][number];
  open: boolean;
  dayIdx: number;
  onSubmit: any;
  onToggle: (open: boolean) => void;
}) => {
  const formik = useFormik<DayFormValues>({
    initialValues: {
      id: day.id ?? uuidv7(),
      workouts: day.workouts ?? [],
    },
    onSubmit,
  });

  const { setFieldValue, values } = formik;

  const { workouts } = values;

  return (
    <Dialog open={open} onOpenChange={onToggle}>
      <FormikProvider value={formik}>
        {/* Workouts DnD */}
        <DialogContent className="pt-8">
          <DialogHeader>
            <DialogTitle>Day {dayIdx + 1}</DialogTitle>
          </DialogHeader>
          <FieldArray name="workouts">
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
                      `workouts`,
                      arrayMove(day.workouts, oldIndex, newIndex).map(
                        (w, i) => ({
                          ...w,
                          order: i,
                        })
                      )
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
                    {workouts.map((workout, workoutIdx) => (
                      <SortableItem
                        key={workout.id}
                        id={workout.id!}
                        className="space-y-2 border border-gray-200 pr-2 my-2 rounded-md"
                      >
                        <WorkoutForm
                          weekIdx={1}
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
          <DialogFooter>
            <Button>Save</Button>
          </DialogFooter>
        </DialogContent>
      </FormikProvider>
    </Dialog>
  );
};

export default DayFormModal;
