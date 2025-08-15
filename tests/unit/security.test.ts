import { describe, it, expect, beforeEach } from '@jest/globals'

// Import with proper typing for Jest environment
let securityModule: any
beforeAll(async () => {
  securityModule = await import('@/lib/security')
})

const { isAllowedOrigin, rateLimit, sanitizeInput, ContactSchema } = securityModule || {}

describe('Ko Lake Villa Security Utils', () => {
  describe('Origin Validation', () => {
    it('should allow Ko Lake Villa production domains', () => {
      expect(isAllowedOrigin('https://ko-lake-villa-website.vercel.app')).toBe(true)
      expect(isAllowedOrigin('https://ko-lake-villa-website-git-main-rajabey68.vercel.app')).toBe(true)
      expect(isAllowedOrigin('http://localhost:3000')).toBe(true)
      expect(isAllowedOrigin('http://localhost:5000')).toBe(true)
    })

    it('should block malicious domains', () => {
      expect(isAllowedOrigin('https://malicious-site.com')).toBe(false)
      expect(isAllowedOrigin('https://fake-ko-lake.com')).toBe(false)
      expect(isAllowedOrigin('http://evil.vercel.app')).toBe(false)
    })

    it('should handle edge cases safely', () => {
      expect(isAllowedOrigin(null)).toBe(false)
      expect(isAllowedOrigin(undefined)).toBe(false)
      expect(isAllowedOrigin('')).toBe(false)
      expect(isAllowedOrigin('invalid-url')).toBe(false)
    })

    it('should allow Vercel preview URLs for Ko Lake Villa', () => {
      expect(isAllowedOrigin('https://ko-lake-villa-website-abc123-rajabey68.vercel.app')).toBe(true)
      expect(isAllowedOrigin('https://other-site-abc123-someuser.vercel.app')).toBe(false)
    })
  })

  describe('Rate Limiting', () => {
    beforeEach(() => {
      // Clear rate limit store for clean tests
      const store = (rateLimit as any).__store || new Map()
      store.clear()
    })

    it('should allow requests within limit', () => {
      const result = rateLimit('test-key', 5, 60000)
      expect(result.ok).toBe(true)
      expect(result.remaining).toBe(4)
    })

    it('should block requests exceeding limit', () => {
      // Fill up the rate limit
      for (let i = 0; i < 5; i++) {
        rateLimit('test-key', 5, 60000)
      }
      
      const result = rateLimit('test-key', 5, 60000)
      expect(result.ok).toBe(false)
      expect(result.remaining).toBe(0)
      expect(result.retryAfter).toBeGreaterThan(0)
    })

    it('should reset after time window', () => {
      // Use very short window for testing
      const result1 = rateLimit('test-key', 1, 1) // 1ms window
      expect(result1.ok).toBe(true)
      
      // Wait for window to pass
      setTimeout(() => {
        const result2 = rateLimit('test-key', 1, 1)
        expect(result2.ok).toBe(true)
      }, 10)
    })
  })

  describe('Input Sanitization', () => {
    it('should remove script tags', () => {
      const input = 'Hello <script>alert("xss")</script> World'
      const result = sanitizeInput(input)
      expect(result).toBe('Hello  World')
      expect(result).not.toContain('script')
    })

    it('should remove HTML tags', () => {
      const input = 'Hello <div>World</div> <span>Test</span>'
      const result = sanitizeInput(input)
      expect(result).toBe('Hello World Test')
    })

    it('should preserve normal text', () => {
      const input = 'Normal villa booking inquiry text'
      const result = sanitizeInput(input)
      expect(result).toBe(input)
    })

    it('should handle empty and edge cases', () => {
      expect(sanitizeInput('')).toBe('')
      expect(sanitizeInput('   ')).toBe('')
      expect(sanitizeInput('<>')).toBe('')
    })
  })

  describe('Contact Form Validation', () => {
    it('should validate correct Ko Lake Villa inquiry', () => {
      const validData = {
        name: 'John Smith',
        email: 'john@example.com',
        message: 'I would like to book Ko Lake Villa for 3 nights',
        phone: '+94 77 123 4567',
        guests: 4
      }
      
      const result = ContactSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject invalid data', () => {
      const invalidData = {
        name: '', // Empty name
        email: 'invalid-email', // Invalid email
        message: 'short' // Too short
      }
      
      const result = ContactSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      expect(result.error?.issues.length).toBeGreaterThan(0)
    })

    it('should handle Sri Lankan names correctly', () => {
      const sriLankanData = {
        name: 'සමන්ත ගුණවර්ධන', // Sinhala name
        email: 'samantha@example.com',
        message: 'Villa booking inquiry for family vacation'
      }
      
      const result = ContactSchema.safeParse(sriLankanData)
      expect(result.success).toBe(true)
    })

    it('should validate phone numbers', () => {
      const validPhones = ['+94 77 123 4567', '077 123 4567', '+1 555 123 4567']
      const invalidPhones = ['abc123', '123', '+999999999999999999999']
      
      validPhones.forEach(phone => {
        const result = ContactSchema.safeParse({
          name: 'Test',
          email: 'test@example.com',
          message: 'Test message for validation',
          phone
        })
        expect(result.success).toBe(true)
      })
      
      invalidPhones.forEach(phone => {
        const result = ContactSchema.safeParse({
          name: 'Test',
          email: 'test@example.com',
          message: 'Test message for validation',
          phone
        })
        expect(result.success).toBe(false)
      })
    })
  })
})