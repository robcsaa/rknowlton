import { CaseStudyCardProps } from '@/types';

export const caseStudies: CaseStudyCardProps[] = [
  {
    title: "AI-Powered Customer Support Automation",
    problem: "A growing SaaS startup was drowning in customer support tickets, with response times averaging 24+ hours and support costs eating 30% of revenue. Their small team couldn't scale with demand.",
    solution: "Implemented an AI-powered support system with intelligent ticket routing, automated responses for common issues, and seamless human handoff for complex problems. Integrated with existing CRM and knowledge base.",
    outcome: "Support response time dropped to under 2 hours, customer satisfaction increased by 45%, and support costs reduced by 60% while handling 3x more tickets with the same team size.",
    metrics: [
      { label: "Response Time Reduction", value: "92%" },
      { label: "Cost Savings", value: "60%" },
      { label: "Ticket Volume Increase", value: "3x" },
      { label: "Customer Satisfaction", value: "+45%" }
    ]
  },
  {
    title: "Hybrid Cloud Infrastructure Optimization",
    problem: "A mid-size e-commerce company was burning $15k/month on cloud costs with frequent downtime during traffic spikes. Their on-premise servers were underutilized while cloud resources were overprovisioned.",
    solution: "Designed and implemented a hybrid cloud architecture using Kubernetes for container orchestration, automated scaling policies, and intelligent workload distribution between on-premise and cloud resources.",
    outcome: "Reduced infrastructure costs by 70%, achieved 99.9% uptime during Black Friday traffic (10x normal load), and improved deployment speed from hours to minutes.",
    metrics: [
      { label: "Cost Reduction", value: "70%" },
      { label: "Uptime Achievement", value: "99.9%" },
      { label: "Traffic Handling", value: "10x" },
      { label: "Deployment Speed", value: "95%" }
    ]
  },
  {
    title: "Custom Integration & Workflow Automation",
    problem: "A logistics company was manually processing 500+ orders daily across 5 different systems, leading to errors, delays, and 20+ hours of manual work per day. Data inconsistencies were causing customer complaints.",
    solution: "Built custom API integrations connecting their ERP, CRM, shipping, and inventory systems. Implemented automated workflows for order processing, inventory updates, and customer notifications with error handling and rollback capabilities.",
    outcome: "Eliminated 95% of manual data entry, reduced order processing time from 45 minutes to 3 minutes, and achieved 99.8% data accuracy across all systems.",
    metrics: [
      { label: "Manual Work Reduction", value: "95%" },
      { label: "Processing Time", value: "93%" },
      { label: "Data Accuracy", value: "99.8%" },
      { label: "Daily Time Saved", value: "18 hrs" }
    ]
  }
];