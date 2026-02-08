import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().trim().min(1, "Email обязателен"),
  password: z.string().trim().min(1, "Пароль обязателен"),
  rememberMe: z.boolean(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
