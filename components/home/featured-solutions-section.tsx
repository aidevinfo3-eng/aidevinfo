import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/shared/section-heading';

const features = [
  'Custom AI Development',
  'AI Chatbots & Assistants',
  'AI Automation & Workflows',
  'AI SaaS & Web Applications',
  'API Integration & LLM Solutions',
  'Ongoing Support & Maintenance',
];

export function FeaturedSolutionsSection() {
  return (
    <section className="border-y border-border bg-card py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="What We Build"
              title="Featured AI solutions"
              description="We build custom AI solutions that solve real business problems and drive growth."
              center={false}
              className="max-w-xl"
            />

            <ul className="mt-8 space-y-0 divide-y divide-border border-y border-border">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 py-3.5 text-[15px] text-foreground"
                >
                  <Check className="h-4 w-4 shrink-0 text-primary" strokeWidth={2} />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button asChild size="lg" className="group">
                <Link href="/contact">
                  Start your AI project
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="border border-border bg-background">
            <div className="border-b border-border px-5 py-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                AI Assistant
              </p>
              <p className="mt-2 font-display text-xl text-foreground">
                Hello! How can I help you today?
              </p>
            </div>
            <div className="border-b border-border px-5 py-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Workflow
              </p>
              <p className="mt-2 text-sm text-foreground">Automation Flow</p>
            </div>
            <div className="px-5 py-5">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Analytics overview
                </p>
                <span className="text-xs font-medium text-primary">+38.5%</span>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-4">
                {[
                  { label: 'Users', value: '24.8K' },
                  { label: 'Sessions', value: '56.4K' },
                  { label: 'Projects', value: '150+' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="mt-1 font-display text-2xl text-foreground">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
