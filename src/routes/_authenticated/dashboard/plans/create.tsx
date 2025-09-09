import { PlanForm } from "@/components/PlanForm";
import plansService from "@/services/plans";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard/plans/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: plansService.create,
    onError: console.log,
    onSuccess: () => navigate({ to: "/dashboard/plans" }),
  });

  return <PlanForm onSubmit={mutate} />;
}
