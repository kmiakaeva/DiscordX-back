import { Hono } from "hono";
import { addUsersToDB, getUserById } from "../controllers/usersController.ts";

export const routes = new Hono();

routes.get("/", (c) => c.json("DiscordX Users API", 200));

routes.post("/users", async (c) => {
  try {
    const result = await addUsersToDB();
    return c.json({ message: "Users added successfully", result }, 201);
  } catch (error: any) {
    if (error instanceof Error) {
      return c.json(
        { message: "Error adding users", error: error.message },
        400
      );
    }
  }
});

routes.get("/users/:id", async (c) => {
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
