import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  greeting: publicProcedure.query(() => process.env.CLIENT_URL),
});

export type AppRouter = typeof appRouter;
