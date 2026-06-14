import Image from "next/image";
import { ModeToggleDropdown } from "~/integrations/themes/mode-toggle-dropdown";
import { Button } from "~/shadcn/ui/button";

export default function IndexPage() {
    return (
        <div className="flex flex-col flex-1 items-center justify-center font-sans">
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
                <Image
                    className="dark:invert"
                    src="/next.svg"
                    alt="Next.js logo"
                    width={100}
                    height={20}
                    priority
                />

                <ModeToggleDropdown />

                <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
                    <h1 className="text-3xl font-bold leading-10 tracking-tight font-heading">
                        To get started, edit the page.tsx file.
                    </h1>
                    <p className="max-w-md text-lg leading-8 text-muted-foreground">
                        Looking for a starting point or more instructions? Head over to
                        {" "}
                        <a
                            className="font-medium text-foreground"
                        >
                            Templates
                        </a>
                        {" "}
                        or the
                        {" "}
                        <a
                            className="font-medium text-foreground"
                        >
                            Learning
                        </a>
                        {" "}
                        center.
                    </p>
                </div>
                <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
                    <Button size="lg">
                        <Image
                            src="/vercel.svg"
                            alt="Vercel"
                            width={16}
                            height={16}
                        />
                        Deploy Now
                    </Button>

                    <Button variant="outline" size="lg">
                        Documentation
                    </Button>
                </div>
            </main>
        </div>
    );
}
