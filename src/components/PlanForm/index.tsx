import {
  Formik,
  Form,
  FieldArray,
  Field,
  getIn,
  FormikProvider,
  useFormik,
} from "formik";
// import { toFormikValidationSchema } from "zod-formik-adapter";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Trash } from "lucide-react";
import DayFieldsForm from "./DayFieldsForm";
import { initialValues, type PlanFormValues } from "./constants";

export function PlanForm({
  onSubmit,
}: {
  onSubmit: (values: PlanFormValues) => void;
}) {
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  const { touched, errors, setFieldValue, values } = formik;

  return (
    <FormikProvider value={formik}>
      <Form className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input name="title" />
          {getIn(touched, "title") && getIn(errors, "title") && (
            <div className="text-red-500 text-xs">{getIn(errors, "title")}</div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea name="description" />
          {getIn(touched, "description") && getIn(errors, "description") && (
            <div className="text-red-500 text-xs">
              {getIn(errors, "description")}
            </div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="level">Level</Label>
          <Field as="select" name="level" className="input">
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
          </Field>
        </div>
        {/* Weeks DnD */}
        <FieldArray name="weeks">
          {({ push, remove, move }) => (
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={(event) => {
                const { active, over } = event;
                if (active.id !== over?.id) {
                  const oldIndex = values.weeks.findIndex(
                    (w) => w.order === active.id
                  );
                  const newIndex = values.weeks.findIndex(
                    (w) => w.order === over?.id
                  );
                  move(oldIndex, newIndex);
                  // update order
                  setFieldValue(
                    "weeks",
                    arrayMove(values.weeks, oldIndex, newIndex).map((w, i) => ({
                      ...w,
                      order: i,
                    }))
                  );
                }
              }}
            >
              <SortableContext
                items={values.weeks.map((w) => w.order)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-4">
                  {values.weeks.map((week, weekIdx) => (
                    <Card key={week.order}>
                      <CardHeader className="flex flex-row justify-between items-center">
                        <span>Week {weekIdx + 1}</span>
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => remove(weekIdx)}
                        >
                          <Trash />
                        </Button>
                      </CardHeader>
                      <DayFieldsForm weekIdx={weekIdx} />
                    </Card>
                  ))}
                  <Button
                    type="button"
                    onClick={() =>
                      push({ order: values.weeks.length, days: [] })
                    }
                  >
                    Add Week
                  </Button>
                </div>
              </SortableContext>
            </DndContext>
          )}
        </FieldArray>
        <Button type="submit">Submit</Button>
      </Form>
    </FormikProvider>
  );
}
