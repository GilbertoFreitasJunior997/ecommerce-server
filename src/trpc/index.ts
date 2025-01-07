import { initTRPC } from "@trpc/server";
import { authMiddleware } from "../lib/middlewares/auth.middleware";
import type { Context } from "./context";

export const trpc = initTRPC.context<Context>().create();

export const privateProcedure = trpc.procedure.use(authMiddleware);
export const publicProcedure = trpc.procedure;
export const router = trpc.router;
