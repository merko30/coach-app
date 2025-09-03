import { PlanForm } from "@/components/PlanForm";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard/plans/create")({
  component: RouteComponent,
});

const createPlanFn = async (values: any) => {
  return fetch("http://localhost:8000/plans", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
};

function RouteComponent() {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: createPlanFn,
    onError: console.log,
    onSuccess: () => navigate({ to: "/dashboard/plans" }),
  });

  return <PlanForm onSubmit={mutate} />;
}
