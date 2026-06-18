import { index, sqliteTable } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";

import { userSchema } from "~/server/database/schema.database";

export const accountSchema = sqliteTable(
    "account",
    (table) => ({
        id: table.text("id")
            .primaryKey(),
        accountId: table.text("account_id")
            .notNull(),
        providerId: table.text("provider_id")
            .notNull(),
        userId: table.text("user_id")
            .notNull()
            .references(() => userSchema.id, { onDelete: "cascade" }),
        accessToken: table.text("access_token"),
        refreshToken: table.text("refresh_token"),
        idToken: table.text("id_token"),
        accessTokenExpiresAt: table.integer("access_token_expires_at", { mode: "timestamp_ms" }),
        refreshTokenExpiresAt: table.integer("refresh_token_expires_at", { mode: "timestamp_ms" }),
        scope: table.text("scope"),
        password: table.text("password"),
        createdAt: table.integer("created_at", { mode: "timestamp_ms" })
            .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
            .notNull(),
        updatedAt: table.integer("updated_at", { mode: "timestamp_ms" })
            .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
            .$onUpdateFn(() => /* @__PURE__ */ new Date())
            .notNull()
    }),
    (table) => [index("account_userId_idx")
        .on(table.userId)]
);

export const accountRelations = relations(accountSchema, ({ one }) => ({
    user: one(userSchema, {
        fields: [accountSchema.userId],
        references: [userSchema.id]
    })
}));
