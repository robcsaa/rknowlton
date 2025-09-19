import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import CalendlyEmbed from '@/components/CalendlyEmbed';
import { generateJsonLd } from '@/components/SEO';
import Section from '@/components/Section';
import { brandConfig, siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: `Contact - ${brandConfig.name}`,
  description: "Ready to make your tech actually work? Get in touch for a free consultation about your AI, automation, and infrastructure needs.",
  openGraph: {
    title: `Contact - ${brandConfig.name}`,
    description: "Get in touch for a free consultation about your AI, automation, and infrastructure needs.",
    url: `${siteConfig.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateJsonLd('localBusiness'))
        }}
      />
      
      <Section className="py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Let's Talk Tech
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to make your tech actually work? Choose your preferred way to get in touch and let's build something that delivers results.
            </p>
          </div>

          {/* Contact Options Grid */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Form Section */}
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Send a Message
                </h2>
                <p className="text-gray-600">
                  Tell me about your project and I'll get back to you within 24 hours.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-8">
                <ContactForm />
              </div>
            </div>

            {/* Calendly Embed Section */}
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Schedule a Call
                </h2>
                <p className="text-gray-600">
                  Book a free 30-minute consultation to discuss your project directly.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-4">
                <CalendlyEmbed 
                  url={brandConfig.calendlyUrl}
                  height={600}
                  title="Schedule a consultation with Rob Knowlton"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Other Ways to Reach Me
              </h2>
              <p className="text-gray-600">
                Prefer a different approach? Here are all the ways you can get in touch.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 text-center">
              {/* Email */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg 
                    className="w-6 h-6 text-blue-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Email</h3>
                <a 
                  href={`mailto:${brandConfig.email}`} 
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {brandConfig.email}
                </a>
                <p className="text-sm text-gray-500 mt-1">
                  I typically respond within 24 hours
                </p>
              </div>


              {/* Location */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg 
                    className="w-6 h-6 text-purple-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                    />
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Location</h3>
                <p className="text-gray-600">{brandConfig.location}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Available for local and remote projects
                </p>
              </div>
            </div>
          </div>

          {/* Response Time Promise */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
              <svg 
                className="w-5 h-5 text-blue-600 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              <span className="text-blue-800 font-medium">
                I respond to all inquiries within 24 hours
              </span>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}