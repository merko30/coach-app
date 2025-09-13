import { createFileRoute } from "@tanstack/react-router";
import Password from "@/components/Security/Password";

export const Route = createFileRoute("/_authenticated/security")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-8">Security settings</h1>
      <Password />
    </div>
  );
}
