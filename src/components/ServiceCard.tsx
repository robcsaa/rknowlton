import Link from 'next/link';
import { ServiceCardProps } from '@/types';
import { brandConfig } from '@/lib/config';

export default function ServiceCard({
  icon,
  title,
  bullets,
  ctaText,
  ctaUrl,
}: ServiceCardProps) {
  return (
    <div className="relative group bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 hover:border-gray-300">
      <div className="flex items-center space-x-3 mb-4">
        <div 
          className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-white"
          style={{ backgroundColor: brandConfig.accentColor }}
        >
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      
      <ul className="space-y-2 mb-6">
        {bullets.map((bullet, index) => (
          <li key={index} className="flex items-start space-x-2">
            <div 
              className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2"
              style={{ backgroundColor: brandConfig.accentColor }}
            />
            <span className="text-sm text-gray-600 leading-relaxed">{bullet}</span>
          </li>
        ))}
      </ul>
      
      {ctaText && ctaUrl && (
        <Link
          href={ctaUrl}
          className="inline-flex items-center text-sm font-medium transition-colors duration-200 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white rounded-md px-1 py-0.5"
          style={{ 
            color: brandConfig.accentColor
          }}
        >
          {ctaText}
          <svg
            className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      )}
    </div>
  );
}