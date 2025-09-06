import { lazy } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { useAuth } from "@/context/AuthProvider";

const AthleteDashboard = lazy(() => import("@/components/Dashboard/Athlete"));
const CoachDashboard = lazy(() => import("@/components/Dashboard/Coach"));

export const Route = createFileRoute("/_authenticated/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuth();

  // make a provider with a toggle if the user is both athlete and coach
  if (user.roles?.includes("coach")) {
    return <CoachDashboard />;
  }

  return <AthleteDashboard />;
}
