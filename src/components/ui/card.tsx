import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const cardVariants = cva(
  "bg-card text-card-foreground flex flex-col rounded-xl border shadow-sm",
  {
    variants: {
      size: {
        default: "gap-6 py-6",
        compact: "gap-2 py-4 px-2 my-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

type CardProps = React.ComponentProps<"div"> &
  VariantProps<typeof cardVariants>;
function Card({ className, size, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ size }), className)}
      {...props}
    />
  );
}

const cardHeaderVariants = cva(
  "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
  {
    variants: {
      size: {
        default: "gap-1.5 px-6",
        compact: "gap-1 px-2 [.border-b]:pb-2",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);
type CardHeaderProps = React.ComponentProps<"div"> &
  VariantProps<typeof cardHeaderVariants>;
function CardHeader({ className, size, ...props }: CardHeaderProps) {
  return (
    <div
      data-slot="card-header"
      className={cn(cardHeaderVariants({ size }), className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}

const cardContentVariants = cva("", {
  variants: {
    size: {
      default: "px-6",
      compact: "px-2",
    },
  },
  defaultVariants: {
    size: "default",
  },
});
type CardContentProps = React.ComponentProps<"div"> &
  VariantProps<typeof cardContentVariants>;
function CardContent({ className, size, ...props }: CardContentProps) {
  return (
    <div
      data-slot="card-content"
      className={cn(cardContentVariants({ size }), className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  cardVariants,
  cardHeaderVariants,
  cardContentVariants,
};
