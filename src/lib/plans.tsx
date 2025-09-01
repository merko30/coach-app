import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type PlanListItem = {
  id: number;
  title: string;
  description: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  coachDescription?: string;
  weeksCount: number;
};

export const planColumns: ColumnDef<PlanListItem>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Title
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "level",
    header: "Level",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("level")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const text: string = row.getValue("description");
      return <span>{text.length > 50 ? text.slice(0, 50) + "..." : text}</span>;
    },
  },
  {
    accessorKey: "coachDescription",
    header: "Coach",
  },
  {
    accessorKey: "weeksCount",
    header: "Weeks",
  },
];
