"use server";

import "server-only";

import { APIError } from "better-auth";
import { headers } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import { auth } from "~/server/authentication/index.auth";

export async function signoutUser() {
	try {
		await auth.api.signOut({
			headers: await headers()
		});
	} catch (error) {
		console.error(error);

		if (error instanceof APIError)
			return {
				success: false,
				message: "Can't signout user",
				description: error.message
			} as const;

		return {
			success: false,
			message: "Can't signout user",
			description: "Please try again after some time"
		} as const;
	}

	redirect("/signin", RedirectType.push);
}
