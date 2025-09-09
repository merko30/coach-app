import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { twMerge } from "tailwind-merge";

export function SortableItem({
  id,
  children,
  className,
  ...props
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
    items,
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
      {...props}
    >
      {items.length > 1 && (
        <button
          type="button"
          {...listeners}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-1 cursor-grab text-muted-foreground hover:text-foreground"
          tabIndex={-1}
          aria-label="Drag handle"
        >
          <GripVertical className="w-4 h-4" />
        </button>
      )}
      <div className={twMerge("w-full", items.length > 1 && "pl-7")}>
        {children}
      </div>
    </div>
  );
}
