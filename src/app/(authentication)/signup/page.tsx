import "server-only";

import { IconReportMoneyFilled } from "@tabler/icons-react";
import Link from "next/link";
import { SignupForm } from "~/components/authentication/signup/form";
import { Button } from "~/shadcn/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "~/shadcn/ui/card";
import { ItemMedia } from "~/shadcn/ui/item";

export default function SignupPage({}: PageProps<"/signup">) {
    return (
        <>
            <CardHeader className="justify-center text-center">
                <ItemMedia variant="icon">
                    <IconReportMoneyFilled className="size-6" />
                </ItemMedia>
                <CardTitle>Welcome to svaLekha</CardTitle>
                <CardDescription className="text-center">
                    Already have an account?
                    <Button variant="link" className="px-2"><Link href="/signin">sign up</Link></Button>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <SignupForm />
            </CardContent>
        </>
    );
}
