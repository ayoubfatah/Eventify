import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  // i know this is not safe but  this is just for learning purposes
  // its dangerous cause someone can just add a rndm token in cookies
  const token = request.cookies.get("token")?.value;

  const protectedRoutes = ["/my-events", "/events/add"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);

    // Optional: send the user back where they wanted to go
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/my-events/:path*", "/add-event/:path*", "/reserved:path*"],
};
