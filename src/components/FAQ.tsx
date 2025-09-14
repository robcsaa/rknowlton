'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items?: FAQItem[];
  className?: string;
}

const defaultFAQItems: FAQItem[] = [
  {
    question: "How quickly can you start working on my project?",
    answer: "I typically start new projects within 1-2 weeks of signing the agreement. For urgent situations, I can often accommodate faster timelines. During our initial consultation, we'll discuss your timeline needs and I'll let you know exactly when I can begin."
  },
  {
    question: "Do you work with startups or just established companies?",
    answer: "I work with both! I've helped early-stage startups build their first proper infrastructure and established companies modernize their existing systems. My approach scales to your current needs and budget, whether you're a 5-person team or a 50-person company."
  },
  {
    question: "What's included in your AI & automation services?",
    answer: "Everything from workflow automation and data pipeline setup to custom AI integrations and chatbot development. I focus on practical applications that actually save you time and money - no buzzword solutions that don't deliver real value."
  },
  {
    question: "Can you help if we're already working with another tech team?",
    answer: "Absolutely. I often collaborate with existing development teams to handle specialized infrastructure, AI integration, or automation projects. I can work as an extension of your team or take on specific technical challenges that need focused expertise."
  },
  {
    question: "What happens if something breaks after the project is done?",
    answer: "All projects include a warranty period for bug fixes and issues directly related to my work. I also offer ongoing maintenance packages if you want continued support. Plus, I document everything thoroughly so your team can maintain the systems independently if needed."
  }
];

export default function FAQ({ items = defaultFAQItems, className = '' }: FAQProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleItem(index);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, index) => {
        const isOpen = openItems.has(index);
        const buttonId = `faq-button-${index}`;
        const panelId = `faq-panel-${index}`;

        return (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              id={buttonId}
              className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-colors duration-200"
              onClick={() => toggleItem(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              type="button"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {item.question}
                </h3>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                    isOpen ? 'transform rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </div>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`overflow-hidden transition-all duration-200 ease-in-out ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-4 pt-2">
                <p className="text-gray-700 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}