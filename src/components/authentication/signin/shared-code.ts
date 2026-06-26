import { formOptions } from "@tanstack/react-form-nextjs";
import { z } from "zod";

export const signinFormSchema = z.object({
	email: z.email({ error: "Please enter a valid email address." }),
	password: z
		.string()
		.min(8, { error: "Password must be at least 8 characters." })
		.max(128, { error: "Password must be at most 128 characters." })
});

export const signinFormOptions = formOptions({
	validators: {
		onSubmit: signinFormSchema
	},

	defaultValues: {
		email: "",
		password: ""
	}
});
