import {
  Field,
  FieldArray,
  useFormikContext,
  type FieldArrayRenderProps,
} from "formik";
import type { PlanFormValues } from "./constants";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import SetForm from "./SetForm";
import { uuidv7 } from "uuidv7";
import { FormikSelect } from "../FormikSelect";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";

const WorkoutForm = ({
  weekIdx,
  dayIdx,
  workoutIdx,
  remove,
}: {
  weekIdx: number;
  dayIdx: number;
  workoutIdx: number;
} & Pick<FieldArrayRenderProps, "remove">) => {
  const { values, setFieldValue } = useFormikContext<PlanFormValues>();
  const workout = values.weeks[weekIdx].days[dayIdx].workouts[workoutIdx];

  return (
    <div className="my-4">
      <div className="flex flex-row justify-between items-center">
        <h4 className="text-xl font-semibold mb-4">
          Workout: {workout.title || `#${workoutIdx + 1}`}
        </h4>
        <Button
          type="button"
          variant="destructive"
          onClick={() => remove(workoutIdx)}
        >
          <Trash />
        </Button>
      </div>
      <div className="space-y-2">
        <Label>Title</Label>
        <Field
          name={`weeks.${weekIdx}.days.${dayIdx}.workouts.${workoutIdx}.title`}
          as={Input}
        />
        <Label>Description</Label>
        <Field
          name={`weeks.${weekIdx}.days.${dayIdx}.workouts.${workoutIdx}.description`}
          as={Textarea}
        />
        <FormikSelect
          label="Type"
          name={`weeks.${weekIdx}.days.${dayIdx}.workouts.${workoutIdx}.type`}
          options={[
            { value: "REST", label: "Rest" },
            { value: "STRENGTH", label: "Strength" },
            { value: "RUN", label: "Run" },
          ]}
          className="mb-4"
        />
      </div>
      {/* Sets DnD */}
      <FieldArray
        name={`weeks.${weekIdx}.days.${dayIdx}.workouts.${workoutIdx}.sets`}
      >
        {({ push: pushSet, remove: removeSet, move: moveSet }) => (
          <>
            <div className="flex items-center justify-between">
              <h5 className="text-lg font-semibold">Sets</h5>
              <Button
                type="button"
                onClick={() =>
                  pushSet({
                    id: uuidv7(),
                    order: workout.sets.length,
                    active_value: 0,
                    active_measure_type: "REPS",
                  })
                }
                className="block ml-auto"
              >
                Add Set
              </Button>
            </div>
            {!workout.sets.length && (
              <div className="border border-gray-200 p-4 rounded-md bg-gray-50 py-12 text-center mt-4">
                <p>No sets added yet. Click "Add Set" to get started.</p>
              </div>
            )}
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={(event) => {
                const { active, over } = event;
                if (active.id !== over?.id) {
                  const oldIndex = workout.sets.findIndex(
                    (s) => s.id === active.id
                  );
                  const newIndex = workout.sets.findIndex(
                    (s) => s.id === over?.id
                  );
                  moveSet(oldIndex, newIndex);
                  setFieldValue(
                    `weeks.${weekIdx}.days.${dayIdx}.workouts.${workoutIdx}.sets`,
                    arrayMove(workout.sets, oldIndex, newIndex).map((s, i) => ({
                      ...s,
                      order: i,
                    }))
                  );
                }
              }}
            >
              <SortableContext
                items={workout.sets.map((s) => s.id!)}
                strategy={verticalListSortingStrategy}
              >
                {workout.sets.map((set, setIdx) => (
                  <SortableItem
                    id={set.id!}
                    className="border-b border-gray-200 pr-4 py-3 last-of-type:border-b-transparent"
                  >
                    <Accordion type="single" className="w-full">
                      <AccordionItem key={set.id} value={String(set.id)}>
                        <AccordionTrigger>Set #{setIdx + 1}</AccordionTrigger>
                        <AccordionContent>
                          <SetForm
                            weekIdx={weekIdx}
                            dayIdx={dayIdx}
                            workoutIdx={workoutIdx}
                            setIdx={setIdx}
                            remove={removeSet}
                          />
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </SortableItem>
                ))}
              </SortableContext>
            </DndContext>
          </>
        )}
      </FieldArray>
    </div>
  );
};

export default WorkoutForm;
