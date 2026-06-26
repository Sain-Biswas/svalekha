import type { Config } from "drizzle-kit";

import { config } from "dotenv";

config({
	path: ".env.local"
});

export default {
	schema: "./src/server/database/schema.database.ts",
	dialect: "turso",
	out: "./temporary/drizzle",

	dbCredentials: {
		url: process.env["TURSO_DATABASE_URL"]!,
		authToken: process.env["TURSO_AUTH_TOKEN"]
	},

	tablesFilter: ["svalekha_*"]
} satisfies Config;
