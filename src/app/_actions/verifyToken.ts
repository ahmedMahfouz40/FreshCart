"use server";
import getMyToken from "@/utils/getMyToken";

export async function veriryToken() {
  const token = await getMyToken();
  const res = await fetch(`${process.env.apiLink_v1}/auth/verifyToken`, {
    headers: {
      token: token as string,
    },
  });
  return await res.json();
}
