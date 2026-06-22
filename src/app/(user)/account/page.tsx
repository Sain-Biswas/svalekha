import { getSession } from "~/server/authentication/lib.auth";
import { AccountHeader } from "./header";

export default async function AccountPage() {
    const { session, user } = (await getSession())!;
    return (
        <>
            <AccountHeader />
            <hr />
            <main className="p-4">
                <div>
                    <h1 className="uppercase font-heading text-lg font-bold underline">Current User</h1>
                    <pre className="overflow-auto font-mono rounded-md p-4 text-sm">
                        {JSON.stringify(user, null, 2)}
                    </pre>
                </div>

                <div>
                    <h1 className="uppercase font-heading text-lg font-bold underline">Current Session</h1>
                    <pre className="overflow-auto font-mono rounded-md p-4 text-sm">
                        {JSON.stringify(session, null, 2)}
                    </pre>
                </div>
            </main>
        </>
    );
}
