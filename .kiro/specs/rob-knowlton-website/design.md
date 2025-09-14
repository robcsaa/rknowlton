# Design Document

## Overview

This design document outlines the architecture and implementation approach for Rob Knowlton's high-converting lead-generation website. The site will be built using Next.js 14 with App Router, React, TypeScript, and TailwindCSS, focusing on conversion optimization, performance, and accessibility.

The design follows a conversion-first approach with clear value propositions, social proof, and strategically placed CTAs to guide visitors through the lead generation funnel.

## Architecture

### Technology Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Analytics**: Plausible (preferred) or Google Analytics 4
- **Forms**: Server Actions with Resend/SMTP
- **Database**: SQLite with Prisma (for contact form storage)
- **Deployment**: Vercel (primary) with self-hosting options

### Site Structure
```
/                 - Hero, proof, services, mini-work, CTAs, FAQ
/services         - Detailed service offerings
/work            - Case studies with metrics
/about           - Bio, approach, credibility
/contact         - Contact form + Calendly embed
/privacy         - Privacy policy
/terms           - Terms of service
/404             - Custom error page
```

### Performance Targets
- Lighthouse Performance Score: ≥95
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Cumulative Layout Shift: <0.1

## Components and Interfaces

### Core Layout Components

#### Header.tsx
```typescript
interface HeaderProps {
  brandName?: string;
  calendlyUrl?: string;
  logoPath?: string;
}
```
- Sticky navigation with brand logo/name
- Primary CTA button ("Book a free consult")
- Mobile-responsive hamburger menu
- Accessibility: keyboard navigation, focus indicators

#### Footer.tsx
```typescript
interface FooterProps {
  brandName?: string;
  email?: string;
  phone?: string;
}
```
- Site navigation links
- Contact information
- Legal page links
- Social proof elements

### Content Components

#### Hero.tsx
```typescript
interface HeroProps {
  headline: string;
  subheadline: string;
  primaryCTA: {
    text: string;
    url: string;
  };
  secondaryCTA: {
    text: string;
    url: string;
  };
  accentColor?: string;
}
```
- Above-the-fold hero section
- Compelling headline and subheadline
- Dual CTA buttons with clear hierarchy
- Subtle neon accent color integration

#### ServiceCard.tsx
```typescript
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  bullets: string[];
  ctaText?: string;
  ctaUrl?: string;
}
```
- Service overview cards
- Icon, title, 2-3 bullet points
- Optional CTA for detailed service pages

#### CaseStudyCard.tsx
```typescript
interface CaseStudyCardProps {
  title: string;
  problem: string;
  solution: string;
  outcome: string;
  metrics?: {
    label: string;
    value: string;
  }[];
}
```
- Problem → Solution → Outcome structure
- Quantifiable metrics display
- Conversion-focused presentation

#### ContactForm.tsx
```typescript
interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
}

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  budget: 'under-10k' | '10k-25k' | '25k-50k' | '50k+';
  message: string;
  consent: boolean;
}
```
- Lead qualification fields
- Spam protection (honeypot + timing)
- Server-side validation
- Success/error state handling

### Utility Components

#### SEO.tsx
```typescript
interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  jsonLd?: object;
}
```
- Metadata management
- OpenGraph and Twitter Cards
- JSON-LD structured data
- Canonical URL handling

#### Section.tsx
```typescript
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl';
  background?: 'white' | 'gray' | 'accent';
}
```
- Consistent section spacing
- Container width management
- Background color variants

## Data Models

### Contact Form Submission
```typescript
interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
  submittedAt: Date;
  ipAddress?: string;
  userAgent?: string;
}
```

### Analytics Events
```typescript
interface AnalyticsEvent {
  event: 'cta_click' | 'form_submit' | 'calendly_open' | 'page_view';
  page: string;
  timestamp: Date;
  properties?: Record<string, any>;
}
```

## Error Handling

### Form Validation
- Client-side validation with immediate feedback
- Server-side validation with detailed error messages
- Spam protection with honeypot and timing validation
- Rate limiting to prevent abuse

### Error Boundaries
- React Error Boundaries for component-level error handling
- Graceful degradation for non-critical features
- User-friendly error messages maintaining brand tone

### 404 Page
- Custom 404 page with brand consistency
- Navigation options to main site sections
- Relevant CTAs to capture lost visitors

## Testing Strategy

### Unit Testing
- Component testing with React Testing Library
- Form validation logic testing
- Utility function testing
- Accessibility testing with jest-axe

### Integration Testing
- Form submission flow testing
- Navigation and routing testing
- Analytics event tracking testing

### Performance Testing
- Lighthouse CI integration
- Core Web Vitals monitoring
- Image optimization verification

### Accessibility Testing
- Automated a11y testing with axe-core
- Keyboard navigation testing
- Screen reader compatibility testing
- Color contrast validation

## SEO Implementation

### On-Page SEO
- Semantic HTML structure
- Proper heading hierarchy (h1-h6)
- Meta titles and descriptions
- Alt text for all images
- Internal linking strategy

### Technical SEO
- XML sitemap generation
- Robots.txt configuration
- Canonical URLs
- Schema.org markup (Organization, LocalBusiness, ProfessionalService)

### Content Strategy
- Keyword optimization for "AI Systems Architect Los Angeles"
- Service-focused landing pages
- Case study content for authority building
- FAQ section for long-tail keywords

## Security Considerations

### Form Security
- CSRF protection
- Input sanitization
- Rate limiting
- Honeypot spam protection

### Headers
- Security headers via middleware
- Content Security Policy
- HTTPS enforcement
- XSS protection

## Performance Optimization

### Image Optimization
- Next.js Image component usage
- WebP format with fallbacks
- Lazy loading implementation
- Responsive image sizing

### Code Splitting
- Route-based code splitting
- Component lazy loading
- Dynamic imports for heavy components

### Caching Strategy
- Static generation for content pages
- ISR for dynamic content
- CDN optimization
- Browser caching headers

## Brand Integration

### Visual Design
- Subtle neon accent color integration
- Clean, professional typography
- Consistent spacing and layout
- Mobile-first responsive design

### Tone and Voice
- Confident and concise copy
- Slightly irreverent personality
- Zero-fluff approach
- Outcome-focused messaging

### Conversion Optimization
- Clear value proposition hierarchy
- Strategic CTA placement
- Social proof integration
- Friction reduction in contact flow