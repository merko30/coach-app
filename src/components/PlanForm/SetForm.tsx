import { Field, useFormikContext, type FieldArrayRenderProps } from "formik";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import type { PlanFormValues } from "./constants";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

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
          Remove
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
            <Field
              as="select"
              name={`weeks.${weekIdx}.days.${dayIdx}.workouts.${workoutIdx}.sets.${setIdx}.active_measure_type`}
              className="input"
            >
              <option value="DISTANCE">Distance</option>
              <option value="TIME">Time</option>
              <option value="REPS">Reps</option>
            </Field>
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
            <Field
              as="select"
              name={`weeks.${weekIdx}.days.${dayIdx}.workouts.${workoutIdx}.sets.${setIdx}.recovery_measure_type`}
              className="input"
            >
              <option value="">None</option>
              <option value="DISTANCE">Distance</option>
              <option value="TIME">Time</option>
              <option value="REPS">Reps</option>
            </Field>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SetForm;
