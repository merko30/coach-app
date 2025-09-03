import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import { planColumns } from "@/lib/plans";
import { useQuery } from "@tanstack/react-query";

const PlansPage = () => {
  const { data, error } = useQuery({
    queryFn: async () => {
      const res = await fetch("http://localhost:8000/plans", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return await res.json();
    },
    queryKey: ["plans"],
  });

  return (
    <div className="w-full">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h2 className="text-2xl font-semibold">Plans</h2>
        <Button asChild>
          <Link to="/dashboard/plans/create">Create Plan</Link>
        </Button>
      </div>
      <DataTable columns={planColumns} data={data || []} />
    </div>
  );
};

export const Route = createFileRoute("/_authenticated/dashboard/plans/")({
  component: PlansPage,
});

export default PlansPage;
