import { Metadata } from 'next';
import { siteConfig, brandConfig } from '@/lib/config';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  jsonLd?: object;
  noIndex?: boolean;
}

export function generateMetadata({
  title,
  description = siteConfig.description,
  canonical,
  ogImage = siteConfig.ogImage,
  noIndex = false,
}: SEOProps = {}): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const url = canonical || siteConfig.url;

  return {
    title: fullTitle,
    description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.creator }],
    creator: siteConfig.creator,
    publisher: siteConfig.creator,
    robots: noIndex ? 'noindex,nofollow' : 'index,follow',
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - ${description}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: `@${siteConfig.creator.toLowerCase().replace(' ', '')}`,
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
  };
}

export function generateJsonLd(type: 'organization' | 'person' | 'localBusiness' | 'professionalService' = 'organization') {
  const baseData = {
    '@context': 'https://schema.org',
    name: brandConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    email: brandConfig.email,
  };

  switch (type) {
    case 'organization':
      return {
        ...baseData,
        '@type': 'Organization',
        logo: brandConfig.logoPath ? `${siteConfig.url}${brandConfig.logoPath}` : undefined,
        sameAs: [],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Los Angeles',
          addressRegion: 'CA',
          addressCountry: 'US',
        },
      };

    case 'person':
      return {
        ...baseData,
        '@type': 'Person',
        jobTitle: 'AI & Systems Solutions Architect',
        worksFor: {
          '@type': 'Organization',
          name: brandConfig.name,
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Los Angeles',
          addressRegion: 'CA',
          addressCountry: 'US',
        },
      };

    case 'localBusiness':
      return {
        ...baseData,
        '@type': 'LocalBusiness',
        '@id': siteConfig.url,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Los Angeles',
          addressRegion: 'CA',
          addressCountry: 'US',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '34.0522',
          longitude: '-118.2437',
        },
        areaServed: 'US',
        priceRange: '$$',
      };

    case 'professionalService':
      return {
        ...baseData,
        '@type': 'ProfessionalService',
        '@id': siteConfig.url,
        serviceType: 'AI & Systems Solutions Architecture',
        areaServed: 'US',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Los Angeles',
          addressRegion: 'CA',
          addressCountry: 'US',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'AI & Systems Solutions',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'AI & Automation Solutions',
                description: 'Chatbots, agent workflows, and ops automation',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Cloud & On-Premise Infrastructure',
                description: 'AWS/Proxmox builds tuned for performance and reliability',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Custom Integrations',
                description: 'ERPs, APIs, data pipelines and system integrations',
              },
            },
          ],
        },
      };

    default:
      return baseData;
  }
}