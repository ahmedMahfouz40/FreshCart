import * as z from "zod";
export const emailSchema = z.object({
  email: z
    .email("*Invalid email address")
    .nonempty("*Please enter your email "),
});

export const codeSchema = z.object({
  resetCode: z
    .string()
    .nonempty("Reset code is required")
    .length(6, "*Please enter the full 6-digit code")
    .regex(/^\d+$/, "*Code must contain digits only"),
});
export const passwordSchema = z
  .object({
    newPassword: z.string().min(6, "*Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "*Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "*Passwords do not match",
    path: ["confirmPassword"],
  });
