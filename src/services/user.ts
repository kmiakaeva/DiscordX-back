import { usersTable } from "../db/schema.ts";
import { eq } from "drizzle-orm";
import { db } from "../database.ts";
import type { User } from "../data/users.ts";

export async function getUserById(id: number) {
  try {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .limit(1);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function updateUserById(id: number, data: Partial<User>) {
  try {
    const [user] = await db
      .update(usersTable)
      .set(data)
      .where(eq(usersTable.id, id))
      .returning();

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
