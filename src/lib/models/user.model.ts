import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";
import { userTable } from "../../db/tables";

export const userSchema = createSelectSchema(userTable);
export type User = z.infer<typeof userSchema>;

export const userInsertSchema = createInsertSchema(userTable);
export type UserInsert = z.infer<typeof userInsertSchema>;

export type AuthUser = Omit<User, "password">;
