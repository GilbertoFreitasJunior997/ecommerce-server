import "dotenv/config";
import * as trpcPlugin from "@trpc/server/adapters/express";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { createRouteHandler } from "uploadthing/express";
import { env } from "./lib/env";
import { isProduction } from "./lib/env/utils";
import { uploadRouter } from "./lib/routes/upload.route";
import { appRouter } from "./router";
import { createContext } from "./trpc/context";

const app = express();

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(cookieParser());

app.use(
  "/api/uploadthing",
  createRouteHandler({
    router: uploadRouter,
    config: {
      token: env.UPLOADTHING_TOKEN,
    },
  }),
);

app.use(
  "/trpc",
  trpcPlugin.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

if (!isProduction) {
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
