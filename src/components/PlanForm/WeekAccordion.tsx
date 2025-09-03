import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import DayForm from "./DayForm";
import type { PlanFormValues } from "./constants";
import { useFormikContext, type FieldArrayRenderProps } from "formik";

interface WeekAccordionProps {
  weekIdx: number;
  remove: (idx: number) => void;
}

export function WeekAccordion({
  weekIdx,
  remove,
}: WeekAccordionProps & Pick<FieldArrayRenderProps, "remove">) {
  const { values } = useFormikContext<PlanFormValues>();
  const days = values.weeks[weekIdx].days;
  return (
    <Accordion type="single" className="w-full pr-2">
      {days.map((day, dayIdx) => (
        <AccordionItem key={day.id} value={String(day.id)}>
          <AccordionTrigger>
            Day {day.day_of_week + 1}
            {day.workouts.length
              ? " - " + day.workouts.map((workout) => workout.title).join("-")
              : null}
          </AccordionTrigger>
          <AccordionContent>
            <DayForm weekIdx={weekIdx} dayIdx={dayIdx} remove={remove} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
