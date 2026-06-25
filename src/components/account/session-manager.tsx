import "server-only";

import { formatRelative } from "date-fns";
import { headers } from "next/headers";

import { auth } from "~/server/authentication/index.auth";
import { Button } from "~/shadcn/ui/button";
import { Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemGroup, ItemHeader, ItemTitle } from "~/shadcn/ui/item";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "~/shadcn/ui/empty";
import { IconDeviceDesktopFilled } from "@tabler/icons-react";

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

            {
                (sessions.length > 0)
                    ? (
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
                        )
                    : (
                            <Empty className="border border-dashed">
                                <EmptyHeader>
                                    <EmptyMedia variant="icon">
                                        <IconDeviceDesktopFilled />
                                    </EmptyMedia>
                                    <EmptyTitle>No other active sessions</EmptyTitle>
                                    <EmptyDescription>
                                        No other active sessions were found.
                                        When you sign in on another device, it will appear here.
                                    </EmptyDescription>
                                </EmptyHeader>
                            </Empty>
                        )
            }

        </section>
    );
}
