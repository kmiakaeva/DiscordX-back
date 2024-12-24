import { pgTable, integer, varchar, pgEnum } from "drizzle-orm/pg-core";

export const userStatusEnum = pgEnum("user_status", [
  "online",
  "inactive",
  "doNotDisturb",
  "invisible",
]);

export const usersTable = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 50 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  username: varchar("username").notNull().unique(),
  password: varchar("password").notNull(),
  status: userStatusEnum("status").notNull().default("online"),
  avatarImage: varchar("avatarImage").notNull(),
  customStatus: varchar("customStatus", { length: 100 }),
});
