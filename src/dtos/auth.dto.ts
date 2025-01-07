import { z } from "zod";

export const authSignUpDTOSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});
export type AuthSignUpDTO = z.infer<typeof authSignUpDTOSchema>;

export const authSignInDTOSchema = z.object({
  emailOrName: z.string(),
  password: z.string(),
});
export type AuthSignInDTO = z.infer<typeof authSignInDTOSchema>;
