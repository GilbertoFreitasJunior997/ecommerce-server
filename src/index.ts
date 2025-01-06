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
  const port = 3000;

  try {
    const listener = app.listen(port, () => {
      const address = listener.address();
      const listenerPort = address
        ? typeof address === "string"
          ? port
          : address.port
        : port;

      console.info(`server listening on ${listenerPort}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export default app;
