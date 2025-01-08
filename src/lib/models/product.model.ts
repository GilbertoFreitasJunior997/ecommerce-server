import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";
import { productTable } from "../../db/tables";

export const productSchema = createSelectSchema(productTable);
export type Product = z.infer<typeof productSchema>;

export const productInsertSchema = createInsertSchema(productTable);
export type ProductInsert = z.infer<typeof productInsertSchema>;
