import type { RefObject } from "react";
import type { UniqueIdentifier } from "@dnd-kit/core";

export interface TreeItem {
  id: UniqueIdentifier;
  collapsed?: boolean;
  step_id: UniqueIdentifier | null;
  steps: TreeItem[];
  workoutIdx: number;
  stepIdx: number;
  subStepIdx?: number;
}

export type TreeItems = TreeItem[];

export interface FlattenedItem extends TreeItem {
  step_id: UniqueIdentifier | null;
  depth: number;
  index: number;
}

export type SensorContext = RefObject<{
  items: FlattenedItem[];
  offset: number;
}>;
