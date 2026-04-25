"use server";
import { signupDataType } from "@/types/SignupDatatype";

export async function signupAcion(values: signupDataType) {
  const res = await fetch(`${process.env.apiLink_v1}/auth/signup`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
    method: "POST",
  });
  console.log("response from signup : ", res);

  const finalRes = await res.json();
  console.log("SignUp Final Res: ", finalRes);

  return res.ok;
}
