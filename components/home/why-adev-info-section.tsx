import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/shared/section-heading';
import { HomeSection, HOME_CARD_INSET } from '@/components/home/home-section';

const principles = [
  {
    title: 'Practical',
    description:
      'We focus on how AI technologies and tools work and how they fit real applications and workflows.',
  },
  {
    title: 'Transparent',
    description:
      'We explain trade-offs and limitations—not every AI product solves every problem.',
  },
  {
    title: 'Evidence-aware',
    description:
      'We aim to support technical and product information with reliable sources when verification is possible.',
  },
  {
    title: 'Continuously updated',
    description:
      'Tools, models, pricing, and capabilities change quickly—we review and update as the ecosystem evolves.',
  },
];

export function WhyAdevInfoSection() {
  return (
    <HomeSection band="paper">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading
            title="Why AI Dev Info?"
            description="Helping people understand AI before they choose it—and understand the technology before they build with it."
            center={false}
            className="max-w-sm"
          />
          <Button asChild variant="outline" className="mt-8 group">
            <Link href="/about">
              About AI Dev Info
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
          {principles.map((item) => (
            <div key={item.title} className={`${HOME_CARD_INSET} p-6 sm:p-7`}>
              <h3 className="font-display text-xl text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </HomeSection>
  );
}
