"use client";

import { IconChevronRightFilled, IconExclamationCircleFilled, IconLogout, IconRefresh, IconRosetteDiscountCheckFilled } from "@tabler/icons-react";
import { authClient } from "~/integrations/authentication/client.auth";
import { cn } from "~/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "~/shadcn/ui/avatar";
import { Button } from "~/shadcn/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "~/shadcn/ui/dropdown-menu";
import { Item, ItemContent, ItemMedia } from "~/shadcn/ui/item";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "~/shadcn/ui/sidebar";
import { Skeleton } from "~/shadcn/ui/skeleton";
import { signoutUser } from "./signout";
import { toast } from "sonner";
import Link from "next/link";

export function NavUserDropdown() {
    const { isMobile } = useSidebar();
    const { data, isPending, error, refetch, isRefetching } = authClient.useSession();

    if (isPending) {
        return (
            <SidebarMenu>
                <SidebarMenuItem>
                    <Item>
                        <Skeleton className="size-8 rounded-full" />
                        <ItemContent>
                            <Skeleton className="w-full h-3" />
                            <Skeleton className="w-full h-3" />
                        </ItemContent>
                        <Skeleton className="size-8" />
                    </Item>
                </SidebarMenuItem>
            </SidebarMenu>
        );
    }

    if (error || !data) {
        return (
            <SidebarMenu>
                <SidebarMenuItem>
                    <Item variant="outline" size="xs">
                        <ItemMedia variant="icon" className="size-8 bg-accent rounded">
                            <IconExclamationCircleFilled />
                        </ItemMedia>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">Profile unavailable</span>
                            <span className="truncate text-xs">Couldn&apos;t fetch your account</span>
                        </div>
                        <Button disabled={isRefetching} onClick={() => refetch()} size="icon-sm" variant="ghost">
                            <IconRefresh stroke={2} className={cn(isRefetching && "animate-spin")} />
                        </Button>
                    </Item>
                </SidebarMenuItem>
            </SidebarMenu>
        );
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            (
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <Avatar size="default">
                                        <AvatarImage src={data.user.image || undefined} alt={data.user.name} />
                                        <AvatarFallback>{data.user.name.charAt(0).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-heading font-semibold">{data.user.name}</span>
                                        <span className="truncate text-xs">{data.user.email}</span>
                                    </div>
                                    <IconChevronRightFilled className="ml-auto size-4" />
                                </SidebarMenuButton>
                            )
                        }
                    />
                    <DropdownMenuContent
                        className="min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuGroup>
                            <DropdownMenuLabel className="p-0 font-normal">
                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    <Avatar size="lg">
                                        <AvatarImage src={data.user.image || undefined} alt={data.user.name} />
                                        <AvatarFallback>{data.user.name.charAt(0).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-bold font-heading uppercase">{data.user.name}</span>
                                        <span className="truncate text-xs lowercase">{data.user.email}</span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <Link href="/account">
                                <DropdownMenuItem>
                                    <IconRosetteDiscountCheckFilled />
                                    Account
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            variant="destructive"
                            onClick={async () => {
                                const data = await signoutUser();

                                if (data.success === false) {
                                    toast.error(data.message, { description: data.description });
                                }
                            }}
                        >
                            <IconLogout stroke={2} />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
