import { eq, or } from "drizzle-orm";
import { type TxOrDb, db } from "../../db";
import { userTable } from "../../db/tables";
import type { User, UserInsert } from "../models/user.model";

export const userRepository = {
  create: async (insert: UserInsert, txOrDb: TxOrDb = db): Promise<User> => {
    const [data] = await txOrDb.insert(userTable).values(insert).returning();

    return data;
  },
  getByColumn: async <TColumn extends keyof User>(
    column: TColumn,
    value: User[TColumn],
  ) => {
    const [data] = await db
      .select()
      .from(userTable)
      .where(eq(userTable[column], value as string))
      .limit(1);

    return data;
  },
  getByEmailOrName: async (emailOrName: string): Promise<User | undefined> => {
    const [data] = await db
      .select()
      .from(userTable)
      .where(
        or(eq(userTable.email, emailOrName), eq(userTable.name, emailOrName)),
      )
      .limit(1);

    return data;
  },
};
