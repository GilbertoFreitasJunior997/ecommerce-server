import { authRoute } from "./lib/routes/auth.route";
import { router } from "./trpc";

export const appRouter = router({
  auth: authRoute,
});

export type AppRouter = typeof appRouter;
