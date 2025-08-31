import Sidebar from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

// Layout route (has children but no index page)
export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <SidebarProvider>
      <Sidebar />
      <main className="w-full p-4">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
