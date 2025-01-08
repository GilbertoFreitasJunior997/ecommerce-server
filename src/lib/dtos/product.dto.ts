import { z } from "zod";
import type { Product } from "../models/product.model";
import {
  type ProductListDataImageDTO,
  productImageCreateDTOSchema,
} from "./product-image.dto";

export const productCreateDTOSchema = z.object({
  name: z.string(),
  description: z.string().nullish(),
  price: z.number(),
  stock: z.number().nullish(),
  sku: z.string().nullish(),
  images: z.array(productImageCreateDTOSchema),
});
export type ProductCreateDTO = z.infer<typeof productCreateDTOSchema>;

export type ProductListDataDTO = Product & {
  images: ProductListDataImageDTO[];
};
