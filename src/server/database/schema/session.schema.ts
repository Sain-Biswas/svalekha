import { relations, sql } from "drizzle-orm";
import { index, sqliteTable } from "drizzle-orm/sqlite-core";

import { userSchema } from "~/server/database/schema.database";

export const sessionSchema = sqliteTable(
	"session",
	(table) => ({
		id: table.text("id").primaryKey(),
		expiresAt: table
			.integer("expires_at", { mode: "timestamp_ms" })
			.notNull(),
		token: table.text("token").notNull().unique(),
		createdAt: table
			.integer("created_at", { mode: "timestamp_ms" })
			.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
			.notNull(),
		updatedAt: table
			.integer("updated_at", { mode: "timestamp_ms" })
			.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
			.$onUpdateFn(() => /* @__PURE__ */ new Date())
			.notNull(),
		ipAddress: table.text("ip_address"),
		userAgent: table.text("user_agent"),
		userId: table
			.text("user_id")
			.notNull()
			.references(() => userSchema.id, { onDelete: "cascade" })
	}),
	(table) => [index("session_userId_idx").on(table.userId)]
);

export const sessionRelations = relations(sessionSchema, ({ one }) => ({
	user: one(userSchema, {
		fields: [sessionSchema.userId],
		references: [userSchema.id]
	})
}));
