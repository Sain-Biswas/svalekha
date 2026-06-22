import { IconLayoutDashboardFilled } from "@tabler/icons-react";
import Link from "next/link";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton } from "~/shadcn/ui/sidebar";

export function SidebarContents() {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Sections</SidebarGroupLabel>
            <SidebarMenu>
                <Link href="/dashboard">
                    <SidebarMenuButton tooltip="Dashboard">
                        <IconLayoutDashboardFilled />
                        <span>Dashboard</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenu>
        </SidebarGroup>
    );
}
