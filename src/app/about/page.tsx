import { Metadata } from 'next';
import Section from '@/components/Section';
import { generateJsonLd } from '@/components/SEO';
import { brandConfig, siteConfig } from '@/lib/config';
import { 
  MapPin,
  Mail,
  Calendar,
  ArrowRight,
  Award,
  Users,
  Zap
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: `About - ${brandConfig.name}`,
  description: `Meet ${brandConfig.name}, AI & Systems Solutions Architect based in ${brandConfig.location}. I make tech work for startups and SMBs, not against them.`,
  openGraph: {
    title: `About - ${brandConfig.name}`,
    description: `AI & Systems Solutions Architect based in ${brandConfig.location}. I make tech work for startups and SMBs.`,
    url: `${siteConfig.url}/about`,
  },
};

const credentials = [
  {
    icon: <Award className="w-5 h-5" />,
    title: "15+ Years Experience",
    description: "Building systems that scale from startup to enterprise"
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "50+ Projects Delivered",
    description: "For startups, SMBs, and Fortune 500 companies"
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "40-70% Efficiency Gains",
    description: "Typical improvement in client operations"
  }
];

const expertise = [
  "AI & Machine Learning Implementation",
  "Cloud Architecture (AWS, Proxmox)",
  "DevOps & Infrastructure Automation",
  "Custom API Development & Integrations",
  "Business Process Automation",
  "Security & Monitoring Systems",
  "Data Pipeline Architecture",
  "Mobile App Development (iOS & Android)",
  "Cross-Platform Development (React Native)",
  "Rapid Prototyping & MVP Development"
];

const approach = [
  {
    title: "No Bullshit Consulting",
    description: "I don't do consulting theater. I build things that work and tell you exactly what you need to know."
  },
  {
    title: "Outcome-Focused",
    description: "Every project has clear success metrics. If it doesn't move your business forward, we don't do it."
  },
  {
    title: "Build for Scale",
    description: "I design systems that grow with you, not against you. No over-engineering, no vendor lock-in."
  },
  {
    title: "Rapid Iteration",
    description: "Get working solutions fast, then iterate based on real usage. Perfect is the enemy of shipped."
  }
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateJsonLd('person'))
        }}
      />

      {/* Hero Section */}
      <Section className="pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              I&apos;m {brandConfig.name.split(' ')[0]}.
              <span 
                className="block"
                style={{ color: brandConfig.accentColor }}
              >
                I Fix Tech.
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              For the past 15+ years, I&apos;ve been the guy startups and SMBs call when their tech 
              is holding them back instead of moving them forward. I don&apos;t do consulting theater—I 
              build systems that actually work.
            </p>
            <div className="mt-8 flex items-center space-x-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" style={{ color: brandConfig.accentColor }} />
                <span>{brandConfig.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5" style={{ color: brandConfig.accentColor }} />
                <a 
                  href={`mailto:${brandConfig.email}`}
                  className="hover:underline"
                >
                  {brandConfig.email}
                </a>
              </div>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ 
                  backgroundColor: brandConfig.accentColor
                }}
              >
                Let&apos;s talk about your tech
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href={brandConfig.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <Calendar className="mr-2 w-5 h-5" />
                Book a call
              </Link>
            </div>
          </div>
          
          {/* Credentials */}
          <div className="space-y-6">
            {credentials.map((credential, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3 mb-2">
                  <div 
                    className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: brandConfig.accentColor }}
                  >
                    {credential.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{credential.title}</h3>
                </div>
                <p className="text-gray-600 ml-13">{credential.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Background & Expertise */}
      <Section background="gray" className="py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              The Story
            </h2>
            <div className="prose prose-lg text-gray-700 space-y-6">
              <p>
                I started building systems when &ldquo;the cloud&rdquo; was just a weather phenomenon 
                and AI was science fiction. Back then, if you wanted something automated, 
                you built it yourself or hired a team of consultants who&apos;d spend six months 
                telling you why it couldn&apos;t be done.
              </p>
              <p>
                Fast forward to today: I&apos;ve helped over 50 companies—from scrappy startups 
                to Fortune 500s—turn their tech from a liability into an asset. I&apos;ve seen 
                every flavor of broken system, over-engineered solution, and vendor lock-in 
                nightmare you can imagine.
              </p>
              <p>
                Here&apos;s what I learned: most tech problems aren&apos;t actually tech problems. 
                They&apos;re business problems disguised as tech problems. My job is to cut through 
                the noise, identify what actually matters, and build solutions that work.
              </p>
              <p>
                I&apos;m based in Los Angeles, but I work with clients everywhere. I believe in 
                building things that scale, shipping fast, and measuring what matters. 
                Everything else is just noise.
              </p>
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              What I Actually Do
            </h2>
            <div className="space-y-4 mb-8">
              {expertise.map((skill, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div 
                    className="flex-shrink-0 w-2 h-2 rounded-full"
                    style={{ backgroundColor: brandConfig.accentColor }}
                  />
                  <span className="text-gray-700">{skill}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Current Focus
              </h3>
              <p className="text-gray-700">
                Right now, I&apos;m helping startups and SMBs leverage AI and automation to 
                eliminate bottlenecks and scale their operations. The technology is finally 
                mature enough to deliver real ROI, and the companies that move fast will 
                have a significant advantage.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Approach */}
      <Section className="py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">
            How I Work
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            No lengthy discovery phases, no death-by-PowerPoint, no consulting theater. 
            Here&apos;s my actual approach to getting your tech working.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {approach.map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {item.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="gray" className="py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">
            Let&apos;s Fix Your Tech
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            If your tech is holding you back instead of moving you forward, let&apos;s talk. 
            I&apos;ll give you a straight assessment of what you need and how to get there.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ 
                backgroundColor: brandConfig.accentColor
              }}
            >
              Start the conversation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              See what I&apos;ve built
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}