import React, { forwardRef, type HTMLAttributes } from "react";

import styles from "./TreeItem.module.css";
import StepForm from "@/components/PlanForm/StepForm";
import { twMerge } from "tailwind-merge";
import { Grip } from "lucide-react";

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
  type?: string;
  order?: number;
  repetitions?: number;
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
    const {
      stepIdx: _stepIdx,
      workoutIdx: _workoutIdx,
      subStepIdx: _subStepIdx,
      // handleProps: _handleProps,
      value: _value,
      type: _type,
      order: _order,
      repetitions: _repetitions,
      ...liProps
    } = props;

    console.log({ depth, indentationWidth });

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
        // style={
        //   {
        //     "--spacing": `${indentationWidth * depth}px`,
        //   } as React.CSSProperties
        // }
        {...liProps}
      >
        <div
          className={twMerge(
            "flex items-center gap-2 border border-gray-200 px-4",
            depth === 0 ? "" : `bg-gray-50 ml-8`
          )}
          ref={ref}
          style={style}
        >
          <Grip className={styles.Handle} {...props.handleProps} />
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
