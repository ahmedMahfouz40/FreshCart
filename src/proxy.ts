import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function proxy(req: NextRequest) {
  const jwt = await getToken({ req , secret:process.env.NEXTAUTH_SECRET});
  // console.log("jwt from proxy ", jwt);
  if (jwt) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/login", req.url));
}
export const config = {
  matcher: [ "/payment"  , "/allorders" , "/cart" ],
};
