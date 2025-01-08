import { authRoute } from "./lib/routes/auth.route";
import { productRoute } from "./lib/routes/product.route";
import { router } from "./trpc";

export const appRouter = router({
  auth: authRoute,
  products: productRoute,
});

export type AppRouter = typeof appRouter;
