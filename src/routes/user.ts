import { Hono } from "hono";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import { db } from "../database.ts";
import { usersTable } from "../db/schema.ts";
import { addUserToDB } from "../repository/user.ts";
import { getUserById, updateUserById } from "../services/user.ts";
import { registerValidator } from "../services/validation/user.schema.ts";

export const user = new Hono().basePath("/users");

user.get("/", (c) => c.json("DiscordX Users API", 200));

user.post("/", registerValidator, async (c) => {
  try {
    const { name, email, password } = c.req.valid("json");

    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      throw new Error("Пользователь с таким email уже зарегистрирован");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const randomUsername = `${name
      .toLowerCase()
      .replace(/\s+/g, "_")}_${uuidv4()}`;

    const result = await addUserToDB({
      name,
      email,
      username: randomUsername,
      password: hashedPassword,
      status: "online",
      avatarImage: "",
      customStatus: "",
    });

    return c.json({ message: "User added successfully", result }, 201);
  } catch (error) {
    if (error instanceof Error) {
      return c.json(
        { message: "Error adding users", error: error.message },
        400
      );
    }
  }
});

user.get("/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id"), 10);

    if (isNaN(id)) {
      return c.json({ message: "Invalid user ID" }, 400);
    }

    const result = await getUserById(id);
    return c.json({ message: "User retrieved successfully", result }, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json(
        { message: "Error retrieving user", error: error.message },
        400
      );
    }
  }
});

user.patch("/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id"), 10);
    if (isNaN(id)) {
      return c.json({ message: "Invalid user ID" }, 400);
    }

    const data = await c.req.json();
    if (!data) {
      return c.json({ message: "No data provided" }, 400);
    }

    const result = await updateUserById(id, data);
    return c.json({ message: "User updated successfully", result }, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json(
        { message: "Error updating user", error: error.message },
        400
      );
    }
  }
});
