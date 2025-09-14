import Hero from '@/components/Hero';
import Section from '@/components/Section';
import ServiceCard from '@/components/ServiceCard';
import FAQ from '@/components/FAQ';
import { 
  Bot, 
  Cloud, 
  Zap, 
  Shield, 
  Lightbulb 
} from 'lucide-react';

const services = [
  {
    icon: <Bot className="w-5 h-5" />,
    title: "AI & Automation",
    bullets: [
      "Chatbots, agent workflows, and ops automation that remove manual drag.",
      "Custom AI solutions tailored to your business processes.",
      "Workflow automation that actually saves time and money."
    ],
    ctaText: "Learn more",
    ctaUrl: "/services#ai-automation"
  },
  {
    icon: <Cloud className="w-5 h-5" />,
    title: "Cloud & On-Prem",
    bullets: [
      "AWS/Proxmox builds tuned for performance, reliability, and cost.",
      "Hybrid cloud strategies that make sense for your business.",
      "Infrastructure that scales with your growth, not against it."
    ],
    ctaText: "Learn more",
    ctaUrl: "/services#cloud-infrastructure"
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Integrations",
    bullets: [
      "ERPs, APIs, data pipelines; everything talks and nothing breaks.",
      "Custom integrations that eliminate data silos.",
      "Real-time sync between all your business systems."
    ],
    ctaText: "Learn more",
    ctaUrl: "/services#integrations"
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Security & Monitoring",
    bullets: [
      "Observability you actually look at; incidents you actually catch.",
      "Security that protects without slowing you down.",
      "Monitoring dashboards that tell you what matters."
    ],
    ctaText: "Learn more",
    ctaUrl: "/services#security-monitoring"
  },
  {
    icon: <Lightbulb className="w-5 h-5" />,
    title: "Creative Tech",
    bullets: [
      "Rapid prototyping when \"we just need this working by Friday.\"",
      "Custom solutions for unique business challenges.",
      "Innovation that drives real business outcomes."
    ],
    ctaText: "Learn more",
    ctaUrl: "/services#creative-tech"
  }
];

export default function Home() {
  return (
    <>
      <Hero />
      
      <Section background="gray" id="services">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What I Actually Do
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            I design and ship systems that remove bottlenecks. Here&apos;s how I help startups and SMBs get their tech working for them, not against them.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </Section>

      <Section id="faq" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="faq-heading" className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Got questions? Here are the answers to what most people ask before we start working together.
            </p>
          </div>
          
          <FAQ />
        </div>
      </Section>
    </>
  );
}
