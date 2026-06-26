import "server-only";

import { SessionManager } from "~/components/account/session-manager";
import { getSession } from "~/server/authentication/lib.auth";
import { Avatar, AvatarFallback, AvatarImage } from "~/shadcn/ui/avatar";

import { IconLogout, IconRosetteDiscountCheck, IconRosetteDiscountCheckOff, IconUserEdit } from "@tabler/icons-react";
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
            <main className="p-4 @container">
                <section id="account-user-information" className="mb-8 flex flex-col @4xl:flex-row gap-5">
                    <div className="flex justify-center">
                        <Avatar className="size-32">
                            <AvatarImage src={user.image || undefined} alt={user.name} />
                            <AvatarFallback className="size-32 text-6xl">
                                {user.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="pt-5 @4xl:text-left text-center">
                        <p className="font-heading text-xl font-bold tracking-wider uppercase">{user.name}</p>
                        <div className="flex gap-3 justify-center flex-wrap items-center">
                            <p className="lowercase">{user.email}</p>
                            {
                                user.emailVerified
                                    ? (
                                            <Badge className="bg-chart-1/10 p-1 text-chart-1">
                                                <IconRosetteDiscountCheck stroke={2} />
                                                Email Verified
                                            </Badge>
                                        )
                                    : (
                                            <Badge variant="destructive" className="bg-destructive/10 p-1">
                                                <IconRosetteDiscountCheckOff stroke={2} />
                                                Email Unverified
                                            </Badge>
                                        )
                            }
                        </div>
                        <p className="uppercase tracking-wider mt-2 font-bold text-[10px] text-chart-1">
                            Joined -
                            {" "}
                            {formatDate(user.createdAt, "PPPP")}
                        </p>
                        <p className="uppercase tracking-wider font-bold text-[10px]">
                            Updated -
                            {" "}
                            {formatDate(user.updatedAt, "PPPP")}
                        </p>
                    </div>
                    <div className="@4xl:ml-auto flex justify-center @4xl:flex-col @4xl:justify-between">
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
