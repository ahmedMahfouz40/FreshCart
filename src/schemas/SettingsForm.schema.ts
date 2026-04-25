import * as z from "zod";
export const settingsSchema = z.object({
  name: z
    .string()
    .min(3, "Username must be at least 3 characters.")
    .max(15, "Username must be at most 15 characters.")
    .regex(
      /^[a-zA-Z0-9_\s]+$/,
      "Username can only contain letters, numbers, underscores and spaces.",
    ),
  email: z
    .email("*Invalid email address")
    .nonempty("*Please enter your email "),
  phone: z
    .string("enter egyption number")
    .regex(/^01[0125][0-9]{8}$/gm, "enter egyption number"),
});
