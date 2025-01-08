import {
  boolean,
  decimal,
  index,
  integer,
  pgTable,
  text,
} from "drizzle-orm/pg-core";
import { cascadeReference, createdAt, id, updatedAt } from "./_utils";
import { userId } from "./user.table";

export const productTable = pgTable(
  "products",
  {
    id: id(),
    name: text().notNull(),
    description: text(),
    price: decimal().notNull(),
    stock: integer(),
    sku: text(),

    userId: userId(),
    createdAt: createdAt(),
    updatedAt: updatedAt(),

    isDeleted: boolean("is_deleted").notNull().default(false),
  },
  (table) => ({
    skuIndex: index("sku_index").on(table.sku),
  }),
);

export const productId = () =>
  integer("product_id")
    .references(() => productTable.id, cascadeReference)
    .notNull();
