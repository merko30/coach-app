import type { PlanFormValues } from "./constants";
import { move, useFormikContext } from "formik";
import { lazy, Suspense, useState } from "react";
import type { DayFormValues } from "./constants";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import DayCard from "./DayCard";
import { closestCenter, DndContext } from "@dnd-kit/core";

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
    setFieldValue(`weeks.${weekIdx}.days.${modalOpen?.dayIdx}`, {
      ...days[modalOpen!.dayIdx!],
      ...values,
    });

    setModalOpen(null);
  };

  return (
    <div className="w-full flex gap-2">
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={(event) => {
          const { active, over } = event;

          if (active.id !== over?.id) {
            const oldIndex = days.findIndex((w) => w.id === active.id);
            const newIndex = days.findIndex((w) => w.id === over?.id);
            move(days, oldIndex, newIndex);
            // update order
            setFieldValue(
              `weeks.${weekIdx}.days`,
              arrayMove(days, oldIndex, newIndex).map((w, i) => ({
                ...w,
                day_of_week: i,
              }))
            );
          }
        }}
      >
        <SortableContext
          items={days.map((w) => w.id!)}
          strategy={horizontalListSortingStrategy}
        >
          {days.map((day, dayIdx) => (
            <DayCard
              key={day.id}
              day={day}
              onEdit={() => setModalOpen({ dayIdx })}
            />
          ))}
        </SortableContext>
      </DndContext>
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
