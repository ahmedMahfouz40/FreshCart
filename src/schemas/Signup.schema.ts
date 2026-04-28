import * as zod from "zod";
export const signUpSchema = zod
  .object({
    name: zod.string("Enter Your Name"),
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
    rePassword: zod
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character",
      )
      .nonempty("*Please confirm your password"),
    phone: zod
      .string("enter egyption number")
      .regex(/^01[0125][0-9]{8}$/gm, "enter egyption number"),
    agreeTermsAndPolicy: zod.boolean().refine((val) => val === true, {
      message: "*You must accept the terms and conditions",
    }),
  })
  .refine(
    (values) => {
      return values.password === values.rePassword;
    },
    {
      error: "rePassword doesn't match with password",
      path: ["rePassword"],
    },
  );
