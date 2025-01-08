import { and, eq, getTableColumns, sql } from "drizzle-orm";
import { type TxOrDb, db } from "../../db";
import { productImageTable } from "../../db/tables/product-image.table";
import { productTable } from "../../db/tables/product.table";
import type { ProductListDataImageDTO } from "../dtos/product-image.dto";
import type { ProductListDataDTO } from "../dtos/product.dto";
import type { ProductInsert } from "../models/product.model";

export const productRepository = {
  getListData: async (userId: number): Promise<ProductListDataDTO[]> => {
    const data = await db
      .select({
        ...getTableColumns(productTable),
        images: sql<ProductListDataImageDTO[]>`json_agg(
          json_build_object(
            'id', ${productImageTable.id},
            'url', ${productImageTable.url},
            'name', ${productImageTable.name}
          )
        )`,
      })
      .from(productTable)
      .where(
        and(eq(productTable.isDeleted, false), eq(productTable.userId, userId)),
      )
      .leftJoin(
        productImageTable,
        eq(productTable.id, productImageTable.productId),
      )
      .groupBy(productTable.id);

    return data;
  },
  create: async (insert: ProductInsert, txOrDb: TxOrDb = db) => {
    const [data] = await txOrDb.insert(productTable).values(insert).returning();

    return data;
  },
  softDelete: async (id: number, txOrDb: TxOrDb = db) => {
    const [data] = await txOrDb
      .update(productTable)
      .set({
        isDeleted: true,
      })
      .where(eq(productTable.id, id))
      .returning();

    return data;
  },
};
