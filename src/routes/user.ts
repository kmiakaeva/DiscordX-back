import { Hono } from "hono";
import { getUserById, updateUserById } from "../services/user.ts";

export const user = new Hono();

user.get("/", (c) => c.json("DiscordX Users API", 200));

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
