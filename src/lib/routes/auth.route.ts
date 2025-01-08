import { privateProcedure, publicProcedure, router } from "../../trpc";
import { authSignInDTOSchema, authSignUpDTOSchema } from "../dtos/auth.dto";
import { authService } from "../services/auth.service";

export const authRoute = router({
  signUp: publicProcedure
    .input(authSignUpDTOSchema)
    .mutation(async ({ input, ctx }) => {
      const newUser = await authService.signUp(input, ctx);
      return newUser;
    }),
  signIn: publicProcedure
    .input(authSignInDTOSchema)
    .mutation(async ({ input, ctx }) => {
      const newUser = await authService.signIn(input, ctx);
      return newUser;
    }),
  signOff: privateProcedure.mutation(({ ctx }) => {
    authService.signOff(ctx);
  }),
});
