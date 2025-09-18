import { Button } from "../ui/button";
import {
  FieldArray,
  FormikProvider,
  useFormik,
  useFormikContext,
} from "formik";
import { closestCenter, DndContext } from "@dnd-kit/core";
import type { DayFormValues, PlanFormValues } from "./constants";
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
  const { values: parentValues } = useFormikContext<PlanFormValues>();
  const formik = useFormik<DayFormValues>({
    initialValues: {
      id: day.id ?? uuidv7(),
      workouts: day.workouts ?? [],
    },
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      resetForm();
    },
  });

  const { setFieldValue, values, handleSubmit } = formik;

  const { workouts } = values;

  return (
    <Dialog open={open} onOpenChange={onToggle}>
      <FormikProvider value={formik}>
        {/* Workouts DnD */}
        <DialogContent className="pt-8 md:min-w-2xl lg:min-w-4xl">
          <DialogHeader>
            <DialogTitle>Day {dayIdx + 1}</DialogTitle>
          </DialogHeader>
          <div className="max-h-[600px] overflow-auto">
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
                      const oldIndex = workouts.findIndex(
                        (w) => w.id === active.id
                      );
                      const newIndex = workouts.findIndex(
                        (w) => w.id === over?.id
                      );
                      moveWorkout(oldIndex, newIndex);
                      setFieldValue(
                        `workouts`,
                        arrayMove(workouts, oldIndex, newIndex).map((w, i) => ({
                          ...w,
                          order: i,
                        }))
                      );
                    }
                  }}
                >
                  <SortableContext
                    items={workouts.map((w) => w.id!)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-2">
                      {workouts.length === 0 && (
                        <div className="text-muted-foreground text-sm italic py-2 my-2 text-center border rounded bg-gray-50">
                          Is it a rest day?
                        </div>
                      )}
                      {workouts.map((workout, workoutIdx) => (
                        <SortableItem
                          key={workout.id}
                          id={workout.id!}
                          className="space-y-2 border border-gray-200 p-2 pr-2 my-2 rounded-md"
                        >
                          <WorkoutForm
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
                            order: workouts.length,
                            title: "",
                            description: "",
                            type: parentValues.type ?? "RUN",
                            steps: [],
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
          </div>
          <DialogFooter>
            <Button type="button" onClick={() => handleSubmit()}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </FormikProvider>
    </Dialog>
  );
};

export default DayFormModal;
