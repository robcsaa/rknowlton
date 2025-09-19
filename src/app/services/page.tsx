import { Metadata } from 'next';
import Section from '@/components/Section';

import { generateJsonLd } from '@/components/SEO';
import { brandConfig, siteConfig } from '@/lib/config';
import { 
  Bot, 
  Cloud, 
  Zap, 
  Shield, 
  Lightbulb,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: `Services - ${brandConfig.name}`,
  description: 'AI, automation, cloud infrastructure, and custom integrations for startups and SMBs. Get your tech working for you, not against you.',
  openGraph: {
    title: `Services - ${brandConfig.name}`,
    description: 'AI, automation, cloud infrastructure, and custom integrations for startups and SMBs.',
    url: `${siteConfig.url}/services`,
  },
};

const detailedServices = [
  {
    id: 'ai-automation',
    icon: <Bot className="w-6 h-6" />,
    title: 'AI & Automation',
    subtitle: 'Stop doing what machines should do',
    description: 'I build AI systems and automation workflows that eliminate manual work and scale your operations. From chatbots that actually help customers to workflow automation that saves hours every day.',
    features: [
      'Custom AI chatbots and virtual assistants',
      'Workflow automation and process optimization',
      'Document processing and data extraction',
      'Predictive analytics and business intelligence',
      'AI-powered customer service solutions',
      'Integration with existing business systems'
    ],
    outcomes: [
      '40-70% reduction in manual processing time',
      'Improved customer response times',
      'Reduced operational costs',
      'Scalable business processes'
    ],
    technologies: ['OpenAI GPT', 'LangChain', 'Zapier', 'Make.com', 'Python', 'Node.js'],
    ctaText: 'Automate your workflows',
    ctaUrl: '/contact'
  },
  {
    id: 'cloud-infrastructure',
    icon: <Cloud className="w-6 h-6" />,
    title: 'Cloud & On-Prem Infrastructure',
    subtitle: 'Infrastructure that scales with you, not against you',
    description: 'I design and deploy cloud and on-premises infrastructure that performs reliably, scales efficiently, and costs what it should. No over-engineering, no vendor lock-in.',
    features: [
      'AWS cloud architecture and deployment',
      'Proxmox virtualization and containerization',
      'Hybrid cloud strategies and migration',
      'Docker and Kubernetes orchestration',
      'Infrastructure as Code (Terraform)',
      'Performance optimization and cost management'
    ],
    outcomes: [
      'Reduced infrastructure costs by 30-50%',
      'Improved system reliability and uptime',
      'Faster deployment and scaling',
      'Better disaster recovery capabilities'
    ],
    technologies: ['AWS', 'Proxmox', 'Docker', 'Kubernetes', 'Terraform', 'Ansible'],
    ctaText: 'Optimize your infrastructure',
    ctaUrl: '/contact'
  },
  {
    id: 'integrations',
    icon: <Zap className="w-6 h-6" />,
    title: 'Custom Integrations',
    subtitle: 'Make your systems talk to each other',
    description: 'I connect your business systems so data flows seamlessly between platforms. ERPs, CRMs, APIs, databases - everything works together like it should.',
    features: [
      'API development and integration',
      'ERP and CRM system connections',
      'Real-time data synchronization',
      'Custom middleware and data pipelines',
      'Legacy system modernization',
      'Third-party service integrations'
    ],
    outcomes: [
      'Eliminated data silos and manual data entry',
      'Real-time business insights',
      'Improved data accuracy and consistency',
      'Streamlined business operations'
    ],
    technologies: ['REST APIs', 'GraphQL', 'Webhooks', 'ETL Pipelines', 'PostgreSQL', 'Redis'],
    ctaText: 'Connect your systems',
    ctaUrl: '/contact'
  },
  {
    id: 'security-monitoring',
    icon: <Shield className="w-6 h-6" />,
    title: 'Security & Monitoring',
    subtitle: 'Know what\'s happening before it becomes a problem',
    description: 'I implement security measures and monitoring systems that protect your business and give you visibility into what matters. Catch issues before they become incidents.',
    features: [
      'Security audits and vulnerability assessments',
      'Monitoring and alerting systems',
      'Log aggregation and analysis',
      'Backup and disaster recovery planning',
      'Compliance and regulatory requirements',
      'Incident response and forensics'
    ],
    outcomes: [
      'Reduced security incidents and breaches',
      'Faster incident detection and response',
      'Improved system visibility and insights',
      'Better compliance and audit readiness'
    ],
    technologies: ['Prometheus', 'Grafana', 'ELK Stack', 'Datadog', 'AWS CloudWatch', 'Splunk'],
    ctaText: 'Secure your systems',
    ctaUrl: '/contact'
  },
  {
    id: 'creative-tech',
    icon: <Lightbulb className="w-6 h-6" />,
    title: 'Creative Tech Solutions',
    subtitle: 'When you need something that doesn\'t exist yet',
    description: 'I build custom solutions for unique business challenges. Rapid prototyping, proof-of-concepts, and innovative tech that drives real business outcomes.',
    features: [
      'Rapid prototyping and MVP development',
      'Custom software development',
      'IoT and hardware integration',
      'Data visualization and dashboards',
      'Mobile and web application development',
      'Innovation consulting and strategy'
    ],
    outcomes: [
      'Faster time-to-market for new ideas',
      'Competitive advantages through technology',
      'Validated business concepts and prototypes',
      'Custom solutions that fit your exact needs'
    ],
    technologies: ['React', 'Next.js', 'Python', 'IoT Platforms', 'D3.js', 'WebGL'],
    ctaText: 'Build something new',
    ctaUrl: '/contact'
  }
];

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateJsonLd('professionalService'))
        }}
      />

      {/* Hero Section */}
      <Section className="pt-24 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Services That Actually
            <span 
              className="block"
              style={{ color: brandConfig.accentColor }}
            >
              Move the Needle
            </span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            I don&apos;t do consulting theater. I build systems that eliminate bottlenecks,
            reduce costs, and scale with your business. Here&apos;s exactly how I help startups 
            and SMBs get their tech working for them.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ 
                backgroundColor: brandConfig.accentColor
              }}
            >
              Get a free consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              See the results
            </Link>
          </div>
        </div>
      </Section>

      {/* Detailed Services */}
      <Section background="gray" className="py-20">
        <div className="space-y-20">
          {detailedServices.map((service, index) => (
            <div key={service.id} id={service.id} className="scroll-mt-24">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center space-x-3 mb-4">
                    <div 
                      className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-white"
                      style={{ backgroundColor: brandConfig.accentColor }}
                    >
                      {service.icon}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">{service.title}</h2>
                      <p className="text-lg text-gray-600 mt-1">{service.subtitle}</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">What I deliver:</h3>
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          <CheckCircle 
                            className="flex-shrink-0 w-5 h-5 mt-0.5" 
                            style={{ color: brandConfig.accentColor }}
                          />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Typical outcomes:</h3>
                    <ul className="space-y-2">
                      {service.outcomes.map((outcome, outcomeIndex) => (
                        <li key={outcomeIndex} className="flex items-start space-x-3">
                          <div 
                            className="flex-shrink-0 w-2 h-2 rounded-full mt-2.5"
                            style={{ backgroundColor: brandConfig.accentColor }}
                          />
                          <span className="text-gray-700 font-medium">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={service.ctaUrl}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
                    style={{ 
                      backgroundColor: brandConfig.accentColor
                    }}
                  >
                    {service.ctaText}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>

                {/* Technologies */}
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Technologies I use:</h3>
                    <div className="flex flex-wrap gap-3">
                      {service.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800 border border-gray-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">
            Ready to Get Your Tech Working?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Let&apos;s talk about your specific challenges and how I can help solve them. 
            No sales pitch, just a straight conversation about what you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ 
                backgroundColor: brandConfig.accentColor
              }}
            >
              Book a free consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href={brandConfig.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Schedule directly
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}