import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import StepForm from "./StepForm";
import type { Step } from "./constants";

type SortableStepProps = {
  id: string;
  step: Step;
  parentId: string | null;
  workoutIdx: number;
  stepIdx: number;
};
function SortableStep({
  id,
  step,
  parentId,
  workoutIdx,
  stepIdx,
}: SortableStepProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    disabled: step.type === "REPEAT", // repeat not draggable
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(step.type !== "REPEAT" ? attributes : {})}
      {...(step.type !== "REPEAT" ? listeners : {})}
    >
      <StepForm workoutIdx={workoutIdx} stepIdx={stepIdx} />
    </div>
  );
}

export default SortableStep;
