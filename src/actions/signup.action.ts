"use server";
import { signUpSchema } from "@/schemas/Signup.schema";
import { z } from "zod";

type signupDataType = Omit<z.infer<typeof signUpSchema>, "agreeTermsAndPolicy">;

export async function signupAcion(values: signupDataType) {
  const res = await fetch(`${process.env.apiLink_v1}/auth/signup`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
    method: "POST",
  });

  const finalRes = await res.json();
  console.log("SignUp Final Res: ", finalRes);

  return res.ok;
}
