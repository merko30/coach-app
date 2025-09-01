import { PlanForm } from "@/components/PlanForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard/plans/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PlanForm onSubmit={console.log} />;
}
