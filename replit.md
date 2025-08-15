## Overview

The Ko Lake Villa website showcases a luxury lakeside accommodation in Sri Lanka, focusing on amenities, services, and direct bookings to enhance guest experience. The project prioritizes performance and SEO, with a strict scope limited to the villa's website, precluding rebranding or generic service expansions. The business vision is to optimize the digital presence for direct reservations, leveraging market potential for high-end tourism in Sri Lanka.

## User Preferences

**User Name:** Raj

Preferred communication style: Simple, everyday language.

**CRITICAL TRUST COMMITMENT:** Never mislead Raj about technical capabilities or limitations. Always be direct and honest about what can be accomplished. Misleading information erodes trust and wastes valuable development time. When uncertain, state uncertainty clearly rather than providing incorrect guidance.

**AI MODEL COMMITMENT:** ONLY use GPT-5 for all AI functionality going forward. Never reference or implement GPT-4 variants. The codebase has been fully migrated to GPT-5 across all systems as documented in Phase 3 completion.

**DATA INTEGRITY POLICY:** Never fabricate information including pricing, discounts, contact details, or promotional offers. Always ask for authentic information rather than creating placeholder content. This includes:
- No fabricated discount percentages or promotional pricing
- No made-up contact information or business details
- No fictional service offerings or amenities
- No fabricated email addresses or domain names
- Always request real data from user when authentic information is needed

**CRITICAL:** Any @kolakevilla.com emails in the codebase were incorrectly fabricated and must be replaced with actual authorized contact information provided by the user.

**CRITICAL DEVELOPMENT LOCK:** The Ko Lake Villa website architecture, CSS styles, and layout are production-ready and MUST NOT be changed without explicit permission. All responsive design, hero sections, navigation, and component styling should remain exactly as currently implemented.

**CRITICAL ADMIN CONSOLE LOCK:** The existing admin console structure (AdminShell, Sidebar) is established and working. ALL new admin features must integrate within existing design patterns. Never create separate login systems or redesign admin interface - work within established AdminShell component structure.

**DEPLOYMENT FRAMEWORK LOCK:** Architecture and development framework MUST NOT change. Continue using Git push to GitHub repository `RajAbey68/KoLake-Replit` (clean private repository with PAT authentication) and Vercel deployment as established workflow. User strongly prefers Git/Vercel over Replit deployment for reliability and professional CI/CD workflow. User considers Replit builds, deployment and hosting "suspect" - avoid recommending Replit deployment solutions.

**PRODUCTION RELEASE STATUS:** Ko Lake Replit project v1.3 is production-ready with complete Shadow Pages CMS, AI-powered admin console, security hardening, and all 9 pages fully functional. Clean private GitHub repository configured with Personal Access Token for secure deployment.

## System Architecture

### Frontend
- **Framework**: Next.js with App Router and TypeScript
- **UI**: Shadcn/ui (built on Radix UI)
- **Styling**: Tailwind CSS with custom CSS variables
- **State Management**: TanStack Query (planned)
- **Routing**: Next.js file-based routing
- **UI/UX Decisions**: Production-ready, responsive design with a focus on visual appeal, dynamic hero image/video rotation, professional admin console with dual editing modes and tab-based organization. Color schemes and templates are established and locked.

### Backend
- **Runtime**: Node.js with Next.js API routes
- **Language**: TypeScript with ES modules
- **API Design**: Next.js API routes for media analysis and SEO
- **Error Handling**: Next.js error boundaries

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM (Neon Database provider)
- **Schema**: Users, Media Analysis, SEO Meta, API Usage, Contact Submissions, Gallery Images, PMS Integration

### Authentication and Authorization
- **Authentication**: Firebase Auth (Google Sign-In)
- **Authorization**: Role-based access control (Admin, Staff, Partner, Agent, Guest) with granular permissions and middleware-based route protection.
- **Security Features**: Rate limiting, suspicious activity detection, CSRF protection, XSS prevention.

### AI Integration
- **Core AI**: OpenAI GPT-5 for image analysis and content generation.
- **Features**: AI-powered image categorization, SEO optimization, meta tag generation, batch operations, real-time content enhancement, and AI SEO recommendations within the CMS.

### File Management
- **Upload**: Memory storage (10MB limit), persistent storage via Firebase Storage.
- **Supported Formats**: JPEG, PNG, WebP, GIF.

### Performance
- **Caching**: TanStack Query for query caching.
- **Optimization**: Code splitting, asset optimization (PostCSS).

### SEO Features
- **Capabilities**: AI-powered alt text generation, meta description generation, keyword extraction, page-specific customizable meta tags, analytics integration, Open Graph/Twitter Cards/structured data (JSON-LD for hotels, restaurants, local business).

### Contact Management System
- **Storage**: Firestore via `/api/enquiries`.
- **Validation**: Email whitelist and server-side validation.
- **Features**: International contact form with country selection, phone validation, rate limiting, WhatsApp integration.

### AI-Powered Admin Console
- **Functionality**: AI Gallery Management, SEO Meta Generator, Batch Processing, Advanced CRM, PMS Integration Framework.
- **Content Management**: Comprehensive CMS with dual editing modes (Quick Edit/Edit All Fields), tab-based organization, and "Shadow Pages" system for managing all website pages with visual inline editing.

### Pricing System
- **Source**: Airbnb listings.
- **Logic**: Dynamic calculator with standard and last-minute discounts, comprehensive savings explanation.

### Campaign Management System
- **Features**: Public landing page (`/campaigns`) with customer segments, admin section (`/admin/campaigns`) for performance tracking and SEO targeting.
- **Media**: Integrated media upload with support for various file types.

### Content Protection System
- **Email Guard**: `scripts/verify-emails.cjs` and `npm run emails:verify` to prevent unauthorized contact details.

### Security Hardening
- **Measures**: Rate limiting on API endpoints, comprehensive security headers (CSP, HSTS, XSS), real-time threat detection, server-side input validation, secure authentication, admin panel security, audit logging, HTTPS enforcement.

### PMS Integration
- **Approach**: Multi-channel management (Direct, Airbnb, Booking.com) with dynamic pricing capabilities.
- **Focus**: Guesty Pro integration for OTA channel management and unified reservation system.

### Testing Framework
- **Levels**: Unit, Integration, and E2E testing with high coverage.
- **CI/CD**: 3-stage automated testing on every commit.
- **Security Testing**: Dedicated tests for XSS, rate limiting, CSRF, origin validation.

### UI Enhancements
- **Hero Section**: Optimized hero cards, dynamic background with rotating images/videos, overlaid video player.
- **Gallery**: Improved video thumbnails, added specific categories (Pool, Bathrooms, Garden, Local Area).

## External Dependencies

### AI and Machine Learning
- **OpenAI API**: GPT-5 model.

### Database and Storage
- **Neon Database**: Serverless PostgreSQL.
- **Firebase**: Authentication, Firestore, Cloud Storage.
- **Drizzle ORM**.

### UI and Design System
- **Radix UI**.
- **Shadcn/ui**.
- **Lucide React**.
- **Tailwind CSS**.

### Development and Build Tools
- **Vite**.
- **TypeScript**.
- **ESBuild**.
- **PostCSS**.

### File Upload and Processing
- **Multer**.

### Session and Security
- **Express Session**.