import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { cascadeReference, createdAt, id, updatedAt } from "./_utils";
import { productTable } from "./product.table";

export const productImageTable = pgTable("product_image", {
  id: id(),
  description: text(),
  url: text().notNull(),

  productId: integer("product_id").references(
    () => productTable.id,
    cascadeReference,
  ),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});
