import "server-only";

import { IconReportMoneyFilled } from "@tabler/icons-react";
import Link from "next/link";
import { SigninForm } from "~/components/authentication/signin/form";
import { Button } from "~/shadcn/ui/button";
import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "~/shadcn/ui/card";
import { ItemMedia } from "~/shadcn/ui/item";

export default async function SigninPage({}: PageProps<"/signin">) {
	return (
		<>
			<CardHeader className="justify-center text-center">
				<ItemMedia variant="icon">
					<IconReportMoneyFilled className="size-6" />
				</ItemMedia>
				<CardTitle>Welcome back to svaLekha</CardTitle>
				<CardDescription className="text-center">
					Don&apos;t have an account?
					<Button
						variant="link"
						className="px-2"
					>
						<Link href="/signup">sign up</Link>
					</Button>
				</CardDescription>
			</CardHeader>
			<CardContent>
				<SigninForm />
			</CardContent>
		</>
	);
}
