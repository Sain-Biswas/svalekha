"use client";

import { useActionState, useState } from "react";
import { signupFormAction } from "./action";
import { initialFormState, mergeForm, useForm, useTransform } from "@tanstack/react-form-nextjs";
import { signupFormOptions } from "./shared-code";
import { Field, FieldError, FieldGroup, FieldLabel } from "~/shadcn/ui/field";
import { Alert, AlertTitle } from "~/shadcn/ui/alert";
import { IconAt, IconExclamationCircleFilled, IconEye, IconEyeClosed, IconLockPassword, IconSignature } from "@tabler/icons-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "~/shadcn/ui/input-group";
import { Button } from "~/shadcn/ui/button";
import { Spinner } from "~/shadcn/ui/spinner";

export function SignupForm() {
    const [state, action] = useActionState(signupFormAction, initialFormState);

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const form = useForm({
        ...signupFormOptions,
        transform: useTransform((baseForm) => mergeForm(baseForm, state), [state])
    });

    return (
        <form action={action as never} onSubmit={() => form.handleSubmit()}>
            <FieldGroup>
                <form.Subscribe selector={(formState) => formState.errorMap.onSubmit}>
                    {
                        (error) => (typeof error === "string")
                            ? (
                                    <Alert variant="destructive">
                                        <IconExclamationCircleFilled />
                                        <AlertTitle>{error}</AlertTitle>
                                    </Alert>
                                )
                            : null
                    }
                </form.Subscribe>

                <form.Field name="name">
                    {
                        (field) => {
                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>name</FieldLabel>
                                    <InputGroup>
                                        <InputGroupInput id={field.name} name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)} aria-invalid={isInvalid} placeholder="Someone's Name" autoComplete="off" />
                                        <InputGroupAddon>
                                            <IconSignature />
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {
                                        isInvalid && <FieldError errors={field.state.meta.errors} />
                                    }
                                </Field>
                            );
                        }
                    }
                </form.Field>

                <form.Field
                    name="email"
                >
                    {
                        (field) => {
                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>EMAIL</FieldLabel>
                                    <InputGroup>
                                        <InputGroupInput
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            aria-invalid={isInvalid}
                                            placeholder="someone@svalekha.com"
                                            autoComplete="off"
                                        />
                                        <InputGroupAddon>
                                            <IconAt className="size-5" />
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {isInvalid && (
                                        <FieldError errors={field.state.meta.errors} />
                                    )}
                                </Field>
                            );
                        }
                    }
                </form.Field>

                <form.Field
                    name="password"
                >
                    {
                        (field) => {
                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>password</FieldLabel>
                                    <InputGroup>
                                        <InputGroupInput
                                            id={field.name}
                                            name={field.name}
                                            type={showPassword ? "text" : "password"}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            aria-invalid={isInvalid}
                                            placeholder="********"
                                            autoComplete="off"
                                        />
                                        <InputGroupAddon>
                                            <IconLockPassword className="size-5" />
                                        </InputGroupAddon>
                                        <InputGroupAddon align="inline-end">
                                            <Button variant="ghost" size="icon" onClick={() => setShowPassword((curr) => !curr)}>
                                                {
                                                    showPassword ? <IconEye /> : <IconEyeClosed />
                                                }
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {isInvalid && (
                                        <FieldError errors={field.state.meta.errors} />
                                    )}
                                </Field>
                            );
                        }
                    }
                </form.Field>

                <form.Subscribe selector={(formState) => [formState.canSubmit, formState.isSubmitting]}>
                    {
                        ([canSubmit, isSubmitting]) => (
                            <Button type="submit" disabled={!canSubmit}>
                                {isSubmitting && <Spinner />}
                                Submit
                            </Button>
                        )
                    }
                </form.Subscribe>
            </FieldGroup>
        </form>
    );
}
