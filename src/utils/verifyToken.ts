import { veriryToken } from "@/app/_actions/verifyToken";

export async function getToken() {
  const result = await veriryToken();

  return result;
}
