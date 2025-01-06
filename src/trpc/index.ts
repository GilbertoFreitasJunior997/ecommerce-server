import { initTRPC } from "@trpc/server";
import type { Context } from "./context";

const trpc = initTRPC.context<Context>().create();

export const publicProcedure = trpc.procedure;
export const router = trpc.router;
