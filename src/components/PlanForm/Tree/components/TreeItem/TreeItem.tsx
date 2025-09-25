import React, { forwardRef, type HTMLAttributes } from "react";

import styles from "./TreeItem.module.css";
import StepForm from "@/components/PlanForm/StepForm";
import { twMerge } from "tailwind-merge";

export interface Props extends Omit<HTMLAttributes<HTMLLIElement>, "id"> {
  childCount?: number;
  clone?: boolean;
  collapsed?: boolean;
  depth: number;
  disableInteraction?: boolean;
  disableSelection?: boolean;
  ghost?: boolean;
  handleProps?: any;
  indicator?: boolean;
  indentationWidth: number;
  value: string;
  onCollapse?(): void;
  onRemove?(): void;
  wrapperRef?(node: HTMLLIElement): void;
  workoutIdx: number;
  stepIdx: number;
  subStepIdx?: number;
}

export const TreeItem = forwardRef<HTMLDivElement, Props>(
  (
    {
      clone,
      depth,
      disableSelection,
      disableInteraction,
      ghost,
      indentationWidth,
      indicator,
      style,
      wrapperRef,
      ...props
    },
    ref
  ) => {
    console.log(props);

    return (
      <li
        className={twMerge(
          styles.Wrapper,
          clone && styles.clone,
          ghost && styles.ghost,
          indicator && styles.indicator,
          disableSelection && styles.disableSelection,
          disableInteraction && styles.disableInteraction
        )}
        ref={wrapperRef}
        style={
          {
            "--spacing": `${indentationWidth * depth}px`,
          } as React.CSSProperties
        }
        {...props}
      >
        <div className={styles.TreeItem} ref={ref} style={style}>
          <StepForm
            workoutIdx={props.workoutIdx}
            stepIdx={props.stepIdx}
            subStepIdx={props.subStepIdx}
          />
        </div>
      </li>
    );
  }
);
