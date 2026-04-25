import * as zod from "zod";
export const loginSchema = zod.object({
  email: zod
    .email("*Invalid email address")
    .nonempty("*Please enter your email "),
      password: zod
    .string()
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character",
    )
    .nonempty("*Please enter your password"),
});
