import type { PlanFormValues } from "./constants";
import { useFormikContext, type FieldArrayRenderProps } from "formik";
import { Card } from "../ui/card";
import { Pen } from "lucide-react";
import { lazy, Suspense, useState } from "react";

const DayFormModal = lazy(() => import("./DayFormModal"));
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

  const [modalOpen, setModalOpen] = useState<{ dayIdx: number } | null>(null);

  return (
    <div className="w-full flex gap-2">
      {days.map((day, dayIdx) => (
        <Card key={dayIdx} className="flex-1">
          <div className="px-4 flex flex-col items-center">
            <p className="text-xs text-center uppercase text-muted-foreground mb-2">
              Day {dayIdx + 1}
              <br />
              {day.workouts.length
                ? `${day.workouts.length} workout${day.workouts.length === 1 ? "" : "s"}`
                : "No workout"}
            </p>
            <span
              role="button"
              className="cursor-pointer"
              onClick={() => setModalOpen({ dayIdx })}
            >
              <Pen />
            </span>
          </div>
        </Card>
      ))}
      {modalOpen && (
        <Suspense fallback={null}>
          <DayFormModal
            day={days[modalOpen.dayIdx]}
            dayIdx={modalOpen.dayIdx}
            onToggle={() => setModalOpen(null)}
            open={!!modalOpen}
            onSubmit={console.log}
          />
        </Suspense>
      )}
    </div>
  );
}
