import { serial, timestamp } from "drizzle-orm/pg-core";

export const cascadeReference = {
  onDelete: "cascade" as const,
  onUpdate: "cascade" as const,
};

export const id = () => serial().primaryKey();

export const createdAt = () => timestamp("created_at").notNull().defaultNow();
export const updatedAt = () =>
  timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date());
