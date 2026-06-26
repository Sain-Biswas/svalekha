import "server-only";

import { redirect, RedirectType } from "next/navigation";
import { Suspense } from "react";
import type { ReactNode } from "react";
import { getSession } from "~/server/authentication/lib.auth";
import { SidebarInset, SidebarProvider } from "~/shadcn/ui/sidebar";
import { MainSidebar } from "~/components/user-sidebar/main-sidebar";

export default function UserLayout({ children }: LayoutProps<"/">) {
	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "20rem",
					"--sidebar-width-mobile": "20rem"
				} as React.CSSProperties
			}
		>
			<MainSidebar />
			<SidebarInset>
				<Suspense fallback={<div>Loading User Layout</div>}>
					<AuthWrapper>{children}</AuthWrapper>
				</Suspense>
			</SidebarInset>
		</SidebarProvider>
	);
}

async function AuthWrapper({ children }: { children: ReactNode }) {
	const session = await getSession();

	if (!session) {
		redirect("/signin", RedirectType.replace);
	}

	return children;
}
