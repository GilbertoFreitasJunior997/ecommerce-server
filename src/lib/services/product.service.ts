import { db } from "../../db";
import type { ProductCreateDTO, ProductListDataDTO } from "../dtos/product.dto";
import { BaseError } from "../errors/_utils";
import type { ProductImageInsert } from "../models/product-image.model";
import { productImageRepository } from "../repositories/product-image.repository";
import { productRepository } from "../repositories/product.repository";
import { utapi } from "../routes/upload.route";

export const productService = {
  getListData: async (userId: number) => {
    return await productRepository.getListData(userId);
  },
  create: async (
    dto: ProductCreateDTO,
    userId: number,
  ): Promise<ProductListDataDTO> => {
    const hasDefaultImage = dto.images.find((image) => image.isDefault);
    if (!hasDefaultImage) {
      throw new BaseError({
        message: "Please provide a default image",
      });
    }

    const data = await db.transaction<ProductListDataDTO>(async (tx) => {
      const newProduct = await productRepository.create(
        {
          ...dto,
          userId,
          price: String(dto.price),
        },
        tx,
      );

      const images: ProductImageInsert[] = dto.images.map((image) => ({
        ...image,
        productId: newProduct.id,
      }));
      const newImages = await productImageRepository.createBatch(images, tx);

      return {
        ...newProduct,
        images: newImages,
      };
    });

    return data;
  },
  delete: async (id: number) => {
    // check if product is in a sale, if not, then hard delete.

    const data = await db.transaction(async (tx) => {
      const deletedImages = await productImageRepository.deleteAllExceptDefault(
        id,
        tx,
      );

      const imageKeys = deletedImages
        .map((image) => image.key)
        .filter((image) => image !== null);

      await utapi.deleteFiles(imageKeys);

      const deletedProduct = await productRepository.softDelete(id, tx);
      return deletedProduct;
    });

    return data;
  },
};
