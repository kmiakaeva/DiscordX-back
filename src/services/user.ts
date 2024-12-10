import { usersTable } from "../db/schema.ts";
import { eq } from "drizzle-orm";
import { db } from "../database.ts";


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
