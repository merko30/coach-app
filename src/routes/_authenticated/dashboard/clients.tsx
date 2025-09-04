import { lazy, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import { clientColumns } from "@/lib/clients";

import InviteClientModal from "@/components/InviteClientModal";

const ClientsPage = () => {
  const [showInviteClientModal, setShowInviteClientModal] = useState(false);

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
        <Button onClick={() => setShowInviteClientModal(true)}>
          Invite client
        </Button>
      </div>
      <DataTable columns={clientColumns} data={[]} />
      {showInviteClientModal && (
        <InviteClientModal
          open={showInviteClientModal}
          onToggle={() => setShowInviteClientModal(false)}
        />
      )}
    </div>
  );
};
export const Route = createFileRoute("/_authenticated/dashboard/clients")({
  component: ClientsPage,
});

export default ClientsPage;
