import Link from 'next/link';
import { brandConfig } from '@/lib/config';
import { clsx } from 'clsx';

interface HeroProps {
  headline?: string;
  subheadline?: string;
  primaryCTA?: {
    text: string;
    url: string;
  };
  secondaryCTA?: {
    text: string;
    url: string;
  };
  accentColor?: string;
}

export default function Hero({
  headline = "I design and build systems that actually work.",
  subheadline = "AI, automation, and infrastructure that reduce chaos and increase throughput—for startups and scrappy operators.",
  primaryCTA = {
    text: "Book a free consult",
    url: brandConfig.calendlyUrl,
  },
  secondaryCTA = {
    text: "Get a quote",
    url: "/contact",
  },
  accentColor = brandConfig.accentColor,
}: HeroProps) {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      {/* Background gradient */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            background: `linear-gradient(to top right, ${accentColor}, #3b82f6)`,
          }}
        />
      </div>

      <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            {headline}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl max-w-3xl mx-auto">
            {subheadline}
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-x-6 flex-col sm:flex-row gap-y-4 sm:gap-y-0">
            <Link
              href={primaryCTA.url}
              target={primaryCTA.url.startsWith('http') ? '_blank' : undefined}
              rel={primaryCTA.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={clsx(
                "rounded-md px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200",
                "hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white",
                "w-full sm:w-auto"
              )}
              style={{ 
                backgroundColor: accentColor
              }}
            >
              {primaryCTA.text}
            </Link>
            
            <Link
              href={secondaryCTA.url}
              className="rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 w-full sm:w-auto text-center"
            >
              {secondaryCTA.text}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            background: `linear-gradient(to top right, #3b82f6, ${accentColor})`,
          }}
        />
      </div>
    </div>
  );
}