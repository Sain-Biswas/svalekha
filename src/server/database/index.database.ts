import "server-only";

import { createClient } from "@libsql/client";
import type { Client } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import { serverEnv } from "~/constants/env/server.env";
import * as schema from "~/server/database/schema.database";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR update
 */
const globalForDb = globalThis as unknown as {
    client: Client | undefined;
};

export const client = globalForDb.client ?? createClient({
    url: serverEnv.TURSO_DATABASE_URL,
    authToken: serverEnv.TURSO_AUTH_TOKEN
});

if (serverEnv.NODE_ENV !== "production") globalForDb.client = client;

/**
 * LibSQL Database client wrapped by Drizzle ORM for interacting with SQLite database.
 */
export const database = drizzle(client, {
    schema
});
