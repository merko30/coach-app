import DayForm from "./DayForm";
import type { PlanFormValues } from "./constants";
import { useFormikContext, type FieldArrayRenderProps } from "formik";
import { Card } from "../ui/card";

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
    <div className="w-full flex gap-2">
      {days.map((_, dayIdx) => (
        <Card key={dayIdx} className="flex-1">
          <DayForm weekIdx={weekIdx} dayIdx={dayIdx} remove={remove} />
        </Card>
      ))}
    </div>
  );
}
