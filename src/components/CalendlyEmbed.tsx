'use client';

import { useState, useEffect } from 'react';

interface CalendlyEmbedProps {
  url: string;
  height?: number;
  className?: string;
  title?: string;
}

export default function CalendlyEmbed({ 
  url, 
  height = 630, 
  className = '',
  title = 'Schedule a consultation'
}: CalendlyEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset states when URL changes
    setIsLoading(true);
    setHasError(false);
  }, [url]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div 
        className={`flex flex-col items-center justify-center p-8 bg-gray-50 border border-gray-200 rounded-lg ${className}`}
        style={{ height: `${height}px` }}
        role="alert"
        aria-live="polite"
      >
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <svg 
              className="w-12 h-12 mx-auto" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Unable to load calendar
          </h3>
          <p className="text-gray-600 mb-4">
            There was an issue loading the scheduling calendar.
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Open in new tab
            <svg 
              className="ml-2 w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
              />
            </svg>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Loading state */}
      {isLoading && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg z-10"
          style={{ height: `${height}px` }}
          aria-live="polite"
          aria-label="Loading calendar"
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading calendar...</p>
          </div>
        </div>
      )}

      {/* Calendly iframe */}
      <iframe
        src={url}
        width="100%"
        height={height}
        frameBorder="0"
        scrolling="no"
        title={title}
        onLoad={handleLoad}
        onError={handleError}
        className="rounded-lg"
        allow="microphone; camera"
        aria-label={`${title} - Calendly scheduling widget`}
      />
    </div>
  );
}