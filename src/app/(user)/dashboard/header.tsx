import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage
} from "~/shadcn/ui/breadcrumb";
import { Separator } from "~/shadcn/ui/separator";
import { SidebarTrigger } from "~/shadcn/ui/sidebar";

export function DashboardHeader() {
	return (
		<header className="flex h-10 shrink-0 items-center gap-2">
			<div className="flex items-center gap-2 px-4">
				<SidebarTrigger className="-ml-1" />
				<Separator
					orientation="vertical"
					className="my-auto mr-2 block data-[orientation=vertical]:h-5"
				/>
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbPage>Dashboard</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>
		</header>
	);
}
