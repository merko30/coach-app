import { ChartBarIncreasing, Home, Sheet, User2, Users } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";

import LogoutButton from "./LogoutButton";
import useIsCoach from "@/hooks/useIsCoach";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Clients",
    url: "/dashboard/clients",
    icon: Users,
    coach: true,
  },
  {
    title: "Plans",
    url: "/dashboard/plans",
    icon: Sheet,
    coach: true,
  },
  {
    title: "Your progress",
    url: "/dashboard/progress",
    icon: ChartBarIncreasing,
    coach: false,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User2,
  },
];

export default function AppSidebar() {
  const isCoach = useIsCoach();
  return (
    <Sidebar>
      <SidebarContent className="h-full">
        <SidebarGroup className="h-full">
          <SidebarGroupLabel className="text-2xl font-bold text-primary mb-4">
            ST<span className="text-foreground">RUN</span>
          </SidebarGroupLabel>
          <SidebarGroupContent className="h-full">
            <SidebarMenu>
              {items
                .filter(
                  (item) =>
                    (isCoach ? item.coach : !item.coach) || !("coach" in item)
                )
                .map((item) => (
                  <SidebarMenuItem key={item.title} className="cursor-pointer">
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroupContent>
            <SidebarContent>
              <LogoutButton />
            </SidebarContent>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
