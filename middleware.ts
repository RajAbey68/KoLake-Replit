import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Content Security Policy - Enhanced security for Ko Lake Villa
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com https://apis.google.com https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https: http:",
  "font-src 'self' https://fonts.gstatic.com",
  "connect-src 'self' https: wss: https://*.firebase.googleapis.com https://*.firebaseapp.com https://api.openai.com",
  "media-src 'self' blob: https: http:",
  "frame-src 'self' https://www.youtube.com https://player.vimeo.com https://www.google.com",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'"
].join('; ')

// Rate limiting store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function getClientIP(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  const realIP = req.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}

function rateLimit(identifier: string, requests: number, windowMs: number): boolean {
  const now = Date.now();
  const current = rateLimitStore.get(identifier);

  if (!current || now > current.resetTime) {
    rateLimitStore.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (current.count >= requests) {
    return false;
  }

  current.count++;
  return true;
}

function detectSuspiciousActivity(req: NextRequest): boolean {
  const userAgent = req.headers.get('user-agent') || '';
  const path = req.nextUrl.pathname;
  
  // Check for common attack patterns
  const suspiciousPatterns = [
    /bot/i, /crawler/i, /scanner/i, /sqlmap/i, /nikto/i, /nmap/i
  ];
  
  // Check for suspicious paths
  const suspiciousPaths = [
    '/wp-admin', '/.env', '/config', '/backup', '/phpMyAdmin', '/wp-config.php'
  ];
  
  const isSuspiciousUA = suspiciousPatterns.some(pattern => pattern.test(userAgent));
  const isSuspiciousPath = suspiciousPaths.some(suspiciousPath => path.includes(suspiciousPath));
  
  if (isSuspiciousUA || isSuspiciousPath) {
    console.log('[SECURITY] Suspicious activity detected:', {
      ip: getClientIP(req),
      userAgent,
      path,
      reason: isSuspiciousUA ? 'suspicious_user_agent' : 'suspicious_path',
    });
    return true;
  }
  
  return false;
}

export function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const path = req.nextUrl.pathname;
  const clientIP = getClientIP(req);

  // Admin routes accessible for now - authentication disabled for development

  // Detect and block suspicious activity
  if (detectSuspiciousActivity(req)) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  // Apply rate limiting
  if (path.startsWith('/api/auth/')) {
    if (!rateLimit(`auth:${clientIP}`, 5, 15 * 60 * 1000)) { // 5 requests per 15 minutes
      return new NextResponse('Too Many Requests', { status: 429 });
    }
  } else if (path.startsWith('/api/contact')) {
    if (!rateLimit(`contact:${clientIP}`, 3, 60 * 1000)) { // 3 requests per minute
      return new NextResponse('Too Many Requests', { status: 429 });
    }
  } else if (path.startsWith('/api/upload')) {
    if (!rateLimit(`upload:${clientIP}`, 10, 60 * 1000)) { // 10 uploads per minute
      return new NextResponse('Too Many Requests', { status: 429 });
    }
  } else if (path.startsWith('/api/')) {
    if (!rateLimit(`api:${clientIP}`, 100, 60 * 1000)) { // 100 requests per minute
      return new NextResponse('Too Many Requests', { status: 429 });
    }
  }

  // Enhanced security headers for Ko Lake Villa
  res.headers.set('Content-Security-Policy', csp) // Enable CSP in production
  res.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  res.headers.set('X-Content-Type-Options', 'nosniff')
  res.headers.set('X-Frame-Options', 'DENY')
  res.headers.set('X-XSS-Protection', '1; mode=block')
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.headers.set('Permissions-Policy', 'geolocation=(), camera=(), microphone=(), payment=(), usb=(), serial=()')
  res.headers.set('Cross-Origin-Resource-Policy', 'cross-origin')
  res.headers.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups')

  // Ko Lake Villa specific security
  res.headers.set('X-Powered-By', '') // Remove server fingerprinting
  res.headers.set('X-Villa-Security', 'ko-lake-villa-protected')
  
  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api routes that need special handling
     * 2. /_next (Next.js internals)
     * 3. Static files (images, favicon, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:jpg|jpeg|gif|png|svg|ico|webp|mp4|mov|avi)).*)',
  ],
}