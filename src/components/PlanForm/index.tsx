import {
  Form,
  FieldArray,
  getIn,
  FormikProvider,
  useFormik,
  Field,
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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  initialValues,
  LEVEL,
  PLAN_TYPES,
  type PlanFormValues,
} from "./constants";
import { SortableItem } from "./SortableItem";
import { uuidv7 } from "uuidv7";
import { FormikSelect } from "../FormikSelect";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { WeekAccordion } from "./WeekAccordion";
import { getFormattedOptions } from "@/lib/camelCase";

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
      <Card>
        <CardHeader>
          <h1 className="text-2xl">Create plan</h1>
        </CardHeader>
        <CardContent>
          <Form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Field as={Input} name="title" />
              {getIn(touched, "title") && getIn(errors, "title") && (
                <div className="text-red-500 text-xs">
                  {getIn(errors, "title")}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Field as={Textarea} name="description" />
              {getIn(touched, "description") &&
                getIn(errors, "description") && (
                  <div className="text-red-500 text-xs">
                    {getIn(errors, "description")}
                  </div>
                )}
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <FormikSelect
                label="Level"
                name="level"
                options={getFormattedOptions(LEVEL)}
              />
              <FormikSelect
                label="Type"
                name="type"
                options={getFormattedOptions(PLAN_TYPES)}
              />
            </div>

            {/* Weeks DnD */}
            <FieldArray name="weeks">
              {({ push, remove, move }) => (
                <>
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Weeks</h1>
                    <Button
                      type="button"
                      onClick={() =>
                        push({
                          order: values.weeks.length,
                          id: uuidv7(),
                          days: Array(7)
                            .fill(0)
                            .map((_, i) => ({
                              id: uuidv7(),
                              order: i,
                              day_of_week: i,
                              workouts: [],
                            })),
                        })
                      }
                      className="block ml-auto"
                    >
                      Add Week
                    </Button>
                  </div>
                  {!values.weeks.length && (
                    <div className="border border-gray-200 p-4 rounded-md bg-gray-50 py-12 text-center">
                      <p>
                        No weeks added yet. Click "Add Week" to get started.
                      </p>
                    </div>
                  )}
                  <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={(event) => {
                      const { active, over } = event;

                      if (active.id !== over?.id) {
                        const oldIndex = values.weeks.findIndex(
                          (w) => w.id === active.id
                        );
                        const newIndex = values.weeks.findIndex(
                          (w) => w.id === over?.id
                        );
                        move(oldIndex, newIndex);
                        // update order
                        setFieldValue(
                          "weeks",
                          arrayMove(values.weeks, oldIndex, newIndex).map(
                            (w, i) => ({
                              ...w,
                              order: i,
                            })
                          )
                        );
                      }
                    }}
                  >
                    <SortableContext
                      items={values.weeks.map((w) => w.id!)}
                      strategy={verticalListSortingStrategy}
                    >
                      {values.weeks.map((week, weekIdx) => (
                        <SortableItem
                          id={week.id!}
                          className="border-b border-gray-200 last:border-b-transparent px-2 py-4"
                        >
                          <Accordion type="single" className="space-y-4">
                            <AccordionItem
                              key={week.id}
                              value={String(week.id)}
                            >
                              <AccordionTrigger>
                                Week {weekIdx + 1}
                              </AccordionTrigger>
                              <AccordionContent>
                                <WeekAccordion
                                  weekIdx={weekIdx}
                                  remove={remove}
                                />
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </SortableItem>
                      ))}
                    </SortableContext>
                  </DndContext>
                </>
              )}
            </FieldArray>
            <Button type="submit">Submit</Button>
          </Form>
        </CardContent>
      </Card>
    </FormikProvider>
  );
}
