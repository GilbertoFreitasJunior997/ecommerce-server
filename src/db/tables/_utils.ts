import { integer, serial, timestamp } from "drizzle-orm/pg-core";
import { userTable } from "./user.table";

export const cascadeReference = {
  onDelete: "cascade" as const,
  onUpdate: "cascade" as const,
};

export const id = () => serial().primaryKey();
export const userId = () =>
  integer("user_id")
    .references(() => userTable.id, cascadeReference)
    .notNull();

export const createdAt = () => timestamp("created_at").notNull().defaultNow();
export const updatedAt = () =>
  timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date());
