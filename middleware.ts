import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { getAccessToken, isTokenExpired } from "@/lib/auth";

const intlMiddleware = createMiddleware({
  locales: ["en", "de"],
  defaultLocale: "en",
});

export default async function middleware(request: NextRequest) {
  const publicPaths = ["/login", "/register", "/"];
  const isPublicPath = publicPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isPublicPath) {
    return intlMiddleware(request);
  }

  const accessToken = request.cookies.get("accessToken")?.value;

  if (!accessToken || isTokenExpired(accessToken)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
