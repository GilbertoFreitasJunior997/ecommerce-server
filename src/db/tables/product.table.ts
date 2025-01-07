import { decimal, pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt, userId } from "./_utils";

export const productTable = pgTable("products", {
  id: id(),
  name: text().notNull(),
  price: decimal({
    precision: 2,
  }),

  userId: userId(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});
