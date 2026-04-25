import * as z from "zod";
export const addAddressSchema = z.object({
  name: z
    .string()
    .min(3, "Username must be at least 3 characters.")
    .max(15, "Username must be at most 15 characters."),
  details: z.string().min(10, "Address details must be at least 10 characters"),
  phone: z
    .string("enter egyption number")
    .regex(/^01[0125][0-9]{8}$/gm, "enter egyption number"),
  city: z.string().min(2, "City name must be at least 2 characters"),
 
});
