"use server"
import getMyToken from "./getMyToken";

export async function getMyId() {
  const token = await getMyToken();
  const res = await fetch(`${process.env.apiLink_v1}/auth/verifyToken`, {
    headers: {
      token: token as string,
    },
  });
  const tkn = await res.json();
  const userId = tkn.decoded.id;

  return userId;
}
