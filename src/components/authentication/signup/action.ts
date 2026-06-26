"use server";

import "server-only";

import {
	createServerValidate,
	ServerValidateError
} from "@tanstack/react-form-nextjs";
import { signupFormOptions, signupFormSchema } from "./shared-code";
import { auth } from "~/server/authentication/index.auth";
import { headers } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import { APIError } from "better-auth";

const serverValidate = createServerValidate({
	...signupFormOptions,

	onServerValidate: signupFormSchema
});

export async function signupFormAction(_prev: unknown, formData: FormData) {
	try {
		const value = await serverValidate(formData);

		await auth.api.signUpEmail({
			body: {
				name: value.name,
				email: value.email,
				password: value.password
			},
			headers: await headers()
		});

		redirect("/dashboard", RedirectType.replace);
	} catch (error) {
		if (error instanceof ServerValidateError) return error.formState;

		if (error instanceof APIError)
			return { errorMap: { onSubmit: error.message } };

		throw error;
	}
}
