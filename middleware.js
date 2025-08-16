import { NextResponse } from "next/server";

const ALLOWED = (process.env.NEXT_PUBLIC_ALLOWED_ORIGINS || "")
  .split(",").map(s => s.trim()).filter(Boolean);

function setCors(res, origin) {
  const allow = ALLOWED.length === 0 || ALLOWED.includes(origin);
  res.headers.set("Access-Control-Allow-Origin", allow ? (origin || "*") : "null");
  res.headers.set("Vary", "Origin");
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
}

export function middleware(req) {
  const url = req.nextUrl;
  const origin = req.headers.get("origin") || "";
  if (url.pathname.startsWith("/api") && req.method === "OPTIONS") {
    const pre = new NextResponse(null, { status: 204 });
    setCors(pre, origin);
    return pre;
  }
  const res = NextResponse.next();
  if (url.pathname.startsWith("/api")) setCors(res, origin);
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"]
};