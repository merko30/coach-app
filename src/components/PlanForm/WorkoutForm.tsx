import {
  Field,
  FieldArray,
  useFormikContext,
  type FieldArrayRenderProps,
} from "formik";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { uuidv7 } from "uuidv7";
import { FormikSelect } from "../FormikSelect";
import type { DayFormValues } from "./constants";
import { WORKOUT_TYPE } from "./constants";
import { getFormattedOptions } from "@/lib/stringHelpers";
import { SortableTree } from "./Tree/SortableTree";
import type { TreeItems } from "./Tree/types";
import { useEffect, useState } from "react";
import type { UniqueIdentifier } from "@dnd-kit/core";

const WorkoutForm = ({
  workoutIdx,
  remove,
}: { workoutIdx: number } & Pick<FieldArrayRenderProps, "remove">) => {
  const { values, setFieldValue } = useFormikContext<DayFormValues>();
  const workout = values.workouts[workoutIdx];

  return (
    <div className="my-4">
      <div className="flex flex-row justify-between items-center">
        <h4 className="text-xl font-semibold mb-4">
          Workout: {workout.title || `#${workoutIdx + 1}`}
        </h4>
        {values.workouts.length > 1 && (
          <Button
            type="button"
            variant="destructive"
            onClick={() => remove(workoutIdx)}
          >
            <Trash />
          </Button>
        )}
      </div>
      <div className="space-y-2">
        <Label>Title</Label>
        <Field name={`workouts.${workoutIdx}.title`} as={Input} />
        <Label>Description</Label>
        <Field name={`workouts.${workoutIdx}.description`} as={Textarea} />
        <FormikSelect
          label="Type"
          name={`workouts.${workoutIdx}.type`}
          options={getFormattedOptions(WORKOUT_TYPE)}
          className="mb-4"
        />
      </div>
      {/* Steps DnD */}
      <FieldArray name={`workouts.${workoutIdx}.steps`}>
        {({ push: pushStep, remove: removeStep, move: moveStep }) => (
          <>
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-lg font-semibold">Steps</h5>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  onClick={() =>
                    pushStep({
                      id: uuidv7(),
                      order: workout.steps.length,
                      value: 0,
                      type: "REPS",
                      repetitions: 1,
                      steps: [],
                    })
                  }
                  className="block ml-auto"
                >
                  Add Step
                </Button>
                <Button
                  type="button"
                  onClick={() =>
                    pushStep({
                      id: uuidv7(),
                      order: workout.steps.length,
                      value: 0,
                      type: "REPEAT",
                      steps: [],
                      repetitions: 2,
                    })
                  }
                  className="block ml-auto"
                >
                  Add Repeat
                </Button>
              </div>
            </div>
            {!workout.steps.length && (
              <div className="border border-gray-200 p-4 rounded-md bg-gray-50 py-12 text-center mt-4">
                <p>No workout steps added yet.</p>
              </div>
            )}
            {/* Single DnD context for all steps and substeps */}
            <SortableTree
              defaultItems={workout.steps.map((step, index) => ({
                ...step,
                id: step.id as UniqueIdentifier,
                workoutIdx,
                stepIdx: index,
                subStepIdx: undefined,
                steps: step.steps?.map((subStep, subIndex) => ({
                  ...subStep,
                  id: subStep.id as UniqueIdentifier,
                  workoutIdx,
                  stepIdx: index,
                  subStepIdx: subIndex,
                  steps: [],
                })),
              }))}
              // treeItems={treeItems} --- IGNORE ---
              onSetItems={(newItems) => {
                console.log("new items from sortable tree", newItems);
              }}
            />
          </>
        )}
      </FieldArray>
    </div>
  );
};

export default WorkoutForm;
