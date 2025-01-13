import "dotenv/config";
import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import { user } from "./routes/user.ts";
import { auth } from "./routes/auth.ts";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in the environment variables.");
}

const app = new Hono();

// Middleware CORS
app.use(
  "*",
  cors({
    origin: "http://localhost:5173",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);

app.use("*", prettyJSON());
app.route("/users", user);
app.route("/auth", auth);

serve(app);

console.log("Server is running on http://localhost:3000");

export default app;
