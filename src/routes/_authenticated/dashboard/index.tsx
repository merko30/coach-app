import { createFileRoute } from "@tanstack/react-router";
import { StatsBoxes } from "@/components/DashboardWidgets";
import { AthleteQuestionsList } from "@/components/AthleteQuestionsList";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-6">
      <StatsBoxes />
      <AthleteQuestionsList />
      {/* Add more widgets here as needed */}
    </div>
  );
}
