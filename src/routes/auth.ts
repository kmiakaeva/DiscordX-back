import { eq } from "drizzle-orm";
import { Hono } from "hono";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { db } from "../database.ts";
import { usersTable } from "../db/schema.ts";
import { addUserToDB } from "../repository/user.ts";
import {
  registerValidator,
  signinValidator,
} from "../services/validation/auth.schema.ts";

export const auth = new Hono();

auth.get("/", (c) => c.json("DiscordX Auth API", 200));

auth.post("/register", registerValidator, async (c) => {
  try {
    const { name, email, password } = c.req.valid("json");

    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return c.json(
        { message: "Пользователь с таким email уже зарегистрирован" },
        409
      );
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

    if (!result || result.length === 0) {
      return c.json({ message: "Failed to add user" }, 500);
    }

    const user = result[0];
    const { password: _, ...userWithoutPassword } = user;

    return c.json(
      { message: "User added successfully", user: userWithoutPassword },
      201
    );
  } catch (error) {
    if (error instanceof Error) {
      return c.json(
        { message: "Error adding users", error: error.message },
        400
      );
    }
  }
});

auth.post("/signin", signinValidator, async (c) => {
  try {
    const { email, password } = c.req.valid("json");

    const result = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (result.length === 0) {
      return c.json({ message: "Такого пользователя не существует" }, 404);
    }

    const user = result[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return c.json({ message: "Неверные данные для входа или пароль" }, 400);
    }

    const { password: _, ...userWithoutPassword } = user;

    return c.json(
      { message: "User signed in successfully", user: userWithoutPassword },
      200
    );
  } catch (error) {
    if (error instanceof Error) {
      return c.json(
        { message: "Error searching for user", error: error.message },
        400
      );
    }
  }
});
