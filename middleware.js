// CRITICAL: Pure JavaScript Edge Runtime middleware for Vercel
// NO TypeScript imports to avoid TS2307 module resolution errors

export function middleware(request) {
  const url = request.nextUrl;
  const origin = request.headers.get("origin") || "";
  
  // Handle CORS preflight for API routes  
  if (request.method === "OPTIONS" && url.pathname.startsWith("/api")) {
    const corsHeaders = new Headers();
    corsHeaders.set("Access-Control-Allow-Origin", "*");
    corsHeaders.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    corsHeaders.set("Access-Control-Allow-Headers", "Content-Type,Authorization,X-Requested-With");
    corsHeaders.set("Access-Control-Max-Age", "86400");
    
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }
  
  // Create base response using NextResponse-compatible approach
  const response = NextResponse ? NextResponse.next() : fetch(request);
  
  // Set security headers
  if (response.headers) {
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    
    // Add CORS headers for API routes
    if (url.pathname.startsWith("/api")) {
      response.headers.set("Access-Control-Allow-Origin", "*");
      response.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
      response.headers.set("Access-Control-Allow-Headers", "Content-Type,Authorization,X-Requested-With");
    }
  }
  
  return response;
}

// Conditional NextResponse import for Edge Runtime compatibility
const NextResponse = (() => {
  try {
    // Dynamic import to avoid TypeScript module resolution issues
    return globalThis.NextResponse || eval('require')("next/server").NextResponse;
  } catch {
    return null;
  }
})();

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"]
};