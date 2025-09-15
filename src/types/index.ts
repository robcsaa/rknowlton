export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  budget: 'under-10k' | '10k-25k' | '25k-50k' | '50k+';
  message: string;
  consent: boolean;
  // Honeypot field
  company_website?: string;
}

export interface ContactSubmission {
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

export interface AnalyticsEvent {
  event: 'cta_click' | 'form_submit' | 'calendly_open' | 'page_view';
  page: string;
  timestamp: Date;
  properties?: Record<string, unknown>;
}

export interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  bullets: string[];
  ctaText?: string;
  ctaUrl?: string;
}

export interface CaseStudyCardProps {
  title: string;
  problem: string;
  solution: string;
  outcome: string;
  metrics?: {
    label: string;
    value: string;
  }[];
}

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  jsonLd?: object;
}

export interface BrandConfig {
  name: string;
  tagline: string;
  location: string;
  accentColor: string;
  calendlyUrl: string;
  email: string;
  logoPath?: string;
}

export interface Logo {
  name: string;
  src: string;
  alt: string;
}

export interface LogoCloudProps {
  title?: string;
  subtitle?: string;
  logos?: Logo[];
  className?: string;
  logoClassName?: string;
  grayscale?: boolean;
}

export interface StatProps {
  value: string;
  label: string;
  description?: string;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  accentColor?: string;
}

export interface StatsGridProps {
  stats: StatProps[];
  title?: string;
  subtitle?: string;
  className?: string;
  columns?: 2 | 3 | 4;
}