import { usersTable } from "../db/schema.ts";
import { users } from "../data/users.ts";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";

export async function addUsersToDB() {
  try {
    const db = drizzle(process.env.DATABASE_URL!);
    const result = await db.insert(usersTable).values(users).returning();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function getUserById(id: number) {
  try {
    const db = drizzle(process.env.DATABASE_URL!);
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
