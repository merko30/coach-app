import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import Sidebar from "@/components/Sidebar/index";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProviderSkeleton } from "@/components/AuthProviderSkeleton";

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
  loader: () => <AuthProviderSkeleton />,
  component: () => (
    <SidebarProvider>
      <Sidebar />
      <main className="w-full p-4">
        <Outlet />
      </main>
    </SidebarProvider>
  ),
});
