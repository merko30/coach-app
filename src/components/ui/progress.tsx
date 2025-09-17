import * as React from "react";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ value = 0, className, ...props }, ref) => (
    <div
      ref={ref}
      className={`relative w-full bg-gray-200 rounded-full overflow-hidden ${className || ""}`}
      {...props}
    >
      <div
        className="h-3 bg-green-500 transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  )
);
Progress.displayName = "Progress";
