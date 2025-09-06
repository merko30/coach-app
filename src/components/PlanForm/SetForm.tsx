import { Field, type FieldArrayRenderProps } from "formik";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Trash } from "lucide-react";
import { FormikSelect } from "../FormikSelect";
import { getFormattedOptions } from "@/lib/camelCase";
import { MEASURE_TYPE } from "./constants";

const SetForm = ({
  weekIdx,
  dayIdx,
  workoutIdx,
  setIdx,
  remove,
}: {
  weekIdx: number;
  dayIdx: number;
  workoutIdx: number;
  setIdx: number;
} & Pick<FieldArrayRenderProps, "remove">) => {
  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <span className="text-lg font-semibold mb-3">Set #{setIdx + 1}</span>
        <Button
          type="button"
          variant="destructive"
          onClick={() => remove(setIdx)}
        >
          <Trash />
        </Button>
      </div>
      <div>
        <Label>Name</Label>
        <Field
          name={`weeks.${weekIdx}.days.${dayIdx}.workouts.${workoutIdx}.sets.${setIdx}.name`}
          as={Input}
        />
      </div>
      <div>
        <Label>Description</Label>
        <Field
          name={`weeks.${weekIdx}.days.${dayIdx}.workouts.${workoutIdx}.sets.${setIdx}.description`}
          as={Input}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label>Active (reps, time, distance (m))</Label>
          <Field
            name={`weeks.${weekIdx}.days.${dayIdx}.workouts.${workoutIdx}.sets.${setIdx}.active_value`}
            as={Input}
            type="number"
          />
        </div>
        <div>
          <Label>Active Measure</Label>
          <FormikSelect
            name={`weeks.${weekIdx}.days.${dayIdx}.workouts.${workoutIdx}.sets.${setIdx}.active_measure_type`}
            className="input"
            options={getFormattedOptions(MEASURE_TYPE)}
          ></FormikSelect>
        </div>
        <div>
          <Label>Recovery Value</Label>
          <Field
            name={`weeks.${weekIdx}.days.${dayIdx}.workouts.${workoutIdx}.sets.${setIdx}.recovery_value`}
            as={Input}
            type="number"
          />
        </div>
        <div>
          <Label>Recovery Measure</Label>
          <FormikSelect
            name={`weeks.${weekIdx}.days.${dayIdx}.workouts.${workoutIdx}.sets.${setIdx}.recovery_measure_type`}
            options={getFormattedOptions(MEASURE_TYPE)}
          ></FormikSelect>
        </div>
      </div>
    </>
  );
};

export default SetForm;
