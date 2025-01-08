import { privateProcedure, router } from "../../trpc";
import { productCreateDTOSchema } from "../dtos/product.dto";
import { idParamSchema } from "../models/utils.model";
import { productService } from "../services/product.service";

export const productRoute = router({
  getListData: privateProcedure.query(async ({ ctx }) => {
    return await productService.getListData(ctx.user.id);
  }),
  create: privateProcedure
    .input(productCreateDTOSchema)
    .mutation(async ({ input, ctx }) => {
      return await productService.create(input, ctx.user.id);
    }),
  delete: privateProcedure.input(idParamSchema).mutation(async ({ input }) => {
    return await productService.delete(input.id);
  }),
});
