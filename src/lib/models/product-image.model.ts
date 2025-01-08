import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";
import { productImageTable } from "../../db/tables";

export const productImage = createSelectSchema(productImageTable);
export type ProductImage = z.infer<typeof productImage>;

export const productImageInsert = createInsertSchema(productImageTable);
export type ProductImageInsert = z.infer<typeof productImageInsert>;
