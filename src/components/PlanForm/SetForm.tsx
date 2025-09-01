import { Field, useFormikContext, type FieldArrayRenderProps } from "formik";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import type { PlanFormValues } from "./constants";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Trash } from "lucide-react";
import { Select } from "../ui/select";
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
  const { values } = useFormikContext<PlanFormValues>();
  const set =
    values.weeks[weekIdx].days[dayIdx].workouts[workoutIdx].sets[setIdx];

  return (
    <Card key={set.order} size="compact">
      <CardHeader
        className="flex flex-row justify-between items-center"
        size="compact"
      >
        <span>Set #{setIdx + 1}</span>
        <Button
          type="button"
          variant="destructive"
          onClick={() => remove(setIdx)}
        >
          <Trash />
        </Button>
      </CardHeader>
      <CardContent size="compact">
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
      </CardContent>
    </Card>
  );
};

export default SetForm;
