import { and, eq } from "drizzle-orm";
import { type TxOrDb, db } from "../../db";
import { productImageTable } from "../../db/tables";
import type { ProductImageInsert } from "../models/product-image.model";

export const productImageRepository = {
  createBatch: async (insert: ProductImageInsert[], txOrDb: TxOrDb = db) => {
    const data = await txOrDb
      .insert(productImageTable)
      .values(insert)
      .returning();

    return data;
  },
  deleteAllExceptDefault: async (productId: number, txOrDb: TxOrDb = db) => {
    const data = await txOrDb
      .delete(productImageTable)
      .where(
        and(
          eq(productImageTable.isDefault, false),
          eq(productImageTable.productId, productId),
        ),
      )
      .returning();

    return data;
  },
};
