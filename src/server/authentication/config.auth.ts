import "server-only";

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { openAPI } from "better-auth/plugins";

import { database } from "~/server/database/index.database";
import { userSchema, accountSchema, sessionSchema, verificationSchema } from "~/server/database/schema.database";

export const auth = betterAuth(
    {
        appName: "svaLekha",

        database: drizzleAdapter(
            database,
            {
                provider: "sqlite",
                schema: {
                    user: userSchema,
                    account: accountSchema,
                    session: sessionSchema,
                    verification: verificationSchema
                }
            }
        ),

        session: {
            deferSessionRefresh: true
        },

        emailAndPassword: {
            enabled: true,
            autoSignIn: true
        },

        plugins: [
            nextCookies(),
            openAPI()
        ]
    }
);
