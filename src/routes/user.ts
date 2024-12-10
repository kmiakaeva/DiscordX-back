import { Hono, type Context } from "hono";
import { addUserToDB } from "../repository/user.ts";
import type { User } from "../data/users.ts";
import { getUserById } from "../services/user.ts";


export const user = new Hono().basePath("/users");

user.get("/", (c) => c.json("DiscordX Users API", 200));


// fetch('localhost:8000/users', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     name: 'John Doe',
//     username: 'johndoe',
//     status: 'online',
//     avatarImage: 'https://robohash.org/johndoe?set=set1&size=200x200',
//     customStatus: 'Hello, world!',
//   }),
// })
// .then((response) => response.json())
// .then((data) => console.log(data))
// .catch((error) => console.error(error));

user.post("/", async (c) => {
  try {
    const user = await c.req.json<User>();
    const result = await addUserToDB(user);
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
