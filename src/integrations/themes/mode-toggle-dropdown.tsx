"use client";

import { ComputerFreeIcons, Moon02FreeIcons, Sun03FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme } from "next-themes";
import { Button } from "~/shadcn/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "~/shadcn/ui/dropdown-menu";

export function ModeToggleDropdown() {
    const { setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={(
                <Button variant="outline" size="icon">
                    <HugeiconsIcon icon={Sun03FreeIcons} strokeWidth={2} className="rtl:rotate-180 h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                    <HugeiconsIcon icon={Moon02FreeIcons} strokeWidth={2} className="rtl:rotate-180 ms-auto absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            )}
            />
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                    <DropdownMenuShortcut>
                        <HugeiconsIcon icon={Sun03FreeIcons} strokeWidth={2} />
                    </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                    <DropdownMenuShortcut>
                        <HugeiconsIcon icon={Moon02FreeIcons} strokeWidth={2} />
                    </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                    <DropdownMenuShortcut>
                        <HugeiconsIcon icon={ComputerFreeIcons} strokeWidth={2} />
                    </DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
