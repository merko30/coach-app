import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import { planColumns } from "@/lib/plans";

const PlansPage = () => {
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
        <Button onClick={() => alert("Create plan")}>Create Plan</Button>
      </div>
      <DataTable columns={planColumns} data={[]} />
    </div>
  );
};

export const Route = createFileRoute("/_authenticated/dashboard/plans")({
  component: PlansPage,
});

export default PlansPage;
