import { envSchema } from "../models/env.model";

const parsedEnv = envSchema.safeParse(process.env);
if (parsedEnv.error) {
  throw new Error("Please fix your env vars", {
    cause: parsedEnv.error,
  });
}

export const env = parsedEnv.data;
