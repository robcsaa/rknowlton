import { BrandConfig } from '@/types';

export const brandConfig: BrandConfig = {
  name: process.env.NEXT_PUBLIC_BRAND_NAME || 'Rob Knowlton',
  tagline: process.env.NEXT_PUBLIC_TAGLINE || 'I make your tech actually work.',
  location: process.env.NEXT_PUBLIC_LOCATION || 'Los Angeles, CA',
  accentColor: process.env.NEXT_PUBLIC_ACCENT_COLOR || '#00ff88',
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/your-calendly-link',
  email: process.env.NEXT_PUBLIC_EMAIL || 'rob@rknowlton.com',
  logoPath: process.env.NEXT_PUBLIC_LOGO_PATH,
};

export const siteConfig = {
  name: brandConfig.name,
  description: `${brandConfig.tagline} AI, automation, and infrastructure solutions for startups and SMBs.`,
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://robknowlton.com',
  ogImage: '/og-image.jpg',
  creator: brandConfig.name,
  keywords: [
    'AI Systems Architect',
    'Los Angeles',
    'Automation',
    'Cloud Infrastructure',
    'Custom Integrations',
    'Startup Technology',
    'SMB Solutions'
  ],
};