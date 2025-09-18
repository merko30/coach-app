import { Field, useFormikContext, type FieldArrayRenderProps } from "formik";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Trash } from "lucide-react";
import { FormikSelect } from "../FormikSelect";
import { capitalize, getFormattedOptions } from "@/lib/stringHelpers";
import { type DayFormValues, MEASURE_TYPE } from "./constants";

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
      <div>
        <Label>Name</Label>
        <Field
          name={`workouts.${workoutIdx}.steps.${stepIdx}.name`}
          as={Input}
        />
      </div>
      <div>
        <Label>Description</Label>
        <Field
          name={`workouts.${workoutIdx}.steps.${stepIdx}.description`}
          as={Input}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label>
            {capitalize(values.workouts[workoutIdx].steps[stepIdx].type)}
          </Label>
          <Field
            name={`workouts.${workoutIdx}.steps.${stepIdx}.active_value`}
            as={Input}
            type="number"
          />
        </div>
        <div>
          <Label>Type</Label>
          <FormikSelect
            name={`workouts.${workoutIdx}.steps.${stepIdx}.type`}
            className="input"
            options={getFormattedOptions(MEASURE_TYPE)}
          />
        </div>
      </div>
    </>
  );
};

export default StepForm;
