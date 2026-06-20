import { getSession } from "~/server/authentication/lib.auth";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "~/shadcn/ui/breadcrumb";
import { Separator } from "~/shadcn/ui/separator";
import { SidebarTrigger } from "~/shadcn/ui/sidebar";

export default async function DashboardPage({}: PageProps<"/dashboard">) {
    const session = await getSession();

    return (
        <>
            <header className="flex h-10 shrink-0 items-center gap-2">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 my-auto data-[orientation=vertical]:h-5 block" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbPage>Dashboard</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <main>
                <div>
                    <pre className="overflow-auto rounded-md p-4 text-sm">
                        {JSON.stringify(session?.user, null, 2)}
                    </pre>
                </div>
            </main>
        </>
    );
}
