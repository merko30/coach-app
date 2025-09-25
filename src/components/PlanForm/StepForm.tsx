import { Field, useFormikContext, type FieldArrayRenderProps } from "formik";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Trash } from "lucide-react";
import { FormikSelect } from "../FormikSelect";
import { capitalize, getFormattedOptions } from "@/lib/stringHelpers";
import { type DayFormValues, MEASURE_TYPE } from "./constants";
import { TimeInput } from "./TimeInput";
import { useSortable } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const NON_VALUE_TYPES = ["REST", "WARM_UP", "COOL_DOWN"];

export default function StepForm({
  workoutIdx,
  stepIdx,
  subStepIdx,
}: {
  workoutIdx: number;
  stepIdx: number;
  subStepIdx?: number;
}) {
  const { values, setFieldValue } = useFormikContext<DayFormValues>();
  console.log(
    subStepIdx,
    stepIdx,
    workoutIdx,
    values.workouts[workoutIdx].steps[stepIdx]
  );

  const step = subStepIdx
    ? values.workouts[workoutIdx].steps[stepIdx].steps?.[subStepIdx]
    : values.workouts[workoutIdx].steps[stepIdx];
  const type = step.type;
  const isTimeType = type === "TIME";
  const isRepeat = type === "REPEAT";

  // Make id predictable
  const stepId = step.id ?? `step-${workoutIdx}-${stepIdx}`;

  // Sortable (normal steps)
  const sortable = useSortable({ id: stepId });
  // Droppable (repeat steps)
  const droppable = useDroppable({ id: `repeat-${stepId}` });

  const style = {
    ...(sortable.transform && {
      transform: CSS.Transform.toString(sortable.transform),
    }),
    ...(sortable.transition && { transition: sortable.transition }),
    opacity: sortable.isDragging ? 0.5 : 1,
    zIndex: sortable.isDragging ? 50 : undefined,
  };

  if (isRepeat) {
    const substeps = step.steps ?? [];
    return (
      <div
        ref={droppable.setNodeRef}
        style={style}
        className={`relative rounded-md border p-4 ${
          droppable.isOver ? "bg-blue-50 border-blue-400" : "border-gray-300"
        }`}
      >
        <div className="flex flex-row justify-between items-center mb-2">
          <span className="text-lg font-semibold">Repeat</span>
          <div className="flex items-center gap-1">
            <Label className="mr-1">Reps</Label>
            <Field
              name={`workouts.${workoutIdx}.steps.${stepIdx}.repetitions`}
              as={Input}
              type="number"
              min={1}
              className="w-16"
            />
          </div>
        </div>

        {substeps.length === 0 ? (
          <div className="border border-dashed border-gray-400 rounded p-4 my-2 bg-gray-50 text-center text-gray-500">
            Drag steps here to add to this repeat
          </div>
        ) : (
          <SortableContext
            items={substeps.map((s) => s.id!)}
            strategy={verticalListSortingStrategy}
          >
            {substeps.map((sub, subIdx) => (
              <div key={sub.id} className="ml-4">
                <StepForm
                  workoutIdx={workoutIdx}
                  stepIdx={stepIdx /* parent */}
                  // if you want nested, you'd need a subStepForm
                />
              </div>
            ))}
          </SortableContext>
        )}
      </div>
    );
  }

  return (
    <div
      ref={sortable.setNodeRef}
      style={style}
      {...sortable.attributes}
      {...sortable.listeners}
      className="relative border rounded-md p-4 mb-2 bg-white"
    >
      <div className="flex flex-row justify-between items-center">
        <span className="text-lg font-semibold mb-3">Step</span>
        <Button
          type="button"
          variant="destructive"
          onClick={() =>
            setFieldValue(
              `workouts.${workoutIdx}.steps`,
              values.workouts[workoutIdx].steps.filter((_, i) => i !== stepIdx)
            )
          }
        >
          <Trash />
        </Button>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <Label>Name (optional)</Label>
          <Field
            name={`workouts.${workoutIdx}.steps.${stepIdx}.name`}
            placeholder="Push-ups, VO2 max interval..."
            as={Input}
          />
        </div>
        <div className="flex-1 flex items-center gap-2">
          <div className="flex-1">
            <Label>Type</Label>
            <FormikSelect
              name={`workouts.${workoutIdx}.steps.${stepIdx}.type`}
              className="input"
              onChange={() => {
                setFieldValue(
                  `workouts.${workoutIdx}.steps.${stepIdx}.value`,
                  0
                );
              }}
              options={getFormattedOptions(MEASURE_TYPE)}
            />
          </div>
          {!NON_VALUE_TYPES.includes(type) && (
            <div className="flex-1">
              {!isTimeType && <Label>{capitalize(type)}</Label>}
              {isTimeType ? (
                <TimeInput
                  className="flex-1"
                  onChange={(seconds: number) =>
                    setFieldValue(
                      `workouts.${workoutIdx}.steps.${stepIdx}.value`,
                      seconds
                    )
                  }
                />
              ) : (
                <Field
                  name={`workouts.${workoutIdx}.steps.${stepIdx}.value`}
                  as={Input}
                  type="number"
                  className="w-full"
                />
              )}
            </div>
          )}
        </div>
      </div>
      <Field
        name={`workouts.${workoutIdx}.steps.${stepIdx}.description`}
        as={Input}
        placeholder="Description (optional)"
      />
    </div>
  );
}
