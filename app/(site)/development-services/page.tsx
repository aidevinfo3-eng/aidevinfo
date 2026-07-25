import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Bot,
  Brain,
  Workflow,
  Sparkles,
  Cloud,
  Cpu,
  Database,
  Lightbulb,
  Code2,
  MessageSquare,
  Zap,
  Layers,
  type LucideIcon,
} from 'lucide-react';
import { SectionHeading } from '@/components/shared/section-heading';
import { Button } from '@/components/ui/button';
import { getDevelopmentServices } from '@/lib/development-services';
import { generateSEO } from '@/lib/seo';

export const dynamic = 'force-dynamic';

const iconMap: Record<string, LucideIcon> = {
  Bot,
  Brain,
  Workflow,
  Sparkles,
  Cloud,
  Cpu,
  Database,
  Lightbulb,
  Code2,
  MessageSquare,
  Zap,
  Layers,
};

export const metadata: Metadata = generateSEO({
  title: 'AI Development Services — Custom AI Solutions',
  description:
    'Explore AI development services including chatbots, agents, automation, custom GPTs, SaaS, LLM integration, RAG apps, and consulting.',
  path: '/development-services',
});

export default async function DevelopmentServicesPage() {
  const services = await getDevelopmentServices();

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Our Expertise"
            title="AI Development Services"
            description="We build custom AI solutions that help businesses automate, innovate, and grow."
            center={false}
            className="max-w-2xl"
          />
          <Button asChild size="lg" className="shrink-0 self-start group">
            <Link href="/contact">
              Book consultation
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = iconMap[service.icon] ?? Bot;
            return (
              <Link
                key={service.id}
                href={`/development-services/${service.slug}`}
                className="group flex h-full flex-col border border-border bg-card p-6 transition-colors hover:border-foreground/25 hover:bg-muted/40"
              >
                <div className="flex h-11 w-11 items-center justify-center border border-border bg-background text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-5 font-display text-xl text-foreground">
                  {service.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                  Learn more
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
