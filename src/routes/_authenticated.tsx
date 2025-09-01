import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import Sidebar from "@/components/Sidebar/index";
import { SidebarProvider } from "@/components/ui/sidebar";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth?.loggedIn) {
      throw redirect({
        to: "/login",
        search: {
          // Save current location for redirect after login
          redirect: location.href,
        },
      });
    }
  },
  component: () => (
    <SidebarProvider>
      <Sidebar />
      <main className="w-full p-4">
        <Outlet />
      </main>
    </SidebarProvider>
  ),
});
