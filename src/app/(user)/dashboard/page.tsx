import { getSession } from "~/server/authentication/lib.auth";
import { DashboardHeader } from "./header";

export default async function DashboardPage({}: PageProps<"/dashboard">) {
    const session = await getSession();

    return (
        <>
            <DashboardHeader />
            <hr />
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
