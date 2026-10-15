import Link from 'next/link';
import { ArrowRight, BookOpen, Hammer, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/shared/section-heading';
import { HomeSection, HOME_CARD_INSET } from '@/components/home/home-section';

const pillars = [
  {
    icon: Search,
    title: 'Explore AI tools',
    description:
      'Discover AI tools by category, capability, and use case. Compare options and see who each tool is for.',
    href: '/services',
    cta: 'Browse AI tools',
  },
  {
    icon: BookOpen,
    title: 'Learn AI development',
    description:
      'Build practical understanding of ML, LLMs, agents, RAG, automation, and how to evaluate AI systems.',
    href: '/blogs',
    cta: 'Explore AI guides',
  },
  {
    icon: Hammer,
    title: 'Build AI applications',
    description:
      'Learn how AI fits into real products—chatbots, agents, RAG apps, LLM integration, and automation workflows.',
    href: '/development-services',
    cta: 'Explore AI development',
  },
];

export function PillarsSection() {
  return (
    <HomeSection band="paper">
      <SectionHeading
        title="Explore AI, learn how it works, and build with it"
        description="AI Dev Info brings together practical AI resources, AI tools, technical guides, and development information in one place."
        center={false}
        className="max-w-2xl"
      />

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {pillars.map((pillar) => (
          <article key={pillar.title} className={`${HOME_CARD_INSET} flex flex-col p-7 sm:p-8`}>
            <pillar.icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
            <h3 className="mt-5 font-display text-2xl text-foreground">{pillar.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
              {pillar.description}
            </p>
            <Button asChild variant="link" className="mt-6 h-auto justify-start p-0 text-foreground group">
              <Link href={pillar.href}>
                {pillar.cta}
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </article>
        ))}
      </div>
    </HomeSection>
  );
}
