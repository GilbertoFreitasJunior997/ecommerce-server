import { publicProcedure, router } from "../trpc";

export const appRouter = router({
  greeting: publicProcedure.query(() => "hello tRPC"),
});

export type AppRouter = typeof appRouter;
