import type { AnyTRPCMiddlewareFunction } from "@trpc/server";
import { authUtils } from "../utils/auth.utils";

export const authMiddleware = async ({
  next,
  ctx,
}: Parameters<AnyTRPCMiddlewareFunction>[0]) => {
  const user = authUtils.getUserByRequest(ctx.req);

  return await next({
    ctx: {
      user,
    },
  });
};
