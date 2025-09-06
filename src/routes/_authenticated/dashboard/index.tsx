import { lazy } from "react";
import { createFileRoute } from "@tanstack/react-router";

import useIsCoach from "@/hooks/useIsCoach";

const AthleteDashboard = lazy(() => import("@/components/Dashboard/Athlete"));
const CoachDashboard = lazy(() => import("@/components/Dashboard/Coach"));

export const Route = createFileRoute("/_authenticated/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const isCoach = useIsCoach();

  // make a provider with a toggle if the user is both athlete and coach
  if (isCoach) {
    return <CoachDashboard />;
  }

  return <AthleteDashboard />;
}
