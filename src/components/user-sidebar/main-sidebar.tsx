import { IconReportMoneyFilled } from "@tabler/icons-react";
import Link from "next/link";
import type { ComponentProps } from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail
} from "~/shadcn/ui/sidebar";
import { NavUserDropdown } from "./nav-user-dropdown";
import { SidebarContents } from "./sidebar-contents";

export function MainSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar
			collapsible="icon"
			{...props}
		>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							size="lg"
							render={
								<Link
									href="#"
									className="m-0 p-0"
								>
									<div className="flex aspect-square size-8 items-center justify-center rounded bg-sidebar-primary text-sidebar-primary-foreground">
										<IconReportMoneyFilled />
									</div>
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-heading font-medium uppercase">
											sva lekha
										</span>
										<span className="truncate text-xs">
											Your Personal Financial Journal
										</span>
									</div>
								</Link>
							}
						/>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarContents />
			</SidebarContent>
			<SidebarFooter>
				<NavUserDropdown />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
