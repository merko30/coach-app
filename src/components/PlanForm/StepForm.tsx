import { Field, useFormikContext } from "formik";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Trash } from "lucide-react";
import { FormikSelect } from "../FormikSelect";
import { capitalize, getFormattedOptions } from "@/lib/stringHelpers";
import { type DayFormValues, MEASURE_TYPE } from "./constants";
import { TimeInput } from "./TimeInput";
import { twMerge } from "tailwind-merge";

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

  const step = subStepIdx
    ? values.workouts[workoutIdx].steps[stepIdx].steps?.[subStepIdx]
    : values.workouts[workoutIdx].steps[stepIdx];
  const type = step.type;
  const isTimeType = type === "TIME";
  const isRepeat = type === "REPEAT";

  if (isRepeat) {
    const substeps = step.steps ?? [];
    return (
      <div className={twMerge("relative w-full h-full rounded-md border p-4")}>
        <div className="w-full flex flex-row justify-between items-center p-3 mb-2">
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
          substeps.map((sub, subIdx) => (
            <div key={sub.id} className="w-full ml-4">
              <StepForm
                workoutIdx={workoutIdx}
                stepIdx={stepIdx}
                subStepIdx={subIdx}
              />
            </div>
          ))
        )}
      </div>
    );
  }

  return (
    <div className="w-full relative border rounded-md p-4 mb-2 bg-white">
      <div className="w-full flex flex-row justify-between items-center">
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
      <div className="w-full flex flex-col md:flex-row gap-4 mb-4">
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
