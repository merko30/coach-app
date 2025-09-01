import { createFileRoute, Outlet } from "@tanstack/react-router";

// Layout route (has children but no index page)
export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <Outlet />
  );
}
