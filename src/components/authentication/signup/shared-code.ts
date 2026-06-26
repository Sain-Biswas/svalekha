import { formOptions } from "@tanstack/react-form-nextjs";
import { z } from "zod";

export const signupFormSchema = z.object({
	name: z.string().min(1, { error: "A name is needed for account creation" }),
	email: z.email({ error: "Please enter a valid email address." }),
	password: z
		.string()
		.min(8, { error: "Password must be at least 8 characters." })
		.max(128, { error: "Password must be at most 128 characters." })
});

export const signupFormOptions = formOptions({
	validators: {
		onSubmit: signupFormSchema
	},

	defaultValues: {
		name: "",
		email: "",
		password: ""
	}
});
