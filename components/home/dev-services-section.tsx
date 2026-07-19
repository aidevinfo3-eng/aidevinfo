import Link from 'next/link';
import {
  ArrowUpRight,
  Bot,
  Brain,
  Workflow,
  Sparkles,
  Cloud,
  Cpu,
  Database,
  Lightbulb,
} from 'lucide-react';
import { SectionHeading } from '@/components/shared/section-heading';

const services = [
  {
    icon: Bot,
    title: 'AI Chatbot Development',
    description:
      'Build smart AI chatbots for customer support, sales, and engagement.',
    href: '/services?category=ai-chatbots',
  },
  {
    icon: Brain,
    title: 'AI Agent Development',
    description:
      'Create autonomous AI agents that can think, act, and perform tasks.',
    href: '/services?category=automation',
  },
  {
    icon: Workflow,
    title: 'AI Automation',
    description:
      'Automate repetitive tasks and workflows with intelligent AI solutions.',
    href: '/services?category=automation',
  },
  {
    icon: Sparkles,
    title: 'Custom GPT Solutions',
    description:
      'Develop custom GPTs and AI assistants tailored specifically to your business.',
    href: '/contact',
  },
  {
    icon: Cloud,
    title: 'AI SaaS Development',
    description:
      'Launch powerful AI SaaS products with scalable architecture.',
    href: '/contact',
  },
  {
    icon: Cpu,
    title: 'LLM Integration',
    description:
      'Integrate models like OpenAI, Claude, Gemini, Llama, and more into your apps.',
    href: '/contact',
  },
  {
    icon: Database,
    title: 'RAG Applications',
    description:
      'Build Retrieval-Augmented Generation apps for accurate AI responses.',
    href: '/contact',
  },
  {
    icon: Lightbulb,
    title: 'AI Consulting',
    description:
      'Get expert guidance to implement AI strategies in your business.',
    href: '/contact',
  },
];

export function DevServicesSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Expertise"
          title="AI Development Services"
          description="We build custom AI solutions that help businesses automate, innovate, and grow."
          center={false}
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group flex h-full flex-col border border-border bg-card p-6 transition-colors hover:border-foreground/25 hover:bg-muted/40"
            >
              <div className="flex h-11 w-11 items-center justify-center border border-border bg-background text-primary">
                <service.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-xl text-foreground transition-colors group-hover:text-primary">
                {service.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                Learn more
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
