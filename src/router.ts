import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  greeting: publicProcedure.query(() => "Hello world"),
});

export type AppRouter = typeof appRouter;
