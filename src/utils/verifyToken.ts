import { veriryToken } from "@/actions/verifyToken";

export async function getToken() {
  const result = await veriryToken();

  return result;
}
