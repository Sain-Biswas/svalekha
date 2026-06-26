import "server-only";

import { SessionManager } from "~/components/account/session-manager";
import { getSession } from "~/server/authentication/lib.auth";
import { Avatar, AvatarFallback, AvatarImage } from "~/shadcn/ui/avatar";

import {
	IconLogout,
	IconRosetteDiscountCheck,
	IconRosetteDiscountCheckOff,
	IconUserEdit
} from "@tabler/icons-react";
import { Badge } from "~/shadcn/ui/badge";
import { AccountHeader } from "./header";
import { Button } from "~/shadcn/ui/button";
import { formatDate } from "date-fns";

export default async function AccountPage() {
	const { session, user } = (await getSession())!;

	return (
		<>
			<AccountHeader />
			<hr />
			<main className="@container p-4">
				<section
					id="account-user-information"
					className="mb-8 flex flex-col gap-5 @4xl:flex-row"
				>
					<div className="flex justify-center">
						<Avatar className="size-32">
							<AvatarImage
								src={user.image || undefined}
								alt={user.name}
							/>
							<AvatarFallback className="size-32 text-6xl">
								{user.name.charAt(0).toUpperCase()}
							</AvatarFallback>
						</Avatar>
					</div>
					<div className="pt-5 text-center @4xl:text-left">
						<p className="font-heading text-xl font-bold tracking-wider uppercase">
							{user.name}
						</p>
						<div className="flex flex-wrap items-center justify-center gap-3">
							<p className="lowercase">{user.email}</p>
							{user.emailVerified ?
								<Badge className="bg-chart-1/10 p-1 text-chart-1">
									<IconRosetteDiscountCheck stroke={2} />
									Email Verified
								</Badge>
							:	<Badge
									variant="destructive"
									className="bg-destructive/10 p-1"
								>
									<IconRosetteDiscountCheckOff stroke={2} />
									Email Unverified
								</Badge>
							}
						</div>
						<p className="mt-2 text-[10px] font-bold tracking-wider text-chart-1 uppercase">
							Joined - {formatDate(user.createdAt, "PPPP")}
						</p>
						<p className="text-[10px] font-bold tracking-wider uppercase">
							Updated - {formatDate(user.updatedAt, "PPPP")}
						</p>
					</div>
					<div className="flex justify-center @4xl:ml-auto @4xl:flex-col @4xl:justify-between">
						<Button variant="secondary">
							<IconUserEdit stroke={2} />
							Edit
						</Button>
						<Button variant="destructive">
							<IconLogout stroke={2} />
							Logout
						</Button>
					</div>
				</section>

				<SessionManager currentSession={session.token} />
			</main>
		</>
	);
}
