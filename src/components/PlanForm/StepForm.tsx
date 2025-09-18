import { Field, useFormikContext, type FieldArrayRenderProps } from "formik";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Trash } from "lucide-react";
import { FormikSelect } from "../FormikSelect";
import { capitalize, getFormattedOptions } from "@/lib/stringHelpers";
import { type DayFormValues, MEASURE_TYPE } from "./constants";

const NON_VALUE_TYPES = ["REST", "WARM_UP", "COOL_DOWN"];

const StepForm = ({
  workoutIdx,
  stepIdx,
  remove,
}: {
  workoutIdx: number;
  stepIdx: number;
} & Pick<FieldArrayRenderProps, "remove">) => {
  const { values } = useFormikContext<DayFormValues>();
  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <span className="text-lg font-semibold mb-3">Step #{stepIdx + 1}</span>
        <Button
          type="button"
          variant="destructive"
          onClick={() => remove(stepIdx)}
        >
          <Trash />
        </Button>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <div>
            <Label>Name (optional)</Label>
            <Field
              name={`workouts.${workoutIdx}.steps.${stepIdx}.name`}
              placeholder="Push-ups, VO2 max interval..."
              as={Input}
            />
          </div>
        </div>
        <div className="flex-1 flex items-center gap-2">
          <div className="flex-1">
            <Label>Type</Label>
            <FormikSelect
              name={`workouts.${workoutIdx}.steps.${stepIdx}.type`}
              className="input"
              options={getFormattedOptions(MEASURE_TYPE)}
            />
          </div>
          {!NON_VALUE_TYPES.includes(
            values.workouts[workoutIdx].steps[stepIdx].type
          ) && (
            <div className="flex-1">
              <Label>
                {capitalize(values.workouts[workoutIdx].steps[stepIdx].type)}
              </Label>
              <Field
                name={`workouts.${workoutIdx}.steps.${stepIdx}.value`}
                as={Input}
                type="number"
              />
            </div>
          )}
          <div className="flex-1">
            <Label>Repeat</Label>
            <Field
              name={`workouts.${workoutIdx}.steps.${stepIdx}.repetitions`}
              as={Input}
              type="number"
            />
          </div>
        </div>
      </div>
      <Field
        name={`workouts.${workoutIdx}.steps.${stepIdx}.description`}
        as={Input}
        placeholder="Description (optional)"
      />
    </>
  );
};

export default StepForm;
