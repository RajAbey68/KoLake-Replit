import { NextRequest } from 'next/server';

// Rate limiting configuration
export const RATE_LIMITS = {
  auth: { requests: 5, window: 15 * 60 * 1000 }, // 5 requests per 15 minutes
  api: { requests: 100, window: 60 * 1000 }, // 100 requests per minute
  upload: { requests: 10, window: 60 * 1000 }, // 10 uploads per minute
  contact: { requests: 3, window: 60 * 1000 }, // 3 contact forms per minute
};

// Security headers configuration
export const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https:",
    "connect-src 'self' https://api.openai.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://firebase.googleapis.com",
    "frame-src 'self' https://www.google.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; '),
};

// Input validation patterns
export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s\-\(\)]+$/,
  safeString: /^[a-zA-Z0-9\s\-_.,!?]+$/,
  filename: /^[a-zA-Z0-9\-_. ]+\.[a-zA-Z0-9]+$/,
  url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
};

// Allowed file types for uploads
export const ALLOWED_FILE_TYPES = {
  images: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  videos: ['video/mp4', 'video/quicktime', 'video/x-msvideo'],
  documents: ['application/pdf', 'text/plain'],
};

// Maximum file sizes (in bytes)
export const MAX_FILE_SIZES = {
  image: 10 * 1024 * 1024, // 10MB
  video: 50 * 1024 * 1024, // 50MB
  document: 5 * 1024 * 1024, // 5MB
};

// Allowed origins for Ko Lake Villa
const ALLOWED_ORIGINS = [
  'https://ko-lake-villa.vercel.app',
  'https://ko-lake-replit.vercel.app', 
  'http://localhost:3000',
  'http://localhost:5000',
  'https://replit.dev'
];

// Origin validation function
export function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  return ALLOWED_ORIGINS.some(allowed => origin.includes(allowed.replace('https://', '').replace('http://', '')));
}

// Security event logging
export function logSecurityEvent(event: string, data: any): void {
  console.warn(`[SECURITY] ${event}:`, data);
}

// Input sanitization
export function sanitizeInput(input: string): string {
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
              .replace(/javascript:/gi, '')
              .replace(/on\w+\s*=/gi, '');
}

// Rate limiting store (in-memory for development, use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(identifier: string, config: { requests: number; window: number }): boolean {
  const now = Date.now();
  const key = identifier;
  const current = rateLimitStore.get(key);

  if (!current || now > current.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + config.window });
    return true;
  }

  if (current.count >= config.requests) {
    return false;
  }

  current.count++;
  return true;
}

export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
}

export function validateFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.includes(file.type);
}

export function validateFileSize(file: File, maxSize: number): boolean {
  return file.size <= maxSize;
}

export function isValidEmail(email: string): boolean {
  return VALIDATION_PATTERNS.email.test(email);
}

export function isValidPhone(phone: string): boolean {
  return VALIDATION_PATTERNS.phone.test(phone);
}

export function isSafeString(input: string): boolean {
  return VALIDATION_PATTERNS.safeString.test(input);
}

export function isValidURL(url: string): boolean {
  return VALIDATION_PATTERNS.url.test(url);
}

// CSRF token generation and validation
export function generateCSRFToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function validateCSRFToken(token: string, sessionToken: string): boolean {
  return token === sessionToken;
}

// Secure session configuration
export const SESSION_CONFIG = {
  name: 'ko-lake-villa-session',
  secret: process.env.SESSION_SECRET || 'development-secret-key-change-in-production',
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
};

// Environment-specific security settings
export function getSecurityConfig() {
  const isProduction = process.env.NODE_ENV === 'production';
  
  return {
    enforceHTTPS: isProduction,
    enableCSP: isProduction,
    enableHSTS: isProduction,
    allowedOrigins: isProduction 
      ? ['https://ko-lake-villa.vercel.app', 'https://kolakevilla.com']
      : ['http://localhost:3000', 'http://localhost:5000'],
  };
}

// Audit logging
export interface SecurityEvent {
  type: 'auth' | 'access_denied' | 'rate_limit' | 'suspicious_activity';
  userId?: string;
  ip: string;
  userAgent?: string;
  details: Record<string, any>;
  timestamp: Date;
}

export function logSecurityEvent(event: SecurityEvent) {
  // In production, send to secure logging service
  console.log('[SECURITY]', JSON.stringify(event, null, 2));
}