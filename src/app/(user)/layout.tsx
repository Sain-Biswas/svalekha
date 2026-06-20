import "server-only";

import { redirect, RedirectType } from "next/navigation";
import { ReactNode, Suspense } from "react";
import { getSession } from "~/server/authentication/lib.auth";

export default function UserLayout({
    children
}: LayoutProps<"/">) {
    return (
        <main className="min-h-screen">
            <Suspense fallback={<div>Loading User Layout</div>}>
                <AuthWrapper>
                    {children}
                </AuthWrapper>
            </Suspense>
        </main>
    );
}

async function AuthWrapper({ children }: { children: ReactNode }) {
    const session = await getSession();

    if (!session) {
        redirect("/signin", RedirectType.replace);
    }

    return children;
}
