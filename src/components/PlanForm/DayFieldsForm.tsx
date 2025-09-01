import { Field, FieldArray, useFormikContext } from "formik";
import { Card, CardContent, CardHeader } from "../ui/card";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import type { PlanFormValues } from "./constants";

const DayFieldsForm = ({ weekIdx }: { weekIdx: number }) => {
  const { setFieldValue, values } = useFormikContext<PlanFormValues>();
  const week = values.weeks[weekIdx];
  return (
    <CardContent>
      {/* Days DnD */}
      <FieldArray name={`weeks.${weekIdx}.days`}>
        {({ push: pushDay, remove: removeDay, move: moveDay }) => (
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={(event) => {
              const { active, over } = event;
              if (active.id !== over?.id) {
                const oldIndex = week.days.findIndex(
                  (d) => d.order === active.id
                );
                const newIndex = week.days.findIndex(
                  (d) => d.order === over?.id
                );
                moveDay(oldIndex, newIndex);
                setFieldValue(
                  `weeks.${weekIdx}.days`,
                  arrayMove(week.days, oldIndex, newIndex).map((d, i) => ({
                    ...d,
                    order: i,
                  }))
                );
              }
            }}
          >
            <SortableContext
              items={week.days.map((d) => d.order)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {week.days.map((day, dayIdx) => (
                  <Card key={day.order}>
                    <CardHeader className="flex flex-row justify-between items-center">
                      <span>Day {day.day_of_week + 1}</span>
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => removeDay(dayIdx)}
                      >
                        <Trash />
                      </Button>
                    </CardHeader>
                    <CardContent>
                      {/* Workouts DnD */}
                      <FieldArray
                        name={`weeks.${weekIdx}.days.${dayIdx}.workouts`}
                      >
                        {({
                          push: pushWorkout,
                          remove: removeWorkout,
                          move: moveWorkout,
                        }) => (
                          <DndContext
                            collisionDetection={closestCenter}
                            onDragEnd={(event) => {
                              const { active, over } = event;
                              if (active.id !== over?.id) {
                                const oldIndex = day.workouts.findIndex(
                                  (w) => w.order === active.id
                                );
                                const newIndex = day.workouts.findIndex(
                                  (w) => w.order === over?.id
                                );
                                moveWorkout(oldIndex, newIndex);
                                setFieldValue(
                                  `weeks.${weekIdx}.days.${dayIdx}.workouts`,
                                  arrayMove(
                                    day.workouts,
                                    oldIndex,
                                    newIndex
                                  ).map((w, i) => ({
                                    ...w,
                                    order: i,
                                  }))
                                );
                              }
                            }}
                          >
                            <SortableContext
                              items={day.workouts.map((w) => w.order)}
                              strategy={verticalListSortingStrategy}
                            >
                              <div className="space-y-2">
                                {day.workouts.map((workout, workoutIdx) => (
                                  <Card key={workout.order}>
                                    <CardHeader className="flex flex-row justify-between items-center">
                                      <span>
                                        Workout:{" "}
                                        {workout.title || `#${workoutIdx + 1}`}
                                      </span>
                                      <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={() =>
                                          removeWorkout(workoutIdx)
                                        }
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
                                          <option value="STRENGTH">
                                            Strength
                                          </option>
                                          <option value="RUN">Run</option>
                                        </Field>
                                      </div>
                                      {/* Sets DnD */}
                                      <FieldArray
                                        name={`weeks.${weekIdx}.days.${dayIdx}.workouts.${workoutIdx}.sets`}
                                      >
                                        {({
                                          push: pushSet,
                                          remove: removeSet,
                                          move: moveSet,
                                        }) => (
                                          <DndContext
                                            collisionDetection={closestCenter}
                                            onDragEnd={(event) => {
                                              const { active, over } = event;
                                              if (active.id !== over?.id) {
                                                const oldIndex =
                                                  workout.sets.findIndex(
                                                    (s) => s.order === active.id
                                                  );
                                                const newIndex =
                                                  workout.sets.findIndex(
                                                    (s) => s.order === over?.id
                                                  );
                                                moveSet(oldIndex, newIndex);
                                                setFieldValue(
                                                  `weeks.${weekIdx}.days.${dayIdx}.workouts.${workoutIdx}.sets`,
                                                  arrayMove(
                                                    workout.sets,
                                                    oldIndex,
                                                    newIndex
                                                  ).map((s, i) => ({
                                                    ...s,
                                                    order: i,
                                                  }))
                                                );
                                              }
                                            }}
                                          >
                                            <SortableContext
                                              items={workout.sets.map(
                                                (s) => s.order
                                              )}
                                              strategy={
                                                verticalListSortingStrategy
                                              }
                                            >
                                              <div className="space-y-2">
                                                {workout.sets.map(
                                                  (set, setIdx) => (
                                                    <Card key={set.order}>
                                                      <CardHeader className="flex flex-row justify-between items-center">
                                                        <span>
                                                          Set #{setIdx + 1}
                                                        </span>
                                                        <Button
                                                          type="button"
                                                          variant="destructive"
                                                          onClick={() =>
                                                            removeSet(setIdx)
                                                          }
                                                        >
                                                          Remove
                                                        </Button>
                                                      </CardHeader>
                                                      <CardContent>
                                                        <div className="grid grid-cols-2 gap-2">
                                                          <div>
                                                            <Label>
                                                              Active Value
                                                            </Label>
                                                            <Field
                                                              name={`weeks.${weekIdx}.days.${dayIdx}.workouts.${workoutIdx}.sets.${setIdx}.active_value`}
                                                              as={Input}
                                                              type="number"
                                                            />
                                                          </div>
                                                          <div>
                                                            <Label>
                                                              Active Measure
                                                            </Label>
                                                            <Field
                                                              as="select"
                                                              name={`weeks.${weekIdx}.days.${dayIdx}.workouts.${workoutIdx}.sets.${setIdx}.active_measure_type`}
                                                              className="input"
                                                            >
                                                              <option value="DISTANCE">
                                                                Distance
                                                              </option>
                                                              <option value="TIME">
                                                                Time
                                                              </option>
                                                              <option value="REPS">
                                                                Reps
                                                              </option>
                                                            </Field>
                                                          </div>
                                                          <div>
                                                            <Label>
                                                              Recovery Value
                                                            </Label>
                                                            <Field
                                                              name={`weeks.${weekIdx}.days.${dayIdx}.workouts.${workoutIdx}.sets.${setIdx}.recovery_value`}
                                                              as={Input}
                                                              type="number"
                                                            />
                                                          </div>
                                                          <div>
                                                            <Label>
                                                              Recovery Measure
                                                            </Label>
                                                            <Field
                                                              as="select"
                                                              name={`weeks.${weekIdx}.days.${dayIdx}.workouts.${workoutIdx}.sets.${setIdx}.recovery_measure_type`}
                                                              className="input"
                                                            >
                                                              <option value="">
                                                                None
                                                              </option>
                                                              <option value="DISTANCE">
                                                                Distance
                                                              </option>
                                                              <option value="TIME">
                                                                Time
                                                              </option>
                                                              <option value="REPS">
                                                                Reps
                                                              </option>
                                                            </Field>
                                                          </div>
                                                        </div>
                                                      </CardContent>
                                                    </Card>
                                                  )
                                                )}
                                                <Button
                                                  type="button"
                                                  onClick={() =>
                                                    pushSet({
                                                      order:
                                                        workout.sets.length,
                                                      active_value: 0,
                                                      active_measure_type:
                                                        "REPS",
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
                                ))}
                                <Button
                                  type="button"
                                  onClick={() =>
                                    pushWorkout({
                                      order: day.workouts.length,
                                      title: "",
                                      description: "",
                                      type: "REST",
                                      sets: [],
                                    })
                                  }
                                >
                                  Add Workout
                                </Button>
                              </div>
                            </SortableContext>
                          </DndContext>
                        )}
                      </FieldArray>
                    </CardContent>
                  </Card>
                ))}
                <Button
                  type="button"
                  disabled={week.days.length === 7}
                  onClick={() =>
                    pushDay({
                      order: week.days.length,
                      day_of_week: week.days.length,
                      workouts: [],
                    })
                  }
                >
                  Add Day
                </Button>
              </div>
            </SortableContext>
          </DndContext>
        )}
      </FieldArray>
    </CardContent>
  );
};

export default DayFieldsForm;
