import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import CaseStudyCard from '@/components/CaseStudyCard';
import Section from '@/components/Section';
import { generateMetadata } from '@/components/SEO';
import { caseStudies } from '@/lib/caseStudies';
import { brandConfig } from '@/lib/config';

export const metadata: Metadata = generateMetadata({
  title: 'Work & Case Studies',
  description: 'See how I&apos;ve helped startups and SMBs achieve 40-70% faster cycle times, reduce costs, and scale their operations through AI, automation, and smart infrastructure.',
});

export default function WorkPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Work & Case Studies",
    "description": "Portfolio of AI, automation, and infrastructure projects",
    "url": `${process.env.NEXT_PUBLIC_SITE_URL}/work`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": caseStudies.length,
      "itemListElement": caseStudies.map((study, index) => ({
        "@type": "CreativeWork",
        "position": index + 1,
        "name": study.title,
        "description": study.outcome
      }))
    }
  };

  return (
    <>
      <Script
        id="work-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <Section className="pt-24 pb-16" background="white">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Real Results for Real Businesses
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Here&apos;s how I&apos;ve helped startups and SMBs cut costs, boost efficiency, and scale faster. 
            No fluff, just measurable outcomes that matter to your bottom line.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={brandConfig.calendlyUrl}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white rounded-lg transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white"
              style={{ backgroundColor: brandConfig.accentColor }}
            >
              Book a free consult
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold border-2 rounded-lg transition-all duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white"
              style={{ 
                borderColor: brandConfig.accentColor,
                color: brandConfig.accentColor
              }}
            >
              Get a quote
            </Link>
          </div>
        </div>
      </Section>

      {/* Case Studies Grid */}
      <Section background="gray" className="py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Case Studies
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every project starts with understanding your specific challenges. 
            Here&apos;s how I&apos;ve solved similar problems for other businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <CaseStudyCard
              key={index}
              title={study.title}
              problem={study.problem}
              solution={study.solution}
              outcome={study.outcome}
              metrics={study.metrics}
            />
          ))}
        </div>
      </Section>

      {/* Results Summary */}
      <Section className="py-20" background="white">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            The Bottom Line
          </h2>
          <p className="text-lg text-gray-600 mb-12 leading-relaxed">
            These aren&apos;t just success stories—they&apos;re proof that the right tech strategy 
            can transform your business. Whether you&apos;re drowning in manual processes, 
            burning cash on inefficient systems, or struggling to scale, there&apos;s a solution.
          </p>
          
          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div 
                className="text-4xl font-bold mb-2"
                style={{ color: brandConfig.accentColor }}
              >
                40-70%
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Faster Cycle Times
              </div>
            </div>
            <div className="text-center">
              <div 
                className="text-4xl font-bold mb-2"
                style={{ color: brandConfig.accentColor }}
              >
                60%+
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Cost Reduction
              </div>
            </div>
            <div className="text-center">
              <div 
                className="text-4xl font-bold mb-2"
                style={{ color: brandConfig.accentColor }}
              >
                99.9%
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Uptime Achieved
              </div>
            </div>
            <div className="text-center">
              <div 
                className="text-4xl font-bold mb-2"
                style={{ color: brandConfig.accentColor }}
              >
                95%+
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Manual Work Eliminated
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={brandConfig.calendlyUrl}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white rounded-lg transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white"
              style={{ backgroundColor: brandConfig.accentColor }}
            >
              Let&apos;s discuss your project
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold border-2 rounded-lg transition-all duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white"
              style={{ 
                borderColor: brandConfig.accentColor,
                color: brandConfig.accentColor
              }}
            >
              View services
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}