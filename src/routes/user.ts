import { Hono } from "hono";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { addUserToDB } from "../repository/user.ts";
import { getUserById, updateUserById } from "../services/user.ts";
import type { UserFormData } from "../db/types.ts";

export const user = new Hono().basePath("/users");

user.get("/", (c) => c.json("DiscordX Users API", 200));

user.post("/", async (c) => {
  try {
    const user = await c.req.json<UserFormData>();
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const randomUsername = `${user.name
      .toLowerCase()
      .replace(/\s+/g, "_")}_${uuidv4()}`;

    const result = await addUserToDB({
      name: user.name,
      email: user.email,
      username: randomUsername,
      password: hashedPassword,
      status: "online",
      avatarImage: "",
      customStatus: "",
    });

    return c.json({ message: "User added successfully", result }, 201);
  } catch (error: any) {
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
