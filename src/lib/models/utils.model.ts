import { z } from "zod";

export const idParamSchema = z.object({
  id: z.number(),
});

export type IdParam = z.infer<typeof idParamSchema>;
