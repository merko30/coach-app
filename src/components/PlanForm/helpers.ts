import type { Step } from "./constants";

type FlatStep = {
  id: string;
  parentId: string | null;
  step: Step;
};

export function flattenSteps(
  steps: Step[],
  parentId: string | null = null
): FlatStep[] {
  return steps.flatMap((s) => {
    const self: FlatStep = { id: s.id!.toString(), parentId, step: s };
    const children = s.steps ? flattenSteps(s.steps, s.id?.toString()) : [];
    return [self, ...children];
  });
}
