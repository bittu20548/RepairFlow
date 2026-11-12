
//import { z } from "zod";

import { z } from "zod";

export const createCustomerSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().regex(/^[0-9]{10}$/),
  email: z.string().trim().email().optional().or(z.literal("")),
  address: z.string().trim().max(255).optional()
});

export type CreateCustomerInput = z.infer<
  typeof createCustomerSchema
>;
