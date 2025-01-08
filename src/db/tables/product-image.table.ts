import { boolean, integer, pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "./_utils";
import { productId } from "./product.table";

export const productImageTable = pgTable("product_image", {
  id: id(),
  name: text().notNull(),
  size: integer().notNull(),
  type: text().notNull(),
  key: text(),
  url: text().notNull(),
  isDefault: boolean("is_default").notNull().default(false),

  productId: productId(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});
