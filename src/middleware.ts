import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/homepage",
    "/signin",
    "/signup",
    "/admin",
    "/userdashboard",
  ],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  if (!token) {
    if (pathname !== "/signin" && pathname !== "/signup"&& pathname !== "/") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }


  if (
    pathname === "/" ||
    pathname === "/signin" ||
    pathname === "/signup"
  ) {
    if (token.role === "Admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    if (token.role === "User") {
      return NextResponse.redirect(new URL("/userdashboard", request.url));
    }
  }

  if (pathname === "/admin" && token.role !== "Admin") {
    return NextResponse.redirect(new URL("/userdashboard", request.url));
  }
  if (pathname === "/userdashboard" && token.role !== "User") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}
