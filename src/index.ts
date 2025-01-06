import "dotenv/config";
import * as trpcPlugin from "@trpc/server/adapters/express";
import express from "express";
import { appRouter } from "./router";
import { createContext } from "./trpc/context";

const app = express();

app.use(
  "/trpc",
  trpcPlugin.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

if (process.env.NODE_ENV !== "development") {
  try {
    app.listen(3000, () => {
      console.info("server listening on 3000");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export default app;
