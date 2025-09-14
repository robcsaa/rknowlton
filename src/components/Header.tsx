'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { brandConfig } from '@/lib/config';
import { clsx } from 'clsx';

interface HeaderProps {
  brandName?: string;
  calendlyUrl?: string;
  logoPath?: string;
}

const navigation = [
  { name: 'Services', href: '/services' },
  { name: 'Work', href: '/work' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Header({ 
  brandName = brandConfig.name,
  calendlyUrl = brandConfig.calendlyUrl,
  logoPath = brandConfig.logoPath 
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center space-x-2">
            {logoPath ? (
              <Image
                src={logoPath}
                alt={`${brandName} logo`}
                width={32}
                height={32}
                className="h-8 w-auto"
              />
            ) : (
              <div 
                className="h-8 w-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: brandConfig.accentColor }}
              >
                {brandName.charAt(0)}
              </div>
            )}
            <span className="font-semibold text-gray-900">{brandName}</span>
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
            onClick={() => setMobileMenuOpen(true)}
            aria-expanded="false"
            aria-label="Open main menu"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-md px-2 py-1"
            >
              {item.name}
            </Link>
          ))}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              "rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200",
              "hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white"
            )}
            style={{ 
              backgroundColor: brandConfig.accentColor
            }}
          >
            Book a free consult
          </Link>
        </div>
      </nav>
      
      {/* Mobile menu */}
      <div className={clsx(
        "lg:hidden fixed inset-0 z-50 transition-opacity duration-300",
        mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}>
        <div className="fixed inset-0 bg-black/20" onClick={() => setMobileMenuOpen(false)} />
        <div className={clsx(
          "fixed inset-y-0 right-0 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 transition-transform duration-300",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center space-x-2">
              {logoPath ? (
                <Image
                  src={logoPath}
                  alt={`${brandName} logo`}
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                />
              ) : (
                <div 
                  className="h-8 w-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: brandConfig.accentColor }}
                >
                  {brandName.charAt(0)}
                </div>
              )}
              <span className="font-semibold text-gray-900">{brandName}</span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Link
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx(
                    "block w-full rounded-md px-4 py-2 text-center text-sm font-semibold text-white shadow-sm transition-all duration-200",
                    "hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white"
                  )}
                  style={{ 
                    backgroundColor: brandConfig.accentColor
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book a free consult
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}