import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import { clientColumns } from "@/lib/clients";

const ClientsPage = () => {
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
        <h2 className="text-2xl font-semibold">Clients</h2>
        <Button onClick={() => alert("Create client")}>Create Client</Button>
      </div>
      <DataTable columns={clientColumns} data={[]} />
    </div>
  );
};
export const Route = createFileRoute("/_authenticated/dashboard/clients")({
  component: ClientsPage,
});

export default ClientsPage;
