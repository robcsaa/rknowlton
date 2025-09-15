import Link from 'next/link';
import { brandConfig } from '@/lib/config';

interface FooterProps {
  brandName?: string;
  email?: string;
}

const navigation = {
  main: [
    { name: 'Services', href: '/services' },
    { name: 'Work', href: '/work' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

export default function Footer({
  brandName = brandConfig.name,
  email = brandConfig.email
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <div>
              <Link href="/" className="flex items-center space-x-2">
                <div 
                  className="h-8 w-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: brandConfig.accentColor }}
                >
                  {brandName.charAt(0)}
                </div>
                <span className="text-lg font-semibold text-white">{brandName}</span>
              </Link>
              <p className="mt-4 text-sm leading-6 text-gray-300">
                {brandConfig.tagline}
              </p>
              <p className="text-sm text-gray-300">
                {brandConfig.location}
              </p>
            </div>
            <div className="space-y-2">
              <div>
                <a
                  href={`mailto:${email}`}
                  className="text-sm text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white rounded-md px-1 py-0.5"
                >
                  {email}
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Navigation</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white rounded-md px-1 py-0.5"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white rounded-md px-1 py-0.5"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Get Started</h3>
                <div className="mt-6 space-y-4">
                  <Link
                    href={brandConfig.calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900"
                    style={{ 
                      backgroundColor: brandConfig.accentColor
                    }}
                  >
                    Book a free consult
                  </Link>
                  <div>
                    <Link
                      href="/contact"
                      className="text-sm leading-6 text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white rounded-md px-1 py-0.5"
                    >
                      Get a quote →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-400">
            &copy; {currentYear} {brandName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}