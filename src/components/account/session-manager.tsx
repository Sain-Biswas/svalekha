import "server-only";

import { headers } from "next/headers";
import { formatRelative, subDays } from "date-fns";

import { auth } from "~/server/authentication/index.auth";
import { Button } from "~/shadcn/ui/button";
import { Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemGroup, ItemHeader, ItemTitle } from "~/shadcn/ui/item";

export async function SessionManager({ currentSession }: { currentSession: string }) {
    const sessions = (await auth.api.listSessions({ headers: await headers() })).filter((session) => session.token !== currentSession);

    return (
        <section className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h1 className="font-heading font-bold uppercase text-lg">
                    Active Sessions
                    {" "}
                    <span className="text-destructive">
                        (
                        {" "}
                        {sessions.length.toString()}
                        {" "}
                        )
                    </span>
                </h1>
                <Button className="text-wrap" variant="destructive" size="lg">
                    Revoke all other sessions
                </Button>
            </div>

            <ItemGroup className="gap-4">
                {
                    sessions.map((session) => (
                        <Item key={session.id} variant="muted">
                            <ItemHeader className="text-sm font-bold uppercase">
                                {session.userAgent}
                            </ItemHeader>
                            <ItemContent>
                                <ItemTitle>{session.ipAddress}</ItemTitle>
                                <ItemDescription className="uppercase text-xs font-bold">
                                    Last updated:
                                    {" "}
                                    {formatRelative(session.updatedAt, new Date())}
                                </ItemDescription>
                            </ItemContent>
                            <ItemActions>
                                <Button variant="destructive" size="sm">Revoke</Button>
                            </ItemActions>
                            <ItemFooter>
                                <p className="text-xs uppercase font-bold text-chart-1">
                                    Session created :
                                    {" "}
                                    {formatRelative(session.createdAt, new Date())}
                                </p>
                                <p className="text-xs uppercase font-bold text-destructive">
                                    Expires :
                                    {" "}
                                    {formatRelative(session.expiresAt, new Date())}
                                </p>
                            </ItemFooter>
                        </Item>
                    ))
                }
            </ItemGroup>
        </section>
    );
}
