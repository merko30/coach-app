import {
  Field,
  FieldArray,
  useFormikContext,
  type FieldArrayRenderProps,
} from "formik";
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
import StepForm from "./StepForm";
import { uuidv7 } from "uuidv7";
import { FormikSelect } from "../FormikSelect";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";
import type { DayFormValues } from "./constants";
import { WORKOUT_TYPE } from "./constants";
import { getFormattedOptions } from "@/lib/stringHelpers";

const WorkoutForm = ({
  workoutIdx,
  remove,
}: { workoutIdx: number } & Pick<FieldArrayRenderProps, "remove">) => {
  const { values, setFieldValue } = useFormikContext<DayFormValues>();
  const workout = values.workouts[workoutIdx];

  return (
    <div className="my-4">
      <div className="flex flex-row justify-between items-center">
        <h4 className="text-xl font-semibold mb-4">
          Workout: {workout.title || `#${workoutIdx + 1}`}
        </h4>
        {values.workouts.length > 1 && (
          <Button
            type="button"
            variant="destructive"
            onClick={() => remove(workoutIdx)}
          >
            <Trash />
          </Button>
        )}
      </div>
      <div className="space-y-2">
        <Label>Title</Label>
        <Field name={`workouts.${workoutIdx}.title`} as={Input} />
        <Label>Description</Label>
        <Field name={`workouts.${workoutIdx}.description`} as={Textarea} />
        <FormikSelect
          label="Type"
          name={`workouts.${workoutIdx}.type`}
          options={getFormattedOptions(WORKOUT_TYPE)}
          className="mb-4"
        />
      </div>
      {/* Steps DnD */}
      <FieldArray name={`workouts.${workoutIdx}.steps`}>
        {({ push: pushStep, remove: removeStep, move: moveStep }) => (
          <>
            <div className="flex items-center justify-between">
              <h5 className="text-lg font-semibold">Steps</h5>
              <Button
                type="button"
                onClick={() =>
                  pushStep({
                    id: uuidv7(),
                    order: workout.steps.length,
                    value: 0,
                    type: "REPS",
                    repetitions: 1,
                  })
                }
                className="block ml-auto"
              >
                Add Step
              </Button>
            </div>
            {!workout.steps.length && (
              <div className="border border-gray-200 p-4 rounded-md bg-gray-50 py-12 text-center mt-4">
                <p>No workout steps added yet.</p>
              </div>
            )}
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={(event) => {
                const { active, over } = event;
                if (active.id !== over?.id) {
                  const oldIndex = workout.steps.findIndex(
                    (s) => s.id === active.id
                  );
                  const newIndex = workout.steps.findIndex(
                    (s) => s.id === over?.id
                  );
                  moveStep(oldIndex, newIndex);
                  setFieldValue(
                    `workouts.${workoutIdx}.steps`,
                    arrayMove(workout.steps, oldIndex, newIndex).map(
                      (s, i) => ({
                        ...s,
                        order: i,
                      })
                    )
                  );
                }
              }}
            >
              <SortableContext
                items={workout.steps.map((s) => s.id!)}
                strategy={verticalListSortingStrategy}
              >
                {workout.steps.map((step, stepIdx) => (
                  <SortableItem
                    id={step.id!}
                    key={step.id!}
                    className="border-b border-gray-200 pr-4 py-3 last-of-type:border-b-transparent"
                  >
                    <Accordion type="single" className="w-full">
                      <AccordionItem key={step.id} value={String(step.id)}>
                        <AccordionTrigger>Step #{stepIdx + 1}</AccordionTrigger>
                        <AccordionContent>
                          <StepForm
                            workoutIdx={workoutIdx}
                            stepIdx={stepIdx}
                            remove={removeStep}
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
