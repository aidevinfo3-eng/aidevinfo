import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/shared/section-heading';

const reasons = [
  {
    title: 'Expert AI Developers',
    description: 'Skilled in modern AI technologies and frameworks.',
  },
  {
    title: 'High-Quality Solutions',
    description: 'We deliver secure, scalable, and performance-driven solutions.',
  },
  {
    title: 'AI Tools Marketplace',
    description: 'Discover, compare, and choose the best AI tools.',
  },
  {
    title: 'Latest AI Insights',
    description: 'Stay updated with AI news, tutorials, and research.',
  },
  {
    title: 'Sponsored Promotions',
    description: 'Promote your AI tools, SaaS, and services effectively.',
  },
  {
    title: '24/7 Support',
    description: "We're here to support your AI journey anytime.",
  },
];

export function WhyChooseSection() {
  return (
    <section className="border-y border-border bg-card py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Why Choose Us"
              title="Building the future with intelligence and innovation"
              description="We combine cutting-edge AI technology with real-world experience to deliver powerful, scalable, and reliable AI solutions for modern businesses."
              center={false}
              className="max-w-md"
            />
            <div className="mt-8">
              <Button asChild variant="outline" size="lg" className="group">
                <Link href="/contact">
                  About us
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {reasons.map((reason, index) => (
              <div
                key={reason.title}
                className="border border-border bg-background p-6"
              >
                <p className="text-[11px] font-medium tabular-nums text-primary">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-3 font-display text-xl text-foreground">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
