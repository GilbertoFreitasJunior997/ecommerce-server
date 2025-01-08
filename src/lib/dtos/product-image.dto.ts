import type { z } from "zod";
import {
  type ProductImage,
  productImageInsert,
} from "../models/product-image.model";

export const productImageCreateDTOSchema = productImageInsert
  .required({
    isDefault: true,
  })
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    productId: true,
  });
export type ProductImageCreateDTO = z.infer<typeof productImageCreateDTOSchema>;

export type ProductListDataImageDTO = Pick<ProductImage, "id" | "name" | "url">;
