import type { UniqueIdentifier } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import type { FlattenedItem, TreeItem, TreeItems } from "./types";

export const iOS = /iPad|iPhone|iPod/.test(navigator.platform);

function getDragDepth(offset: number, indentationWidth: number) {
  return Math.round(offset / indentationWidth);
}

export function getProjection(
  items: FlattenedItem[],
  activeId: UniqueIdentifier,
  overId: UniqueIdentifier,
  dragOffset: number,
  indentationWidth: number
) {
  const overItemIndex = items.findIndex(({ id }) => id === overId);
  const activeItemIndex = items.findIndex(({ id }) => id === activeId);
  const activeItem = items[activeItemIndex];
  const newItems = arrayMove(items, activeItemIndex, overItemIndex);
  const previousItem = newItems[overItemIndex - 1];
  // const nextItem = newItems[overItemIndex + 1];
  const dragDepth = getDragDepth(dragOffset, indentationWidth);
  const projectedDepth = activeItem.depth + dragDepth;
  const maxDepth = getMaxDepth({
    previousItem,
  });
  // can't unnest non-last type if this is applied
  // const minDepth = getMinDepth({ nextItem });
  const minDepth = 0;
  let depth = projectedDepth;

  if (projectedDepth >= maxDepth) {
    depth = maxDepth;
  } else if (projectedDepth < minDepth) {
    depth = minDepth;
  }

  return { depth, maxDepth, minDepth, parentId: getParentId() };

  function getParentId() {
    if (depth === 0 || !previousItem) {
      return null;
    }

    if (depth === previousItem.depth) {
      return previousItem.step_id;
    }

    if (depth > previousItem.depth) {
      return previousItem.id;
    }

    const newParent = newItems
      .slice(0, overItemIndex)
      .reverse()
      .find((item) => item.depth === depth)?.step_id;

    return newParent ?? null;
  }
}

function getMaxDepth({ previousItem }: { previousItem: FlattenedItem }) {
  if (previousItem) {
    return previousItem.depth + 1;
  }

  return 0;
}

// function getMinDepth({ nextItem }: { nextItem: FlattenedItem }) {
//   if (nextItem) {
//     return nextItem.depth;
//   }

//   return 0;
// }

function flatten(
  items: TreeItems,
  parentId: UniqueIdentifier | null = null,
  depth = 0
): FlattenedItem[] {
  return items.reduce<FlattenedItem[]>((acc, item, index) => {
    const base: FlattenedItem = {
      ...item,
      step_id: parentId,
      depth,
      index,
      type: item.type,
    };
    let children: FlattenedItem[] = [];
    if (item.steps && item.steps.length > 0) {
      children = flatten(
        item.steps.map((child, childIdx) => ({
          ...child,
          step_id: item.id,
          depth: depth + 1,
          index: childIdx,
          subStepIdx: childIdx,
          type: child.type,
        })),
        item.id,
        depth + 1
      );
    }
    return [...acc, base, ...children];
  }, []);
}

export function flattenTree(items: TreeItems): FlattenedItem[] {
  return flatten(items);
}

export function buildTree(flattenedItems: FlattenedItem[]): TreeItems {
  const root: TreeItem = {
    id: "root",
    steps: [],
    step_id: null,
    workoutIdx: -1,
    stepIdx: -1,
    subStepIdx: -1,
  };
  const nodes: Record<string, TreeItem> = { [root.id]: root };
  const items = flattenedItems.map((item) => ({
    ...item,
    steps: [],
    type: item.type,
  }));

  for (const item of items) {
    const { id, steps } = item;
    const parentId = item.step_id ?? root.id;
    const parent = nodes[parentId] ?? findItem(items, parentId);
    // POSSIBLE ISSUE, NULL
    nodes[id] = {
      id,
      steps,
      step_id: null,
      workoutIdx: item.workoutIdx,
      stepIdx: item.stepIdx,
      subStepIdx: item.subStepIdx,
    };
    parent.steps.push(item);
  }

  return root.steps;
}

export function findItem(items: TreeItem[], itemId: UniqueIdentifier) {
  return items.find(({ id }) => id === itemId);
}

export function findItemDeep(
  items: TreeItems,
  itemId: UniqueIdentifier
): TreeItem | undefined {
  for (const item of items) {
    const { id, steps } = item;

    if (id === itemId) {
      return item;
    }

    if (steps.length) {
      const child = findItemDeep(steps, itemId);

      if (child) {
        return child;
      }
    }
  }

  return undefined;
}

export function removeItem(items: TreeItems, id: UniqueIdentifier) {
  const newItems = [];

  for (const item of items) {
    if (item.id === id) {
      continue;
    }

    if (item.steps.length) {
      item.steps = removeItem(item.steps, id);
    }

    newItems.push(item);
  }

  return newItems;
}

export function setProperty<T extends keyof TreeItem>(
  items: TreeItems,
  id: UniqueIdentifier,
  property: T,
  setter: (value: TreeItem[T]) => TreeItem[T]
) {
  for (const item of items) {
    if (item.id === id) {
      item[property] = setter(item[property]);
      continue;
    }

    if (item.steps.length) {
      item.steps = setProperty(item.steps, id, property, setter);
    }
  }

  return [...items];
}

function countChildren(items: TreeItem[], count = 0): number {
  return items.reduce((acc, { steps }) => {
    if (steps.length) {
      return countChildren(steps, acc + 1);
    }

    return acc + 1;
  }, count);
}

export function getChildCount(items: TreeItems, id: UniqueIdentifier) {
  const item = findItemDeep(items, id);

  return item ? countChildren(item.steps) : 0;
}

export function removeChildrenOf(
  items: FlattenedItem[],
  ids: UniqueIdentifier[]
) {
  const excludeParentIds = [...ids];

  return items.filter((item) => {
    if (item.step_id && excludeParentIds.includes(item.step_id)) {
      if (item.steps.length) {
        excludeParentIds.push(item.id);
      }
      return false;
    }

    return true;
  });
}
