import { NextRequest, NextResponse } from "next/server";
// import { jwtVerify } from "jose";

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|gif|mp3|mp4|wav|ogg|pdf|ico|woff|woff2|ttf|otf)).*)",
  ],
};

// const SESSION_COOKIE = "better-auth.session_token";
// const JWT_SECRET = new TextEncoder().encode(
//   process.env.JWT_SECRET || "fallback-secret",
// );

const PUBLIC_PATHS = [
  "/",
  "/login",
  "/forgot-password",
  "/reset-password",
  "/not-found",
  "/privacy",
  "/terms",
  "/apply",
  "/support",
];
const PUBLIC_PREFIXES = [
  "/news",
  "/blog",
  "/about",
  "/admissions",
  "/lecturers",
  "/graduates",
];
const authRoutes = ["/login", "/apply", "/forgot-password", "/reset-password"];

function isPublic(pathname: string) {
  if (PUBLIC_PATHS.includes(pathname)) return true;
  return PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

async function getSessionToken(request: NextRequest) {
  // const token = request.cookies.get(SESSION_COOKIE)?.value;
  // if (!token) return null;

  // try {
  //   const { payload } = await jwtVerify(token, JWT_SECRET);
  //   return payload;
  // } catch {
  //   return null;
  // }
  const sessionCookie = request.cookies.get("session")?.value;
  return sessionCookie === "true";
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isPublic(pathname)) {
    return NextResponse.next();
  }

  const session = await getSessionToken(request);

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute) {
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}
