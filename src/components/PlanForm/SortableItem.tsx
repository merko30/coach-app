import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

export function SortableItem({
  id,
  children,
  className,
}: {
  id: string | number;
  children: React.ReactNode;
  className?: string;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
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
      className={cn("relative w-full flex items-center", className)}
      {...attributes}
    >
      <button
        type="button"
        {...listeners}
        className="absolute left-0 top-1/2 -translate-y-1/2 p-1 cursor-grab text-muted-foreground hover:text-foreground"
        tabIndex={-1}
        aria-label="Drag handle"
      >
        <GripVertical className="w-4 h-4" />
      </button>
      <div className="pl-7 w-full">{children}</div>
    </div>
  );
}
