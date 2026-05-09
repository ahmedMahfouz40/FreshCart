import * as zod from "zod";
export const changePassSchema = zod
  .object({
    currentPassword: zod
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/,
        "Minimum six characters, at least one upper case English letter, one lower case English letter, one number and one special character",
      )
      .nonempty("*Please enter your password"),
    password: zod
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/,
        "Minimum six characters, at least one upper case English letter, one lower case English letter, one number and one special character",
      )
      .nonempty("*Please enter your password"),
    rePassword: zod
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/,
        "Minimum six characters, at least one upper case English letter, one lower case English letter, one number and one special character",
      )
      .nonempty("*Please confirm your password"),
  })
  .refine(
    (values) => {
      return values.password === values.rePassword;
    },
    {
      error: "rePassword doesn't match with password",
      path: ["rePassword"],
    },
  )
  .refine(
    (values) => {
      return values.currentPassword !== values.password;
    },
    {
      error: "password must not be the same as new password",
      path: ["password"],
    },
  );
