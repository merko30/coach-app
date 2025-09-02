import { Field, type FieldArrayRenderProps } from "formik";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Trash } from "lucide-react";
import { FormikSelect } from "../FormikSelect";

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
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label>Active Value</Label>
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
            options={[
              { value: "DISTANCE", label: "Distance" },
              { value: "TIME", label: "Time" },
              { value: "REPS", label: "Reps" },
            ]}
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
            options={[
              { value: "DISTANCE", label: "Distance" },
              { value: "TIME", label: "Time" },
              { value: "REPS", label: "Reps" },
            ]}
          ></FormikSelect>
        </div>
      </div>
    </>
  );
};

export default SetForm;
