"use server";

import { ServerValidateError, createServerValidate } from "@tanstack/react-form-nextjs";
import { APIError } from "better-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { signinFormOptions, signinFormSchema } from "~/components/authentication/signin/shared-code";
import { auth } from "~/server/authentication/config.auth";

const serverValidate = createServerValidate({
    ...signinFormOptions,

    onServerValidate: signinFormSchema
});

export async function signinFormAction(_prev: unknown, formData: FormData) {
    try {
        const value = await serverValidate(formData);

        console.log("validated data: ", value.email, value.password);

        await auth.api.signInEmail({
            body: {
                email: value.email,
                password: value.password,
                rememberMe: true
            },
            headers: await headers()
        });

        redirect("/dashboard");
    }
    catch (error) {
        if (error instanceof ServerValidateError) return error.formState;

        if (error instanceof APIError) return { errorMap: { onSubmit: error.message } };

        throw error;
    }
}
