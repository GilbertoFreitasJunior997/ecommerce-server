import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";

export const createContext = async ({
  req,
  res,
}: CreateExpressContextOptions) => {
  return {
    req,
    res,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
