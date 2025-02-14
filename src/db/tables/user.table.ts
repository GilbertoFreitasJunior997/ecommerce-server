import { index, integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { cascadeReference, createdAt, updatedAt } from "./_utils";

export const userTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    email: text().notNull().unique(),
    name: text().notNull(),
    password: text().notNull(),

    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (table) => ({
    emailIndex: index("email_index").on(table.email),
    nameIndex: index("name_index").on(table.name),
  }),
);

export const userId = () =>
  integer("user_id")
    .references(() => userTable.id, cascadeReference)
    .notNull();
