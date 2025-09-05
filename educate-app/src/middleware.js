import { NextResponse } from "next/server";
import { authConfig } from "../auth.config";
import NextAuth from "next-auth";
import { adminRoutes, privateRoutes } from "../routes";

const authRoutes = ["/login", "/register"];
const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const pathname = nextUrl.pathname.replace(/\/$/, ""); // remove trailing slash
  const isAuthRoute = authRoutes.includes(pathname);  
  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
  const isAdminRoute = adminRoutes.includes(nextUrl.pathname);
  const isApiRoute = nextUrl.pathname.includes("/api/");

  console.log(isLoggedIn, isPrivateRoute, isAuthRoute, isAdminRoute, isApiRoute, req.auth?.user?.email, nextUrl);

  if (isApiRoute) return;

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isAuthRoute && !isLoggedIn) return;

  if (!isLoggedIn && isPrivateRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAdminRoute && req.auth?.user?.email !== "admin@gmail.com") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return; // allow access by default
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
