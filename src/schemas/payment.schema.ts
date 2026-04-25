import * as zod from "zod";

export const paymentScheme = zod.object({
  city: zod.string().min(2, "City name must be at least 2 characters"),

  details: zod
    .string()
    .min(10, "Address details must be at least 10 characters"),

  phone: zod
    .string()
    .regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian number"),

  paymentMethod: zod.enum(["cash", "visa"]),
  address: zod.string().optional(),
  postalCode: zod.string().regex(/^[0-9]{5}$/, "Postal code must be 5 digits"),
});
