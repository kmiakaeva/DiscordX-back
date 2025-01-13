import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const errorMessages = {
  name: {
    min: "Имя должно содержать минимум 5 символов",
    max: "Имя не должно превышать 50 символов",
  },
  email: {
    required: "Email обязателен",
    invalid: "Некорректный email адрес",
  },
  password: {
    min: "Пароль должен содержать минимум 6 символов",
    max: "Пароль не должен превышать 50 символов",
    regex:
      "Пароль должен содержать хотя бы одну заглавную букву, строчную букву и цифру",
  },
};

export const registerSchema = z.object({
  name: z
    .string()
    .min(5, errorMessages.name.min)
    .max(50, errorMessages.name.max),
  email: z
    .string()
    .email(errorMessages.email.invalid)
    .min(1, errorMessages.email.required),
  password: z
    .string()
    .min(6, errorMessages.password.min)
    .max(50, errorMessages.password.max)
    .regex(
      /^(?=.*[a-zA-Zа-яА-ЯёЁ])(?=.*[A-ZА-ЯЁ])(?=.*[a-zа-яё])(?=.*\d).+$/,
      errorMessages.password.regex
    ),
});

export const registerValidator = zValidator("json", registerSchema);

export const signinSchema = z.object({
  email: z
    .string()
    .email(errorMessages.email.invalid)
    .min(1, errorMessages.email.required),
  password: z
    .string()
    .min(6, errorMessages.password.min)
    .max(50, errorMessages.password.max),
});

export const signinValidator = zValidator("json", signinSchema);
