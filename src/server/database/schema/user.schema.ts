import { relations, sql } from "drizzle-orm";
import { sqliteTable } from "drizzle-orm/sqlite-core";

import { sessionSchema, accountSchema } from "~/server/database/schema.database";

export const userSchema = sqliteTable(
    "user",
    (table) => ({
        id: table.text("id")
            .primaryKey(),
        name: table.text("name"),
        email: table.text("email")
            .notNull()
            .unique(),
        emailVerified: table.integer("email_verified", { mode: "boolean" })
            .default(false),
        image: table.text("image"),
        createdAt: table.integer("created_at", { mode: "timestamp_ms" })
            .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
            .notNull(),
        updatedAt: table.integer("updated_at", { mode: "timestamp_ms" })
            .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
            .$onUpdateFn(() => /* @__PURE__ */ new Date())
            .notNull()
    })
);

export const userRelations = relations(userSchema, ({ many }) => ({
    sessions: many(sessionSchema),
    accounts: many(accountSchema)
}));
