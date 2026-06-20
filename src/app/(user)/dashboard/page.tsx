import "server-only";

import { getSession } from "~/server/authentication/lib.auth";

export default async function DashboardPage({}: PageProps<"/dashboard">) {
    const session = await getSession();

    return (
        <div>
            <p>Dashboard</p>
            <div>
                {JSON.stringify(session, null, 2)}
            </div>
        </div>
    );
}
