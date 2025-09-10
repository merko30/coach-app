import type { PlanFormValues } from "./constants";
import { useFormikContext } from "formik";
import { Card } from "../ui/card";
import { Pen } from "lucide-react";
import { lazy, Suspense, useState } from "react";
import type { DayFormValues } from "./DayFormModal";

const DayFormModal = lazy(() => import("./DayFormModal"));
interface WeekProps {
  weekIdx: number;
  remove: (idx: number) => void;
}

const Week = ({ weekIdx }: WeekProps) => {
  const { values, setFieldValue } = useFormikContext<PlanFormValues>();
  const days = values.weeks[weekIdx].days;

  const [modalOpen, setModalOpen] = useState<{ dayIdx: number } | null>(null);

  const onSaveDay = (values: DayFormValues) => {
    setFieldValue(`weeks.${weekIdx}.days.${modalOpen?.dayIdx}`, values);

    setModalOpen(null);
  };

  console.log(values);

  return (
    <div className="w-full flex gap-2">
      {days.map((day, dayIdx) => {
        const workoutsLength = day.workouts.length;
        return (
          <Card key={dayIdx} className="flex-1">
            <div className="px-4 flex flex-col items-center">
              <p className="text-xs text-center uppercase text-muted-foreground mb-2">
                Day {dayIdx + 1}
                <br />
                {workoutsLength
                  ? workoutsLength === 1
                    ? day.workouts[0].title
                    : `${workoutsLength} workouts`
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
        );
      })}
      {modalOpen && (
        <Suspense fallback={null}>
          <DayFormModal
            day={days[modalOpen.dayIdx]}
            dayIdx={modalOpen.dayIdx}
            onToggle={() => setModalOpen(null)}
            open={!!modalOpen}
            onSubmit={onSaveDay}
          />
        </Suspense>
      )}
    </div>
  );
};

export default Week;
