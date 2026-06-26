import "server-only";

import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";
import { Suspense } from "react";
import type { ReactNode } from "react";
import { getSession } from "~/server/authentication/lib.auth";
import { Button } from "~/shadcn/ui/button";
import { Card, CardFooter } from "~/shadcn/ui/card";

export default function AuthenticationLayout({ children }: LayoutProps<"/">) {
	return (
		<main className="grid min-h-screen place-content-center p-4">
			<Card className="max-w-108">
				<Suspense fallback={<div>Loading Authentication Layout</div>}>
					<AuthWrapper>{children}</AuthWrapper>
				</Suspense>
				<CardFooter className="flex-wrap justify-center">
					<span>By clicking continue, you agree to our</span>
					<span>
						<Button
							variant="link"
							className="px-2"
						>
							<Link href="/">Terms of service</Link>
						</Button>
					</span>
					<span>and</span>
					<span>
						<Button
							variant="link"
							className="px-2"
						>
							<Link href="/">Privacy Policy</Link>
						</Button>
					</span>
				</CardFooter>
			</Card>
		</main>
	);
}

async function AuthWrapper({ children }: { children: ReactNode }) {
	const session = await getSession();

	if (!!session) {
		redirect("/dashboard", RedirectType.replace);
	}

	return children;
}
