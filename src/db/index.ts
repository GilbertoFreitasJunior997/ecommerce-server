import type { ExtractTablesWithRelations } from "drizzle-orm";
import type { PgTransaction } from "drizzle-orm/pg-core";
import {
  type PostgresJsQueryResultHKT,
  drizzle,
} from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "../lib/env";
import * as schema from "./tables";

const client = postgres(env.DATABASE_URL);

export const db = drizzle(client, {
  schema,
});

export type TxOrDb =
  | typeof db
  | PgTransaction<
      PostgresJsQueryResultHKT,
      typeof schema,
      ExtractTablesWithRelations<typeof schema>
    >;
