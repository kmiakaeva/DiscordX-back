import type { usersTable, userStatusEnum } from "./schema.ts";

export type DbUser = typeof usersTable.$inferSelect;

export type User = Omit<DbUser, "id">;

export type UserFormData = Pick<DbUser, "name" | "email" | "password">;

export type UserStatus = typeof userStatusEnum.enumValues;
