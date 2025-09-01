import {
  FieldArray,
  useFormikContext,
  type FieldArrayRenderProps,
} from "formik";
import { Card, CardContent, CardHeader } from "../ui/card";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import type { PlanFormValues } from "./constants";
import { SortableItem } from "./SortableItem";
import DayForm from "./DayForm";
import { uuidv7 } from "uuidv7";

const DayFieldsForm = ({
  weekIdx,
  ...props
}: Pick<FieldArrayRenderProps, "remove"> & { weekIdx: number }) => {
  const { setFieldValue, values } = useFormikContext<PlanFormValues>();
  const week = values.weeks[weekIdx];
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <span>Week {week.id}</span>
        <Button
          type="button"
          variant="destructive"
          onClick={() => props.remove(weekIdx)}
        >
          <Trash />
        </Button>
      </CardHeader>
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
                    (d) => d.id === active.id
                  );
                  const newIndex = week.days.findIndex(
                    (d) => d.id === over?.id
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
                items={week.days.map((d) => d.id!)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  {week.days.map((day, dayIdx) => (
                    <SortableItem key={day.id} id={day.id!}>
                      <DayForm
                        weekIdx={weekIdx}
                        dayIdx={dayIdx}
                        remove={removeDay}
                      />
                    </SortableItem>
                  ))}
                  <Button
                    type="button"
                    disabled={week.days.length === 7}
                    onClick={() =>
                      pushDay({
                        id: uuidv7(),
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
    </Card>
  );
};

export default DayFieldsForm;
