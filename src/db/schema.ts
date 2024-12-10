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
  username: varchar("username", { length: 25 }).notNull().unique(),
  status: userStatusEnum("status").notNull().default("online"),
  avatarImage: varchar("avatarImage").notNull().unique(),
  customStatus: varchar("customStatus", { length: 255 }),
});
