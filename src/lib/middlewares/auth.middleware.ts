import type { AnyTRPCMiddlewareFunction } from "@trpc/server";
import { authUtils } from "../utils/auth.utils";

export const authMiddleware: AnyTRPCMiddlewareFunction = async ({
  next,
  ctx,
}) => {
  const user = authUtils.getTokenUser(ctx.req);

  return await next({
    ctx: {
      user,
    },
  });
};
