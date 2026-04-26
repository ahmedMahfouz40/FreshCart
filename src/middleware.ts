// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";

// export default async function proxy(req: NextRequest) {
//   const isSecure = req.nextUrl.protocol === "https:";

//   const jwt = await getToken({
//     req,
//     secret: process.env.NEXTAUTH_SECRET,
//     cookieName: isSecure
//       ? "__Secure-next-auth.session-token"
//       : "next-auth.session-token",
//   });

//   if (jwt) {
//     return NextResponse.next();
//   }
//   return NextResponse.redirect(new URL("/login", req.url));
// }

// export const config = {
//   matcher: [
//     "/wishlist",
//     "/cart",
//     "/payment",
//     "/allorders",
//     "/profile",
//     "/profile/settings",
//     "/profile/address",
//   ],
// };


// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const isSecure = req.nextUrl.protocol === "https:";

  // ADD THESE LOGS
  console.log("=== MIDDLEWARE DEBUG ===");
  console.log("URL:", req.nextUrl.pathname);
  console.log("Protocol:", req.nextUrl.protocol);
  console.log("NEXTAUTH_SECRET exists:", !!process.env.NEXTAUTH_SECRET);
  console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
  console.log("All cookies:", req.cookies.getAll().map(c => c.name));

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