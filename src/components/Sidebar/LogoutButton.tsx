import { useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthProvider";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Button } from "../ui/button";

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  return (
    <SidebarMenuItem className="mt-auto cursor-pointer list-none">
      <SidebarMenuButton asChild>
        <Button onClick={onLogout}>
          <LogOut />
          Logout
        </Button>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default LogoutButton;
