import { sql } from "drizzle-orm";
import { sqliteTable } from "drizzle-orm/sqlite-core";

export const userSchema = sqliteTable(
    "user",
    (table) => ({
        id: table.text("id", { length: 36 })
            .notNull()
            .primaryKey()
            .$defaultFn(() => crypto.randomUUID()),
        name: table.text("name"),
        email: table.text("email")
            .notNull()
            .unique(),
        emailVerified: table.integer("email_verified", { mode: "boolean" })
            .default(false),
        image: table.text("image"),
        createdAt: table.integer("created_at", { mode: "timestamp" })
            .default(sql`(unixepoch())`)
            .notNull(),
        updatedAt: table.integer("updated_at", { mode: "timestamp" })
            .$onUpdateFn(() => new Date())
    })
);
