import { type User } from "../db/types.ts";
import { db } from "../database.ts";
import { usersTable } from "../db/schema.ts";

export async function addUsersToDB(users: User[]) {
  try {
    const result = await db.insert(usersTable).values(users).returning();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function addUserToDB(user: User) {
  try {
    const result = await db.insert(usersTable).values(user).returning();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
