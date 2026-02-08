import { z } from "zod";

export const addProductSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Наименование обязательно")
    .max(100, "Максимум 100 символов"),
  price: z
    .string()
    .min(1, "Цена обязательна")
    .refine((val) => {
      const normalizedVal = val.replace(",", ".");
      const num = Number(normalizedVal);
      return !isNaN(num) && num > 0;
    }, "Цена должна быть положительным числом"),
  brand: z
    .string()
    .trim()
    .min(1, "Вендор обязателен")
    .max(50, "Максимум 50 символов"),
  sku: z
    .string()
    .trim()
    .min(1, "Артикул обязателен")
    .max(20, "Максимум 20 символов"),
});

export type AddProductFormData = z.infer<typeof addProductSchema>;
export type EditProductFormData = z.infer<typeof addProductSchema>;
