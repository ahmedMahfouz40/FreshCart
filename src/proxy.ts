import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function proxy(req: NextRequest) {
  const isSecure = req.nextUrl.protocol === "https:";

  const jwt = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: isSecure
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token",
  });

  console.log("JWT token result:", jwt);
  console.log("=== END DEBUG ===");

  if (jwt) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: [
    "/wishlist",
    "/cart",
    "/payment",
    "/allorders",
    "/profile",
    "/profile/settings",
    "/profile/address",
  ],
};
