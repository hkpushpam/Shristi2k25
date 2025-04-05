import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/about",
    "/admin",
    "/creditscore",
    "/help",
    "/miscellenious",
    "/mydocument",
    "/user",
    "/userdashboard"
  ],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (
    token &&
    (url.pathname.startsWith("/signin") ||
      url.pathname.startsWith("/signup")
    )
  ) {
    return NextResponse.redirect(new URL("/user", request.url));
  }

  // if (!url.pathname.startsWith("/signin") ||
  //   !url.pathname.startsWith("/signup")
  // ) {
  //   if (!token) {
  //     const response = NextResponse.redirect(new URL("/homepage", request.url));
  //     response.cookies.delete("next-auth.session-token");
  //     return response;
  // //   }
  // }

  return NextResponse.next();
}
