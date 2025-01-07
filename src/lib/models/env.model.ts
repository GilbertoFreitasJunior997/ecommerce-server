import { z } from "zod";

export const envSchema = z.object({
  CLIENT_URL: z.string(),
  DATABASE_URL: z.string(),
  TOKEN_SECRET: z.string(),
});
export type Env = z.infer<typeof envSchema>;
