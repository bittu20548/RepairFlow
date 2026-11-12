
import { z } from "zod";

export const createCustomerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters")
    .max(100, "Name is too long"),

  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone must be exactly 10 digits"),

  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .optional()
    .or(z.literal("")),

  address: z
    .string()
    .trim()
    .max(255, "Address is too long")
    .optional(),

  shopId: z
    .string()
    .uuid("Invalid shop ID")
});

export type CreateCustomerInput = z.infer<
  typeof createCustomerSchema
>;
