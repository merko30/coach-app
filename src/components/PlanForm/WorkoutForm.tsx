import {
  Field,
  FieldArray,
  useFormikContext,
  type FieldArrayRenderProps,
} from "formik";
import type { PlanFormValues } from "./constants";
import { Card, CardContent, CardHeader } from "../ui/card";
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
    <Card key={workout.order}>
      <CardHeader className="flex flex-row justify-between items-center">
        <span>Workout: {workout.title || `#${workoutIdx + 1}`}</span>
        <Button
          type="button"
          variant="destructive"
          onClick={() => remove(workoutIdx)}
        >
          <Trash />
        </Button>
      </CardHeader>
      <CardContent>
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
          <Label>Type</Label>
          <Field
            as="select"
            name={`weeks.${weekIdx}.days.${dayIdx}.workouts.${workoutIdx}.type`}
            className="input"
          >
            <option value="REST">Rest</option>
            <option value="STRENGTH">Strength</option>
            <option value="RUN">Run</option>
          </Field>
        </div>
        {/* Sets DnD */}
        <FieldArray
          name={`weeks.${weekIdx}.days.${dayIdx}.workouts.${workoutIdx}.sets`}
        >
          {({ push: pushSet, remove: removeSet, move: moveSet }) => (
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
                <div className="space-y-2">
                  {workout.sets.map((set, setIdx) => (
                    <SortableItem key={set.id} id={set.id!}>
                      <SetForm
                        weekIdx={weekIdx}
                        dayIdx={dayIdx}
                        workoutIdx={workoutIdx}
                        setIdx={setIdx}
                        remove={removeSet}
                      />
                    </SortableItem>
                  ))}
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
                  >
                    Add Set
                  </Button>
                </div>
              </SortableContext>
            </DndContext>
          )}
        </FieldArray>
      </CardContent>
    </Card>
  );
};

export default WorkoutForm;
