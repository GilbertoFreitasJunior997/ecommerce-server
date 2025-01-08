import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "./_utils";
import { productId } from "./product.table";

export const productVariantTable = pgTable("product_variant", {
  id: id(),
  type: text().notNull(),
  value: text().notNull(),
  stock: integer(),
  sku: text(),

  productId: productId(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});
